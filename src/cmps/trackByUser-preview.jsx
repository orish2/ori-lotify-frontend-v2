import React, { Component } from 'react'
import Avatar from 'react-avatar';
import { connect } from 'react-redux'
import { loadStations, addToNextQueue, setCurrTrack, setQueue } from '../store/station.actions.js';
import play from '../assets/img/play.svg'
import musicLa from '../assets/img/musicLa.svg'
class _PrackByUserPreview extends Component {

    playTrack = async (track, idx) => {
        const { currStation } = this.props
        let songs = [track]
        await this.props.setCurrTrack(track, idx);
        if (!track.nextQueue) {
            await this.props.setQueue(songs, currStation?._id)
        }
    }
    handlePlayTrack = async (data) => {
        await this.playTrack(data.track, data.idx)
    }
    render() {
        return (
            <div className={this.props.track ? 'user-preview order flex' : 'user-preview  flex'}>
                <div className='avatar'>
                    <Avatar src={this.props.usersImgs.find(imgObj => this.props.currUserId === imgObj.id)?.url} size="70" round={true} />
                </div>
                {this.props.users && <span >
                    {this.props.users.find((user => user._id === this.props.currUserId))?.username}</span>}


                {this.props.track &&
                    <div className={"track"} onClick={this.handlePlayTrack.bind(this, { track: this.props.track.track, idx: 0 })}>
                        <img src={musicLa} alt="" />
                        <div><p> {this.props.track.track.title}</p></div>
                    </div>
                }

                {!this.props.track &&
                    <div className={"offline"}>
                        <div>offline</div>
                    </div>
                }
                {this.props.track &&
                    <>
                        <img className='play' alt="" src={play}
                            onClick={this.handlePlayTrack.bind(this, { track: this.props.track.track, idx: 0 })} />
                        <span className="fas fa-volume-up"></span>
                    </>
                }



            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations,
        queue: state.stationMoudle.queue,
        playNextQueue: state.stationMoudle.playNextQueue,
        isPlaying: state.stationMoudle.isPlaying,
        user: state.userMoudle.user,
    }
}
const mapDispatchToProps = {
    loadStations,
    addToNextQueue,
    setCurrTrack,
    setQueue,
}


export const PrackByUserPreview = connect(mapStateToProps, mapDispatchToProps)(_PrackByUserPreview)

