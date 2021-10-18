import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/util.service';
import { loadUser } from '../store/user.actions';
import { PrackByUserPreview } from './trackByUser-preview';

class _TrackByUsers extends Component {
    state = {
        users: [],
        userImg: [],
        currTrack: null
    }

    getCurrTrack = (currUserId) => {
        let trackAndUser = this.props.trackAndUsers?.filter(traclANdUser => {
            if (traclANdUser.user._id === currUserId)
                return traclANdUser.track
            return undefined
        })
        // if (!trackAndUser?.length)
        if (!trackAndUser || trackAndUser.length === 0)
            trackAndUser = false

        else trackAndUser = trackAndUser[0]
        return trackAndUser
    }


    render() {
        const { user, users } = this.props

        if (!this.state.users || !this.props.user) return <div>loading</div>
        return (
            <>
                <div className='streaming flex'>
                    <h3>Streaming Now
                    </h3>
                    <span className="fas fa-compact-disc"></span>
                </div>
                <div className='user-track'>
                    {user && user.following.map((currUserId) => {
                        return <PrackByUserPreview key={utilService.makeId()} users={this.props.users}
                            currUserId={currUserId} usersImgs={this.props.usersImgs} user={users.find((user => user._id === currUserId))?.username} track={this.getCurrTrack(currUserId)} />
                    })}

                </div>
            </>
        )
    }
}



function mapStateToProps(state) {
    return {
        user: state.userMoudle.user,
        //users: state.userMoudle.users,
    }
}
const mapDispatchToProps = {
    loadUser
}
export const TrackByUsers = connect(mapStateToProps, mapDispatchToProps)(_TrackByUsers)

