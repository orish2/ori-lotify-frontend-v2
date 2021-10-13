const initialState = {
    trackAndUsers: [],
}
export function friendReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_FRIEND_CURR_TRACK':
            //if not following
            debugger
            //if (!action.currLoginUser.following?.length) {
            //    newState = { ...state, trackAndUsers: [] }
            //    break
            //}
            //else {
            //    if (!action.currLoginUser.following.includes(action.user._id)) {
            //        let trackAndUsers = state.trackAndUsers.filter(trackAndUser => trackAndUser.user._id !== action.user._id)
            //        newState = { ...state, trackAndUsers }
            //        break
            //    }
            //}
            const trackAndUserIdx = state.trackAndUsers?.findIndex(trackAndUser => trackAndUser.user._id === action.user._id)
            if (trackAndUserIdx !== -1) {
                let trackAndUsers = [...state.trackAndUsers];
                let trackAndUser = { ...trackAndUsers[trackAndUserIdx] };
                trackAndUser.track = action.track;
                trackAndUsers[trackAndUserIdx] = trackAndUser
                newState = { ...state, trackAndUsers }
            }
            else {
                newState = { ...state, trackAndUsers: [...state.trackAndUsers, ({ track: action.track, user: { ...action.user } })] }
            }
            break
        default:
    }
    return newState
}
