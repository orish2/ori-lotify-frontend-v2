import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { MainLayout } from '../cmps/layout/MainLayout.jsx';
import { setCurrTrack, addToNextQueue, setQueue, loadStations, toggleIsPlaying, setPlay } from '../store/station.actions.js';
import { addLikeToTrack, loadUser, removeLikeFromTrack } from '../store/user.actions';
import stationImg from '../assets/img/stationImg.jpg'
import { arrayMoveImmutable } from 'array-move';
import { DraggableTrackList } from '../cmps/draggable-track-list.jsx';
import heartNotChecked from '../assets/img/heart-regular.svg';
import { Search } from './search.jsx';
import { stationServiceNew } from '../services/station.service.js';
import { youtubeApiService } from '../services/youtubeApi.service.js';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
import { Loading } from '../cmps/Loading.jsx';
// import { utilService } from '../services/util.service.js';
// import { userService } from '../services/user.service.js';

class _StationDetails extends Component {
    state = {
        stationId: null,
        station: null,
        isPlaying: false,
        songs: null,
        isLike: false,
        isFindMore: false,
        isShowAll: false
    }
    async componentDidMount() {
        await this.loadStation()
        let { user } = this.props
        if (!user) {
            await this.props.loadUser();
            user = this.props.user
        }
        if (this.state.station && this.state.station._id) {
            if (user.likedStations.includes(this.state.station._id)) {
                this.setState({ isLike: true })
            }
            else this.setState({ isLike: false })
        }
    }

    async componentDidUpdate(prevProps) {
        const { stationId } = this.props.match.params
        if (prevProps.user?.likedTracks.length !== this.props.user?.likedTracks.length) return this.loadStation()
        if (stationId !== this.state.station?._id && stationId !== this.state.station?.genre) {
            await this.loadStation()
            let user = await this.props.user
            // if (!user) {
            //     await this.props.loadUser();
            //     user = await this.props.user
            // }
            if (this.state.station) {
                if (user.likedStations.includes(this.state.station._id)) {
                    this.setState({ isLike: true })
                }
                else this.setState({ isLike: false })
            }
        }
    }


    loadStation = async () => {
        const { stationId } = this.props.match.params;
        let station
        try {
            station = await stationServiceNew.getStationFromLocal(stationId)//search in local storage
            if (!station) {
                if (stationId.length === 24) {
                    station = await stationServiceNew.getStationById(stationId)
                }
                else {
                    station = await stationServiceNew.getStationByGenre(stationId)
                }
            }
            if (!station) {
                console.log('by api');
                station = await youtubeApiService.getStationByTag(stationId)
                if (station) {
                    station = station[0]
                }
            }
            let user;
            if (stationId === 'likedTracks') {
                user = await this.props.user
                if (!user) {
                    await this.props.loadUser();
                    user = await this.props.user
                }
                station.songs = [...user.likedTracks]
            }
            if (station) {
                this.setState({
                    station, stationId: station._id ? station._id : station.genre,
                    songs: station.songs
                })
            }
            else this.setState({ station: [] })
            console.log('station is ', station);
        }
        catch {
            console.log('had issues');
        }
    }

    playRandTrack = async () => {
        // console.log(this.);
        if (!this.props.currTrack || this.props.playedStation !== this.state.station._id ||
            this.props.playedStation !== this.state.station.genre
        ) {
            const songs = [...this.state.station.songs];
            const idx = Math.floor(Math.random() * (songs.length))
            const track = songs[idx]
            await this.props.setCurrTrack(track, idx);
            // if (!this.state.station._id)
            //     await this.props.setQueue([...songs], this.state.station.genre)
            // else
            console.log('playing rand track', this.state.stationId);
            await this.props.setQueue([...songs], this.state.stationId);
        }
        this.props.toggleIsPlaying()
    }


    onSortEnd = ({ oldIndex, newIndex }) => {
        const { station } = this.state
        station.songs = arrayMoveImmutable(station.songs, oldIndex, newIndex)
        this.setState((prevState) => ({ ...prevState, station }), () => {
            if (this.props.currTrack && this.props.playedStation === this.state.stationId) {
                this.props.setQueue([...station.songs], this.state.stationId)
            }
        })
    }

