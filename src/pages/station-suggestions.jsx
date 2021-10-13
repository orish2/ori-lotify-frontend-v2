import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { MainLayout } from '../cmps/layout/MainLayout.jsx';
import { TrackList } from '../cmps/trackList.jsx';
import { stationService } from '../services/async-storage.service.js';
import { setCurrTrack, addToNextQueue, setQueue, loadStations } from '../store/station.actions.js';
import stationImg from '../assets/img/stationImg.jpg'

class _StationSuggestion extends Component {
    state = {
        station: null,
        isPlaying: false
    }
    async componentDidMount() {
        this.loadStation()
    }

    loadStation = async () => {
        const { tagName } = this.props.match.params
        const station = await stationService.getStationByTag(tagName)
        this.setState({ station:station[0] })
    }

    playRandTrack = () => {
        if (this.state.isPlaying) {
            //pause -possible eventBus
            this.props.setCurrTrack({}, 0);
        } else {
            const songs = [...this.state.station.songs];
            const idx = Math.floor(Math.random() * (songs.length))
            const track = songs[idx]
            this.props.setCurrTrack(track, idx);
            this.props.setQueue(songs, idx);
        }
        this.setState({ isPlaying: !this.state.isPlaying })
    }

    render() {
        const { station } = this.state
        if (!station) return <h1>loading...</h1>
        return (
            <MainLayout>
                <section className='station-details'>
                    <div className="station-head flex">
                        {station.songs.length > 0 &&
                            <img src={`${station.songs[0].imgUrl}`} />
                        }
                        {!station.songs.length &&
                            <img src={stationImg} />
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
                    <button className="play-rand" onClick={this.playRandTrack}>
                        <i class={this.state.isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
                    </button>
                    <table>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th></th>
                                <th>Title</th>
                                <th>◷</th>
                                <th></th>
                            </tr>
                            <TrackList songs={station.songs} loadStation={this.loadStation} />
                        </tbody>
                    </table>
                </section>
            </MainLayout>
        )
    }
}

function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations
    }
}
const mapDispatchToProps = {
    setCurrTrack,
    setQueue,
}


export const StationSuggestion = connect(mapStateToProps, mapDispatchToProps)(_StationSuggestion)