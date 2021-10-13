import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import { setFriendCurrTrack } from '../store/friends.actions.js'

import {
    setPlay, playNextTrack, playPrevTrack, shuffleQueue, toggleIsPlaying,
    setCurrTrack, setQueue, unshuffleQueue, setCurrStation
} from '../store/station.actions.js';
import { Duration } from '../services/util.service';
import { withRouter } from "react-router";
import heartNotChecked from '../assets/img/heart-regular.svg';
import { addLikeToTrack,  loadUsers, removeLikeFromTrack } from '../store/user.actions';
import { showErrorMsg, showNotificationMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { socketService } from '../services/socket.service'



class _AppFooter extends Component {
    state = {
        volume: 30,
        isPlayedTrack: false,
        played: 0,
        loaded: 0,
        duration: 0,
        inQueue: false,
        isShuffle: false,
        isLiked: false,
        trackAndUsers: [],
    }
    async componentDidMount() {
        await this.props.loadUsers()
        socketService.setup()
        socketService.on('send notification', (obj) => {
            showNotificationMsg(obj.username + ' liked your playlist: ' + obj.stationName)
            //eventBusService.emit(obj.username)
        })
        socketService.on('send follow notification', (username) => {

            showNotificationMsg(username + ' followd you')
            //eventBusService.emit(username)
        })
        socketService.on('user track', ({ track, user }) => {
            this.props.setFriendCurrTrack({ track, user, currLoginUser: this.props.user })
        })


    }
    componentDidUpdate(prevProps, prevstate) {
        if (this.props.currTrack !== prevProps.currTrack) {
            socketService.emit('play track', { track: this.props.currTrack, user: this.props.user })
            this.isTrackLiked()
            //this.props.toggleIsPlaying();
            this.props.setPlay()
            this.setState({ played: 0, duration: 0 })
        }
        if (!this.props.user || !prevProps.user) return
        if (this.props.user.likedTracks.length !== prevProps.user.likedTracks.length) {
            this.isTrackLiked()
        }
    }

    isTrackLiked = () => {
        if (!this.props.currTrack) return
        const trackIdxs = this.props.user.likedTracks.map(track => track.id)
        const isLiked = trackIdxs.includes(this.props.currTrack.id)
        this.setState({ isLiked })
        return isLiked
    }


    handleChange = (event) => {
        let newValue = event.target.value;
        this.setState({ volume: newValue });
    }

    playRandTrack = async (stations) => {
        let randIdx = Math.floor(Math.random() * (stations.length))
        let station = stations[randIdx]
        while (station.genre === 'likedTracks') {
            randIdx = Math.floor(Math.random() * (stations.length))
            station = stations[randIdx]
        }
        const songs = [...station.songs];
        const idx = Math.floor(Math.random() * (songs.length))
        const track = songs[idx]
        await this.props.setCurrTrack(track, idx);
        await this.props.setQueue([...songs], station._id);
        this.props.setCurrStation(station)
        this.props.setPlay()
    }

    togglePlay = async () => {
        if (!this.props.currTrack) {
            await this.playRandTrack(this.props.stations)
        }
        else if (this.state.isLoaded)
            this.props.toggleIsPlaying();

        // original code
        // if (this.state.isLoaded)
        // this.props.toggleIsPlaying();
    }


    handleSeekMouseDown = e => {
        if (!this.props.currTrack) return
        this.setState({ seeking: true })
    }

    handleSeekChange = e => {
        if (!this.props.currTrack) return

        this.setState({ played: parseFloat(e.target.value) },
        )
    }

    handleSeekMouseUp = e => {
        if (!this.props.currTrack) return

        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }


    handleDuration = (duration) => {
        this.setState({ duration })
    }

    ref = player => {
        this.player = player
    }


    goNext = () => {
        this.props.playNextTrack()
    }

    goShuffle = () => {
        if (this.state.isShuffle) {
            this.props.unshuffleQueue(this.props.playedStation)
        } else {
            this.props.shuffleQueue([...this.props.queue])
        }
        this.setState({ isShuffle: !this.state.isShuffle })
    }

    goPrev = () => {
        this.props.playPrevTrack()
    }
    handleDuration = (duration) => {
        this.setState({ duration })
    }

    handleEnded = () => {
        this.props.playNextTrack()
    }

    inQueue = async () => {
        this.setState({ inQueue: !this.state.inQueue }, () => {
            if (this.state.inQueue)
                this.props.history.push(`/queue`)
            else {
                this.props.history.goBack()
            }
        })
    }


    toggleLike = async (ev) => {
        ev.stopPropagation()
        this.setState({ isLiked: !this.state.isLiked }, () => {
            if (this.state.isLiked) {

                this.props.addLikeToTrack(this.props.currTrack, 'track')
                showSuccessMsg("Add to your Liked Tracks")
            }
            else {
                this.props.removeLikeFromTrack(this.props.currTrack.id, 'track')
                showErrorMsg("Removed from your Liked Tracks")

            }
        })
    }


    onGoToplaylist = () => {
        if (!this.props.playedStation) return
        this.props.history.push(`/station/${this.props.playedStation}`)
    }




    render() {
        const { played, duration, volume, isShuffle} = this.state
        const { isPlaying } = this.props
        const track = this.props.currTrack
        return (
            <div className="player-container">
                {
                    track &&
                    <div className='player'>
                        <ReactPlayer
                            ref={this.ref}
                            playing={isPlaying}
                            url={`https://www.youtube.com/watch?v=${track.id}`}
                            onDuration={this.onDuration}
                            onProgress={this.onProgress}
                            width='0px'
                            heigth='0px'
                            volume={volume / 100}
                            onProgress={this.handleProgress}
                            onDuration={this.handleDuration}
                            onReady={() => { this.setState({ isLoaded: true }) }}
                            controls={false}
                            onEnded={this.handleEnded}
                            muted={false}
                        />
                    </div>
                }
                <div className='playing-bar'>
                    <div className='song-name-bar'>
                        <div className='img-container-player'>
                            {
                                track &&
                                <img onClick={this.onGoToplaylist} className='track-img' src={track.imgUrl} alt="track"/>
                            }
                        </div>
                        <div onClick={this.onGoToplaylist} className="song-name">
                            <p>
                                {track ? track.title : ""}
                            </p>
                        </div>
                        {track && <div className="like-heart">
                            {
                                this.state.isLiked && <span className='isLike' onClick={(ev) => { this.toggleLike(ev) }} class="fas fa-heart"></span>
                            }
                            {
                                !this.state.isLiked && <img className='isnotLike' src={heartNotChecked} onClick={(ev) => { this.toggleLike(ev) }} alt="like"/>
                            }
                        </div>}
                    </div>


                    <div className="player-controls">
                        <div className="player-controls-btn flex">
                            <span className={isShuffle ? "fas fa-random green" : "fas fa-random"} onClick={this.goShuffle}></span>

                            <span className="fas fa-step-forward" onClick={this.goPrev}></span>

                            {
                                isPlaying &&
                                <span className="fas fa-pause" onClick={this.togglePlay}></span>
                            }
                            {
                                !isPlaying &&
                                <span className="fas fa-play" onClick={this.togglePlay}></span>
                            }
                            <span className="fas fa-step-forward" onClick={this.goNext}></span>
                            <span onClick={this.inQueue} className={this.state.inQueue ? "fas fa-outdent green" : "fas fa-outdent"}></span>
                        </div>
                        <div className='played-input flex'>
                            <Duration seconds={duration * played} />
                            <input
                                type='range' min={0} max={0.999999} step='any'
                                value={played}
                                onMouseDown={this.handleSeekMouseDown}
                                onChange={(ev) => this.handleSeekChange(ev)}
                                onMouseUp={this.handleSeekMouseUp}
                            />
                            <Duration seconds={duration} />
                        </div>
                    </div>



                    <div className="volume">
                        <div className='queue-btn'>
                            <span onClick={this.inQueue} className={this.state.inQueue ? "fas fa-outdent green" : "fas fa-outdent"}></span>
                        </div>
                        <Box sx={{ width: 200 }}>
                            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                {volume === 0 &&
                                    <span /*onClick={this.handleToggleMuted}*/ className="fas fa-volume-mute"></span>}
                                {volume > 0 && volume < 50 &&
                                    <span /*onClick={this.handleToggleMuted}*/ className="fas fa-volume-down"></span>}
                                {volume > 50 &&
                                    <span /*onClick={this.handleToggleMuted}*/ className="fas fa-volume-up"></span>}
                                <Slider aria-label="Volume" value={volume} onChange={this.handleChange} style={{ color: '#1db954', width: "150px" }} />
                            </Stack>
                        </Box>

                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        currTrack: state.stationMoudle.currTrack,
        isPlaying: state.stationMoudle.isPlaying,
        playedStation: state.stationMoudle.playedStation,
        queue: state.stationMoudle.queue,
        user: state.userMoudle.user,
        stations: state.stationMoudle.stations,
    }
}
const mapDispatchToProps = {
    playNextTrack,
    playPrevTrack,
    shuffleQueue,
    unshuffleQueue,
    toggleIsPlaying,
    setPlay,
    setCurrStation,
    addLikeToTrack,
    removeLikeFromTrack,
    setCurrTrack,
    setQueue,
    setFriendCurrTrack,
    loadUsers
}


const __AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)
export const AppFooter = withRouter(__AppFooter);
