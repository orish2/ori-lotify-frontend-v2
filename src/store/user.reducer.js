
const initialState = {
    //user: userService.getLoggedinUser(),
    user: null,
    users: [],
}


export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'CHANGE_COUNT':
            newState = { ...state, count: state.count + action.diff }
            break;
        case 'SET_USER':
            newState = { ...state, user: { ...action.user } }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            newState = { ...state, users: [...action.users] }
            break;
        case 'UPDATE_USER':
            let users = state.users.map(user => (user._id === action.user._id) ? action.user : user);
            newState = { ...state, users, user: { ...action.user } }
            break;
        case 'ADD_LIKE_TO_TRACK':
            if (action.stationOrTrack === 'station')
                newState = { ...state, user: { ...state.user, likedStations: [...state.user.likedStations, action.trackId] } }
            else {
                newState = { ...state, user: { ...state.user, likedTracks: [...state.user.likedTracks, action.trackId] } }
            }
            break;
        case 'REMOVE_LIKE_FROM_TRACK':

            if (action.stationOrTrack === 'station') {
                var likedStations = state.user.likedStations.filter(currStationId => currStationId !== action.trackId);
                newState = { ...state, user: { ...state.user, likedStations: likedStations } }
            }
            else {
                var likedTracks = state.user.likedTracks.filter(currTrack => currTrack.id !== action.trackId);
                newState = { ...state, user: { ...state.user, likedTracks: likedTracks } }
            }
            break;
        case 'SET_USERֹ_PREF':
            newState = { ...state, user: { ...state.user, userPref: action.userPref } }
            break;
        case 'ADD_TO_RECENTLY_PLAYED':
            if (action.stationOrTrack === 'station')
                newState = { ...state, user: { ...state.user, recentlyPlayedStations: [...state.user.recentlyPlayedStations, action.track] } }
            else {
                newState = { ...state, user: { ...state.user, recentlyPlayedSongs: [...state.user.recentlyPlayedSongs, action.track] } }
            }
            break;
        default:

    }
    return newState;

}

