import { toggleIsPlaying } from '../store/station.actions.js';
import { setCurrTrack, setQueue, setCurrStation, setPlay } from '../store/station.actions.js';
import { loadUser } from '../store/user.actions';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";


class _LikedSongsPreview extends React.Component {

    playRandTrack = async () => {
        const { station, currStation } = this.props
        let songs;
        if (!currStation || station._id !== currStation._id) {

            let user = await this.props.user
            if (!user) {
                await this.props.loadUser();
                user = await this.props.user
            }
            if (user.likedTracks) {
                songs = [...user.likedTracks]
            }
            else {
                console.log('no liked tracks');
            }
            const idx = Math.floor(Math.random() * (songs.length))
            const track = songs[idx]
            await this.props.setCurrTrack(track, idx);
            await this.props.setQueue([...songs], station._id);
            this.props.setCurrStation(station)
            this.props.setPlay()
        }
        else {
            this.props.toggleIsPlaying()
        }
    }

    navigateToStation = (stationId) => {
        this.props.history.push(`/station/${stationId}`)
    }
    render() {
        const { station, currStation, isPlaying } = this.props
        if (!station) return <div> not found</div>
        return (
            <div className="station-preview liked-songs-link" onClick={() => this.navigateToStation(station.genre)}>
                <div className="station-name-header">
                    <h3>{station.name}</h3>
                    <span>{`${station.songs.length} liked songs`}</span>
                </div>
                <p className="station-desc">
                    {station.songs.reduce((songStr, song) => {
                        songStr += song.title
                        return songStr;
                    }, '')}

                    {/* .slice(0, 30) + '...'} */}
                </p>
                <div className="liked-songs-play-icon-container" onClick={(e) => {
                    e.stopPropagation()
                    this.playRandTrack()
                }}>
                    <i className={`play-icon ${isPlaying && (station?._id === currStation?._id) ? "fas fa-pause" : "fas fa-play"}`}></i>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations,
        isPlaying: state.stationMoudle.isPlaying,
        queue: state.stationMoudle.queue,
        currTrack: state.stationMoudle.currTrack,
        currStation: state.stationMoudle.currStation,
        user: state.userMoudle.user,

    }
}
const mapDispatchToProps = {
    setCurrTrack,
    setQueue,
    toggleIsPlaying,
    loadUser,
    setCurrStation,
    setPlay
}


const __LikedSongsPreview = connect(mapStateToProps, mapDispatchToProps)(_LikedSongsPreview)
export const LikedSongsPreview = withRouter(__LikedSongsPreview);
