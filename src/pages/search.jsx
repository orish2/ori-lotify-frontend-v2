import React from 'react'
import { MainLayout } from '../cmps/layout/MainLayout'
import mood from '../assets/img/mood-search.jpg';
import pop from '../assets/img/pop-search.jpg';
import chill from '../assets/img/chill-search.jpg';
import summer from '../assets/img/summer-search.jpeg';
import latin from '../assets/img/latin-search.jpg';
import jazz from '../assets/img/jazz-search.jpg';
import indie from '../assets/img/indie-search.jpg';
import wellness from '../assets/img/wellness-search.jpg';
import sleep from '../assets/img/sleep-search.jpg';
import decades from '../assets/img/decades-search.jpg';
import workout from '../assets/img/workout-search.jpg';
import party from '../assets/img/party-search.jpg';
import focus from '../assets/img/focus-search.jpg';
import alternativ from '../assets/img/alternativ-search.jpg';
import travel from '../assets/img/travel-search.jpg';
import soul from '../assets/img/soul-search.jpg';
import funk from '../assets/img/funk-search.jpg';
import metal from '../assets/img/metal-search.jpg';
import classical from '../assets/img/classical-search.jpg';
import blues from '../assets/img/blues-search.jpg';
//import { debounce, throttle } from 'lodash';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCurrTrack, addToNextQueue, setQueue, playNextTrack } from '../store/station.actions.js';
import { SearchResultTrack } from '../cmps/searchResultTrack';
import { SearchResultStation } from '../cmps/searchResultStation';
import { SearchResultStationDetails } from '../cmps/searchResultStationDetails';
import { stationServiceNew } from '../services/station.service';
import { apiService, youtubeApiService } from '../services/youtubeApi.service';
var _ = require('lodash');


class _Search extends React.Component {
    state = {
        keySearch: null,
        isOnSearch: false,
        trackResult: null,
        stationResult: null

    }

    //delayedHandleChange = _.debounce(eventData => stationService.searchTrack(eventData), 700);



    delayedHandleChange = _.debounce(async () => {
        if (!this.state.keySearch) return
        if (this.props?.isOnDeatils) {
            var trackResult = await youtubeApiService.searchTrack(this.state.keySearch);
            var stationResult = []
        }
        else {
            var trackResult = await youtubeApiService.searchTrack(this.state.keySearch);
            var stationResult = await stationServiceNew.searchStation(this.state.keySearch);
            var stationResultApi = await youtubeApiService.getStationByTag(this.state.keySearch);
            if (stationResultApi)
                if (!stationResult.some(result => result.name === stationResultApi[0].name))
                    stationResult = stationResult.concat(stationResultApi)
        }
        if (!trackResult) {
            trackResult = []
        }
        // if (trackResult.length === 0) return
        // else {
        this.setState({ trackResult, stationResult }, () => {
            this.setState({ isOnSearch: true });

        })
        // }
    }, 700);


    moveScrollDwon = _.debounce(async () => {
        const homePage = document.querySelector('.station-details')
        if (homePage)
            homePage.scrollTop = homePage.scrollHeight - 700
    }, 800)

    handleChange = async ({ target }) => {
        this.setState({ keySearch: target.value }, () => {
            if (this.state.keySearch === '' || this.state.keySearch === ' ') {
                this.setState({ isOnSearch: false })
                return
            }
            this.delayedHandleChange(this.state.keySearch)
            this.moveScrollDwon()
        })

    }

    onPlayTrack = async (track = null, idx = null) => {
        if (!track && !idx) {
            this.setState(prevState => ({ ...prevState }))
            return
        }
        await this.props.setCurrTrack(track, idx);
        await this.props.setQueue([track], idx)
    }