    toggleLike = async (ev, stationOrTrack) => {
        ev.stopPropagation()
        this.setState(prevState => {
            return { ...prevState, isLike: !this.state.isLike }
        }, () => this.handleToggleLike(stationOrTrack))
    }

    handleToggleLike = async (stationOrTrack) => {
        if (this.state.isLike) {
            //if the station is from the search
            if (!this.state.station._id) {
                const stationToSave = await stationServiceNew.saveStation(this.state.station)
                this.setState({ station: stationToSave })
                await this.props.addLikeToTrack(stationToSave._id, stationOrTrack)
                showSuccessMsg('Saved to Your Library')
            }
            else {
                this.props.addLikeToTrack(this.state.station._id, stationOrTrack)
                showSuccessMsg('Saved to Your Library')
            }
        }
        else {
            this.props.removeLikeFromTrack(this.state.station._id, stationOrTrack)
            showErrorMsg('Removed from Your Library')
        }
        // const { stationId } = this.state
        this.loadStation()

    }


    handleFindMore = () => {
        this.setState({ isFindMore: !this.state.isFindMore }, () => {
            this.moveSrollDown()
        });

    }

    moveSrollDown = () => {
        const homePage = document.querySelector('.station-details')
        homePage.scrollTop = homePage.scrollHeight
    }

    render() {
        const { station, isFindMore } = this.state;
        const { stationId } = this.props.match.params;
        if (!station) return <Loading />
        // console.log('this.props.playedStation === station._id', this.props.playedStation === station._id);
        // console.log('this.props.playedStation === station.genre', this.props.playedStation === station.genre);
        // console.log('isPlaying', this.props.isPlaying);
        return (
            <section className='station-details'>
                <div className="station-head flex">
                    {station.songs?.length > 0 &&
                        <img src={station.img ? station.img : `${station.songs[0].imgUrl}`} alt="" />
                    }
                    {!station.songs.length &&
                        <img src={stationImg} alt="" />
                    }
                    <div className="title-details">
                        <p>Playlist</p>
                        <h1>{station.name}</h1>
                        <ul className="clean-list flex">
                            <li>{station.createdBy?.fullname}</li>
                            <li>{station.songs.length} songs</li>
                        </ul>
                    </div>
                </div>
                <Link className="fas back fa-chevron-left" to="/"></Link>
                <div className='bar-action flex'>
                    <button className="play-rand" onClick={this.playRandTrack}>
                        <i className={this.props.isPlaying && (this.props.playedStation === station._id ||
                            this.props.playedStation === station.genre) ? "fas fa-pause" : "fas fa-play"}></i>
                    </button>

                    {
                        (stationId !== 'likedTracks' && this.state.isLike) && <span className='isLike fas fa-heart' style={{ fontSize: "32px" }} onClick={(ev) => { this.toggleLike(ev, 'station') }} ></span>
                    }
                    {
                        (stationId !== 'likedTracks' && !this.state.isLike)
                        && <img alt="" className='isnotLike' src={heartNotChecked} onClick={(ev) => { this.toggleLike(ev, 'station') }}
                        />
                    }
                </div>
                <MainLayout>

                    <DraggableTrackList songs={station.songs} currStation={station}
                        axis='xy' loadStation={this.loadStation} onSortEnd={this.onSortEnd}
                        distance={20} />
                    <div className='show-btn flex'>
                        {<div className={`find-more ${!isFindMore ? "green" : ""}`} onClick={this.handleFindMore}>
                            {isFindMore ? 'Find less' : 'Find more tracks!'}
                        </div>}
                    </div>
                    {isFindMore &&
                        <>
                            <span>Let's find something to your station</span>
                            <Search loadStation={this.loadStation} stationId={this.state.stationId} isOnDeatils={true}
                            />
                        </>
                    }
                </MainLayout>
            </section >
        )
    }

}

function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations,
        isPlaying: state.stationMoudle.isPlaying,
        queue: state.stationMoudle.queue,
        currTrack: state.stationMoudle.currTrack,
        playedStation: state.stationMoudle.playedStation,
        user: state.userMoudle.user,
    }
}
const mapDispatchToProps = {
    setCurrTrack,
    setQueue,
    setPlay,
    loadStations,
    addToNextQueue,
    addLikeToTrack,
    loadUser,
    removeLikeFromTrack,
    toggleIsPlaying,
}


export const StationDetails = connect(mapStateToProps, mapDispatchToProps)(_StationDetails)