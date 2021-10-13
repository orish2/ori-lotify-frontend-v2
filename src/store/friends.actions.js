

export function setFriendCurrTrack({ track, user, currLoginUser }) {
    return async (dispatch) => {
        dispatch(
            {
                type: 'SET_FRIEND_CURR_TRACK',
                track,
                user,
                currLoginUser
            }
        )

    }
}
