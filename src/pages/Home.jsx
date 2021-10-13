import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MainLayout } from '../cmps/layout/MainLayout.jsx';
import { FavoriteArtists } from '../cmps/favorite-artists.jsx';

import { StationPreview } from '../cmps/station-preview.jsx';
import { loadStations } from '../store/station.actions.js';
import { loadUser } from '../store/user.actions';
import { stationServiceNew } from '../services/station.service.js';
import { Loading } from '../cmps/Loading.jsx';
import { UserProfile } from '../cmps/profile.jsx';

class _Home extends Component {
    state = {
        goodDayStations: [],
        hotStations: [],
        likedStations: '',
        recentlyPlayedStations: '',
        numOfPreviews: 5
    }

    resizer
    handleRisize = (entries) => {
        const viewPortWidth = entries[0].contentRect.width
        if (viewPortWidth > 1760)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 7 }))
        else if (viewPortWidth >= 1560 && viewPortWidth < 1760)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 6 }))
        else if (viewPortWidth >= 1360 && viewPortWidth < 1560)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 5 }))
        else if (viewPortWidth >= 1160 && viewPortWidth < 1360)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 4 }))
        else if (viewPortWidth >= 960 && viewPortWidth < 1160)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 3 }))
        else if (viewPortWidth >= 760 && viewPortWidth < 960)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 2 }))
        else if (viewPortWidth >= 685 && viewPortWidth < 760)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 3 }))
        else if (viewPortWidth < 685 && viewPortWidth >= 475)
            this.setState(prevState => ({ ...prevState, numOfPreviews: 2 }))
        else {
            this.setState(prevState => ({ ...prevState, numOfPreviews: 2 }))

        }
        // else if (viewPortWidth >= 562)
        //     this.setState(prevState => ({ ...prevState, numOfPreviews: 1 }))

    }
    async componentDidMount() {
    console.log("🚀 ~ file: Home.jsx ~ line 50 ~ _Home ~ componentDidMount ~ componentDidMount")
        await this.props.loadUser();
        await this.props.loadStations();
        await this.getLikedStation()
        const goodDayStations = await stationServiceNew.getGoodDay()
        const hotStations = await stationServiceNew.getHot()
        this.setState({ goodDayStations, hotStations })
        this.resizer = new ResizeObserver(this.handleRisize)
        this.resizer.observe(document.querySelector('.main-app'))
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.user?._id !== this.props.user?._id) {
            //await this.props.loadUser();
            await this.props.loadStations();
            await this.getLikedStation()
        }
    }

    getTime = () => {
        var today = new Date()
        var curHr = today.getHours()

        if (curHr < 12) {
            return 'Good morning'
        } else if (curHr < 18) {
            return 'Good afternoon'
        } else {
            return 'Good evening'
        }
    }
    getLikedStation = async () => {
        console.log(this.props.user);
        let unresolvedPromisesLike = await this.props.user.likedStations.map((stationId => {
            return stationServiceNew.getStationById(stationId);
        }
        ))
        let unresolvedPromisesStation = await this.props.user.recentlyPlayedStations.map((stationId => {
            return stationServiceNew.getStationById(stationId);
        }
        ))
        let a = await Promise.all(unresolvedPromisesLike)
        let b = await Promise.all(unresolvedPromisesStation)
        const results = await Promise.all([a, b]);
        this.setState({ likedStations: results[0], recentlyPlayedStations: results[1] })
        //this.props.user.likedStations.map((station => <StationPreview key={station._id} station={station} />))
    }

    render() {
        let { stations, user } = this.props
        stations = stations.filter(station => station.genre !== 'likedTracks')
        const { likedStations, numOfPreviews, recentlyPlayedStations, goodDayStations, hotStations } = this.state
        // console.log(goodDayStations)
        if (!stations || !this.props.user || !likedStations || !recentlyPlayedStations) return <Loading />
        return (

            <div className="home-page">
                <UserProfile />
                <div className="shadow">
                    <div className="hero">
                        <h1>Listen to your favorite music on <span className="logo">Lotify<span>.</span></span></h1>
                    </div>
                </div>
                <section className='station-container'>
                    <div className='card card-top'>
                        <div className='card-header'>
                            <h1>{this.getTime()}</h1>
                        </div>
                        {
                            user.userPref ?
                                <FavoriteArtists artists={user.userPref.slice(0, 6)} /> :
                                <FavoriteArtists artists={[{ artist: 'justin bieber', img: 'https://yt3.ggpht.com/ytc/AKedOLTKwkiuIDMtT7w-C55QJm3-FxExhi3So7EWofYGuQ=s800-c-k-c0xffffffff-no-rj-mo' }, { artist: 'ed sheeran', img: 'https://yt3.ggpht.com/2uiMtw7drxpcP4J7s61C0x1cK_fdX0Fp_RJ9t9l-RVnal24xyqSLPhIkWYN2I8QneubJAA8J_Fo=s800-c-k-c0xffffffff-no-rj-mo' }, { artist: 'billie eilish', img: 'https://yt3.ggpht.com/ytc/AKedOLTAirqzFYUbcrpr8K0Bh8iDCZvBopbEb3K9klVNBA=s800-c-k-c0xffffffff-no-rj-mo' }, { artist: 'michael jackson', img: 'https://yt3.ggpht.com/ytc/AKedOLRKkpURBGspdclOcPs6lr2Ds0S6VEIWIImSCQ63iA=s800-c-k-c0xffffffff-no-rj-mo' }]} />
                        }
                    </div>
                    <MainLayout>
                        {

                        }
                        {
                            user.username === 'guest' &&
                            <div className='card'>
                                <div className='card-header'>
                                    <h3>Good day</h3>
                                </div>
                                <div className="flex genre">
                                    {goodDayStations.map((station => <StationPreview key={station._id}
                                        station={station} />)).slice(0, Math.min(goodDayStations.length, numOfPreviews))}
                                </div>
                            </div>

                        }
                        {
                            user.username === 'guest' &&
                            <div className='card'>
                                <div className='card-header'>
                                    <h3>Hot right now</h3>
                                </div>
                                <div className="flex genre">
                                    {hotStations.map((station => <StationPreview key={station._id}
                                        station={station} />)).slice(0, Math.min(hotStations.length, numOfPreviews))}
                                </div>
                            </div>
                        }
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Stations you liked</h3>
                            </div>
                            <div className="flex genre">
                                {likedStations &&
                                    likedStations.map((station => <StationPreview key={station._id}
                                        station={station} />)).slice(0, Math.min(likedStations.length, numOfPreviews))}
                                {/*{likedStations.map((station => <StationPreview key={station._id} station={station} />))}*/}
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-header'>
                                <h3>Recently played</h3>
                            </div>
                            <div className="flex genre">
                                {recentlyPlayedStations &&
                                    recentlyPlayedStations.map((station => <StationPreview key={station._id}
                                        station={station} />)).slice(0, Math.min(recentlyPlayedStations.length, numOfPreviews))}
                                {/*{likedStations.map((station => <StationPreview key={station._id} station={station} />))}*/}
                            </div>
                        </div>
                    </MainLayout>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations,
        user: state.userMoudle.user,
    }
}
const mapDispatchToProps = {
    loadStations,
    loadUser
}


export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)


