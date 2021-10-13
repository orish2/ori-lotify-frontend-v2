import React from 'react'
import { StationDetails } from './station-details'
import { connect } from 'react-redux'
import { TrackList } from '../cmps/trackList'
import { setCurrTrack, addToNextQueue } from '../store/station.actions.js';
import { TrackPreview } from '../cmps/track-preview';
import { Link } from 'react-router-dom'
import { MainLayout } from '../cmps/layout/MainLayout';

class _Queue extends React.Component {
    componentDidMount() {
        document.body.style.backgroundImage = ' linear-gradient(#03080d, #121212)'
    }



    onAddToNextQueue = (track) => {
        this.props.addToNextQueue(track)
    }
    render() {

        const songs = this.props.queue
        if (!songs.length && !this.props.playNextQueue) return <div><span>Add to your queue</span>
            <span>Tap "Add to queue" from a trackws menu to see it here</span>
            <Link to='/search'>
                <button>FIND SOMETHING TO PLAY</button>
            </Link>
        </div>


        return (
            <div className='queue-page'>
                <MainLayout>
                    <div className='station-track-list flex column'>
                        <div className="queue-header">
                            <h2>Queue</h2>
                        </div>
                        <div className="queue-sub-header">
                            <h4>New Playing</h4>
                        </div>
                        <div className="now-playing-container">
                            {
                                this.props.currTrack &&
                                <TrackPreview track={this.props.currTrack} idx={0} playTrack={() => { }} onAddToNextQueue={this.onAddToNextQueue} />
                            }

                        </div>
                        <div className="queue-sub-header">
                            <h4>Playing Next Queue</h4>
                        </div>
                        <div className="playing-next-queue-container">
                            {
                                this.props.playNextQueue &&
                                <TrackList songs={this.props.playNextQueue} onAddToNextQueue={this.onAddToNextQueue} idx={0} playTrack={async (track, idx) => { await this.props.setCurrTrack(track, idx) }} />
                            }
                        </div>
                        <div className="queue-sub-header">
                            <h4>Queue</h4>
                        </div>
                        <div className="queue-container">

                            {
                                songs &&
                                <TrackList songs={songs} playTrack={async (track, idx) => { await this.props.setCurrTrack(track, idx) }} onAddToNextQueue={this.onAddToNextQueue} />
                            }
                        </div>
                    </div>
                </MainLayout>
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        currTrack: state.stationMoudle.currTrack,
        queue: state.stationMoudle.queue,
        playNextQueue: state.stationMoudle.playNextQueue
    }
}
const mapDispatchToProps = {
    setCurrTrack,
    addToNextQueue
}


export const Queue = connect(mapStateToProps, mapDispatchToProps)(_Queue)

