//import React, { Component } from 'react'
//import { MainLayout } from '../cmps/layout/MainLayout'
//import { stationService } from "../services/async-storage.service.js";
//var _ = require('lodash');
//export class CreateStation extends Component {
//    state = {
//        station: null
//    }

//    delayedHandleChange = _.debounce(async () => {
//        let trackResult = await stationService.searchSong(this.state.keySearch);
//        if (trackResult.length === 0) return
//        else {
//            this.setState({ trackResult }, () => {
//                this.setState({ isOnSearch: true })
//            })
//        }
//    }, 700);


//    handleChange = async ({ target }) => {
//        this.setState({ keySearch: target.value }, () => {
//            if (this.state.keySearch === '' || this.state.keySearch === ' ') {
//                this.setState({ isOnSearch: false })
//                return
//            }
//            this.delayedHandleChange(this.state.keySearch)
//        })
//    }

//    render() {
//        const { station } = this.state
//        return (
//            <MainLayout>
//                <section className='station-details'>
//                    <div className="station-head flex">
//                        {/*{station.songs.length > 0 &&
//                            //<img src={`${station.songs[0].imgUrl}`} />
//                        }*/}
//                        {/*{!station.songs.length &&
//                            <img src={stationImg} />
//                        }*/}
//                        <div className="title-details">
//                            <p>Playlist</p>
//                            {/*<h1>{station.name}</h1>*/}
//                            <ul className="clean-list flex">
//                                <li>{'station.createdBy?.fullname'}</li>
//                                <li>{'station.songs.length'} songs</li>
//                            </ul>
//                        </div>
//                    </div>
//                    {/*<Link className="fas back fa-chevron-left" to="/"></Link>*/}
//                    <button className="play-rand" onClick={this.playRandTrack}>
//                        {/*<i class={this.state.isPlaying ? "fas fa-pause" : "fas fa-play"}></i>*/}
//                    </button>
//                    <table>
//                        <tbody>
//                            <tr>
//                                <th>#</th>
//                                <th></th>
//                                <th>Title</th>
//                                <th>◷</th>
//                                <th></th>
//                            </tr>
//                            {/*<TrackList songs={station.songs} playTrack={this.playTrack} onAddToNextQueue={this.onAddToNextQueue} stations={this.props.stations} currStation={station} onAddToStation={this.onAddToStation} />*/}
//                        </tbody>
//                    </table>
//                </section>
//                <form onSubmit={(ev) => ev.stopPropagation()}>
//                    <input type='text' placeholder='Artists, songs or podcasts ' onChange={this.handleChange} />
//                </form>
//            </MainLayout>
//        )
//    }
//}
