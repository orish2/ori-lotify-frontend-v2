import stationImg from '../assets/img/stationImg.jpg'
import { toggleIsPlaying } from '../store/station.actions.js';
import { setCurrTrack, setQueue, setCurrStation, setPlay } from '../store/station.actions.js';
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import PlayCircleIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { ThemeProvider, createTheme } from '@material-ui/core'

class _StationPreview extends React.Component {

    playRandTrack = async () => {
        const { station, currStation } = this.props
        if (!currStation || station._id !== currStation._id) {
            const songs = [...station.songs];
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

    navigateToStation = (station) => {
        let stationId = station._id ? station._id : station.name
        this.props.history.push(`/station/${stationId}`)
    }

    render() {
        const { station, currStation, isPlaying } = this.props
        if (!station) return <div>loading...</div>
        return (
            <div className="station-preview">
                <div className="img-card" onClick={() => this.navigateToStation(station)}>
                    <div className="square-ratio station-img-container">
                        {station.songs?.length > 0 && station.songs[0]?.imgUrl &&
                            <img src={station.img ? station.img : `${station.songs[0].imgUrl}`} />
                        }
                        {!station.songs.length &&
                            <img src={stationImg} />
                        }

                        <div className="play-icon-container" onClick={(e) => {
                            e.stopPropagation()
                            this.playRandTrack()

                        }}>
                            <i className={`play-icon ${isPlaying && (station?._id === currStation?._id) ? "fas fa-pause" : "fas fa-play"}`}></i>

                        </div>
                    </div>
                    <div className="station-name-header">
                        {station.name.length < 25 ? station.name : station.name.slice(0, 25) + '...'}
                    </div>
                    <p className="station-desc">
                        {!station.songs.length ? '' :
                            station.songs.reduce((songStr, song) => {
                                songStr += song.title
                                return songStr;
                            }, '').slice(0, 30) + '...'}
                    </p>
                </div>
            </div >
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
        currStation: state.stationMoudle.currStation

    }
}
const mapDispatchToProps = {
    setCurrTrack,
    setQueue,
    toggleIsPlaying,
    setCurrStation,
    setPlay
}


const __StationPreview = connect(mapStateToProps, mapDispatchToProps)(_StationPreview)
export const StationPreview = withRouter(__StationPreview);