    render() {
        const { trackResult, isOnSearch, stationResult } = this.state
        return (
            <section className='search'>
                <MainLayout>
                    <form onSubmit={(ev) => ev.stopPropagation()}>
                        <input type='text' placeholder='Artists, songs or podcasts ' onChange={this.handleChange} />
                    </form>
                    {!this.props?.isOnDeatils && <div>
                        {
                            isOnSearch &&
                            <SearchResultTrack trackResult={trackResult} playTrack={this.onPlayTrack} />
                        }
                        {
                            isOnSearch &&
                            <SearchResultStation stationResult={stationResult.slice(0,2)} playTrack={this.onPlayTrack} />
                        }
                    </div>}
                    {this.props?.isOnDeatils && <div>
                        {
                            isOnSearch &&
                            <SearchResultStationDetails loadStation={this.props.loadStation} stationId={this.props.stationId} trackResult={trackResult} playTrack={this.onPlayTrack} />
                        }
                    </div>}
                    <div className='title'>Browse all</div>
                    <div className='grid-container-search'>
                        <Link to="station/pop">
                            <div className="grid-element-1" style={{ backgroundColor: 'rgb(141, 103, 171)' }}><span>pop</span>
                                <img src={pop} />
                            </div>
                        </Link>
                        <Link to="station/chill">
                            <div className="div3" style={{ backgroundColor: 'rgb(71, 125, 149)' }}><span>chill</span> <img src={chill} /></div>
                        </Link>
                        <Link to="station/party">
                            <div className="div4" style={{ backgroundColor: 'rgb(175, 40, 150)' }} ><span>party</span><img src={party} /></div>
                        </Link>
                        <Link to="station/focus">
                            <div className="div5" style={{ backgroundColor: 'rgb(80, 55, 80)' }}><span>focus</span><img src={focus} /></div>
                        </Link>
                        <Link to="station/alternative">
                            <div className="div6" style={{ backgroundColor: 'rgb(180, 155, 200)' }}><span>alternativ</span><img src={alternativ} /></div>
                        </Link>
                        <Link to="station/summer">
                            <div className="div14" style={{ backgroundColor: 'rgb(255, 200, 100)' }}><span>summer</span><img src={summer} /></div>
                        </Link>
                        <Link to="station/indie">
                            <div className="div7" style={{ backgroundColor: 'rgb(96, 129, 8)' }}><span>indie</span><img src={indie} /></div>
                        </Link>
                        <Link to="station/latin">
                            <div className="div19" style={{ backgroundColor: 'rgb(225, 51, 0)' }}><span>latin</span><img src={latin} /></div>
                        </Link>
                        <Link to="station/wellness">
                            <div className="div8" style={{ backgroundColor: 'rgb(71, 125, 149)' }}><span>wellness</span><img src={wellness} /></div>
                        </Link>
                        <Link to="station/sleep">
                            <div className="div9" style={{ backgroundColor: 'rgb(30, 50, 100)' }}><span>sleep</span><img src={sleep} /></div>
                        </Link>
                        <Link to="station/decade">
                            <div className="div10" style={{ backgroundColor: 'rgb(186, 93, 7)' }}><span>decades</span><img src={decades} /></div>
                        </Link>
                        <Link to="station/workout">
                            <div className="div11" style={{ backgroundColor: 'rgb(119, 119, 119)' }}><span>workOut</span><img src={workout} /></div>
                        </Link>
                        <Link to="station/at-home">
                            <div className="div12" style={{ backgroundColor: 'rgb(30, 50, 100)' }}><span>at Home</span><img src={wellness} /></div>
                        </Link>
                        <Link to="station/travel">
                            <div className="div13" style={{ backgroundColor: 'rgb(45, 70, 185)' }}><span>travel</span><img src={travel} /></div>
                        </Link>
                        <Link to="station/souls">
                            <div className="div15" style={{ backgroundColor: 'rgb(220, 20, 140)' }}><span>soul</span><img src={soul} /></div>
                        </Link>
                        <Link to="station/jazz">
                            <div className="div16" style={{ backgroundColor: 'rgb(30, 50, 100)' }}><span>jazz</span><img src={jazz} /></div>
                        </Link>
                        <Link to="station/funk">
                            <div className="div17" style={{ backgroundColor: 'rgb(230, 30, 50)' }}><span>funk</span><img src={funk} /></div>
                        </Link>
                        <Link to="station/mood">
                            <div className="grid-element-2" style={{ backgroundColor: 'rgb(141, 103, 171)' }}><span>mood</span><img src={mood} /></div>
                        </Link>
                        <Link to="station/metal">
                            <div className="div18" style={{ backgroundColor: 'rgb(119, 119, 119)' }}><span>metal</span><img src={metal} /></div>
                        </Link>
                        <Link to="station/classical">
                            <div className="div20" style={{ backgroundColor: 'rgb(225, 51, 0)' }}><span>classical</span><img src={classical} /></div>
                        </Link>
                        <Link to="station/blues">
                            <div className="div21" style={{ backgroundColor: 'rgb(13, 115, 236)' }}><span>blues</span><img src={blues} /></div>
                        </Link>

                    </div>
                </MainLayout>
            </section >
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
    addToNextQueue,
    setQueue
}


export const Search = connect(mapStateToProps, mapDispatchToProps)(_Search)