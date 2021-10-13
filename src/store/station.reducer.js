const initialState = {
    stations: [],
    queue: [],
    playNextQueue: [],
    currTrack: null,
    isPlaying: false,
    playedStation: null,
    currStation: null
}
export function stationReducer(state = initialState, action) {
    var newState = state
    const newQueue = [...state.queue]
    const newPlayNextQueue = [...state.playNextQueue]
    let nextTrack = {}
    switch (action.type) {
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'SET_CURR_TRACK':
            if (action.track.nextQueue) {
                if (state.currTrack) newPlayNextQueue.splice(action.idx, 1)
            }
            if (!state.currTrack?.nextQueue) {
                newQueue.push(state.currTrack)
            }
            newState = { ...state, currTrack: action.track, queue: newQueue, playNextQueue: newPlayNextQueue }
            break
        case 'SET_QUEUE':
            let idx = action.queue.findIndex((track) => state.currTrack.id === track.id)
            const befores = action.queue.splice(0, idx)
            action.queue.shift()
            action.queue = action.queue.concat(befores)
            newState = { ...state, queue: action.queue, playedStation: action.stationId };
            break
        case 'ADD_TO_NEXT_QUEUE':
            if (!state.currTrack) {
                newState = { ...state, currTrack: action.track };
                break
            }
            newPlayNextQueue.push(action.track)
            newState = { ...state, playNextQueue: newPlayNextQueue };
            break
        case 'SHUFFLE_QUEUE':
            newState = { ...state, queue: action.queue };
            break
        case 'TOGGLE_ISPLAYING':
            newState = { ...state, isPlaying: !state.isPlaying };
            break
        case 'SET_PLAY':
            newState = { ...state, isPlaying: true };
            break
        case 'NEXT_TRACK':
            if (state.playNextQueue.length > 0) {
                nextTrack = newPlayNextQueue.shift();

            } else {
                nextTrack = newQueue.shift();
            }
            if (!state.currTrack.nextQueue) newQueue.push(state.currTrack)
            newState = {
                ...state,
                currTrack: nextTrack,
                queue: newQueue,
                playNextQueue: newPlayNextQueue
            };

            break
        case 'PREV_TRACK':
            nextTrack = newQueue.pop();
            newQueue.unshift(state.currTrack)
            newState = {
                ...state,
                currTrack: nextTrack,
                queue: newQueue,
            };
            break
        case 'SET_CURR_STATION':
            newState = { ...state, currStation: action.station }
            break;
        case 'ADD_STATION':
            newState = { ...state, stations: [...state.stations, action.newStation] };
            break
        // case ''
        default:
    }
    return newState

}
