const initialState = {
    stations: [],
    queue: [],
    playNextQueue: [],
    currTrack: null,
    isPlaying: false
}
export function stationReducer(state = initialState, action) {
    var newState = state
    var newQueue = [...state.queue]
    var newPlayNextQueue = [...state.playNextQueue]
    let nextTrack = {}
    switch (action.type) {
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'SET_CURR_TRACK':
            if (action.track.nextQueue) {
                if (state.currTrack) newPlayNextQueue.splice(action.idx, 1)
            }
            else {
                if (state.currTrack) {
                    newQueue.splice(action.idx, 1)
                }
            }
            if (!state.currTrack?.nextQueue) {
                newQueue.push(state.currTrack)
            }
            newState = { ...state, currTrack: action.track, queue: newQueue, playNextQueue: newPlayNextQueue }
            // console.log('new state', newState);

            break
        case 'SET_QUEUE':
            // ori - i uncomment this
            action.queue.splice(action.idx, 1);

            //ori
            // newQueue = [...action.queue];
            //
            // console.log('action queue', action.queue);
            // console.log('newQueue', newQueue);
            newState = { ...state, queue: action.queue };
            // console.log('new State', newState);
            break
        case 'ADD_TO_NEXT_QUEUE':
            if (!state.currTrack) {
                newState = { ...state, currTrack: action.track };
                break;
            }
            newPlayNextQueue.push(action.track)
            newState = { ...state, playNextQueue: newPlayNextQueue };
            break;

        case 'SHUFFLE_QUEUE':
            newState = { ...state, queue: action.queue };
            break;

        case 'TOGGLE_ISPLAYING':
            newState = { ...state, isPlaying: !state.isPlaying };
            break

        case 'SET_PLAY':
            newState = { ...state, isPlaying: true };
            break

        case 'NEXT_TRACK':
            // console.log('newQueue from nextTrack', newQueue)
            if (state.playNextQueue.length > 0) {
                nextTrack = newPlayNextQueue.shift();

            } else {
                nextTrack = newQueue.shift();
            }
            if (!state.currTrack.nextQueue) newQueue.push(state.currTrack)
            newState = {
                ...state,
                currTrack: nextTrack,
                // ori - i uncomment next line
                queue: newQueue,
                playNextQueue: newPlayNextQueue
            };
            // console.log('new statee', newState);
            break;

        case 'PREV_TRACK':
            nextTrack = newQueue.pop();
            newQueue.unshift(state.currTrack)
            newState = {
                ...state,
                currTrack: nextTrack,
                queue: newQueue,
            };
            break
        case 'ADD_STATION':
            newState = { ...state, stations: [...state.stations, action.newStation] };
            break
        default:
    }
    return newState

}
