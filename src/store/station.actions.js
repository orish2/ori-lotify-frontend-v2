import { guestService } from "../services/async-storage.service dont delete.js";
import { stationServiceNew } from "../services/station.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
import { AddToRecentlyPlayed } from "./user.actions.js";

export function loadStations() {
    return async (dispatch) => {
        try {
            let stations = await stationServiceNew.getStationsByUser()
            let guestStations = await guestService.query()
            stations = stations.concat(guestStations)
            console.log(stations);
            dispatch({
                type: 'SET_STATIONS',
                stations
            })
        }
        catch (err) {
            console.log(`Had Issues ${err}`)
            throw err
        }
    }
}

export function addStation(newStation) {
    return async (dispatch) => {
        if (await userService.isGuest()) {
            console.log('is guest');
            newStation = await guestService.saveStation(newStation)
        } else {
            console.log('not guest');
            newStation = await stationServiceNew.saveStation(newStation)
        }
        dispatch({
            type: 'ADD_STATION',
            newStation
        })
        showSuccessMsg("Add to your Stations")
    }
}

export function unshuffleQueue(playedStationId) {
    return async (dispatch) => {
        let queue = await stationServiceNew.getStationById(playedStationId)
        queue = queue.songs
        dispatch({
            type: 'SET_QUEUE',
            queue,
            stationId: playedStationId
        })
    }
}

//without service
export function setCurrTrack(track, idx) {
    return async (dispatch) => {
        ////add track to recentlyPlayed
        try {
            dispatch({
                type: 'SET_CURR_TRACK',
                track,
                idx,
            })
            //await userService.AddToRecentlyPlayed(track, 'track')
            //dispatch({ type: 'ADD_TO_RECENTLY_PLAYED', stationOrTrack: 'track', track })
        }

        catch (err) {
            console.log('UserActions: err in removeUser', err)
        }

    }
}

export function setQueue(queue, stationId = 0) {
    queue = queue.filter(track => !track.nextQueue)
    return async (dispatch) => {
        try {
            dispatch({
                type: 'SET_QUEUE',
                queue,
                stationId
            })
            if (!stationId) return
            await userService.AddToRecentlyPlayed(stationId, 'station')
            dispatch({ type: 'ADD_TO_RECENTLY_PLAYED', stationOrTrack: 'station', stationId })
        }
        catch (err) {
            console.log('setQueue  error', err)
        }
    }
}

export function addToNextQueue(track) {
    return async (dispatch) => {
        let newTrack = { ...track }
        newTrack.nextQueue = true
        dispatch({
            type: 'ADD_TO_NEXT_QUEUE',
            track: newTrack
        })
        showSuccessMsg('Added to queue')
    }
}

export function playNextTrack() {
    return async (dispatch) => {
        dispatch({
            type: 'NEXT_TRACK',
        })
    }
}

export function playPrevTrack() {
    return async (dispatch) => {
        dispatch({
            type: 'PREV_TRACK',
        })
    }
}

export function toggleIsPlaying() {
    return async (dispatch) => {
        dispatch({
            type: 'TOGGLE_ISPLAYING',
        })
    }
}

export function setPlay() {
    return async (dispatch) => {
        dispatch({
            type: 'SET_PLAY',
        })
    }
}

export function setCurrStation(station) {
    return async (dispatch) => {
        dispatch(
            {
                type: 'SET_CURR_STATION',
                station
            }
        )

    }
}

export function shuffleQueue(queue) {
    for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = queue[i];
        queue[i] = queue[j];
        queue[j] = temp;
    }
    return async (dispatch) => {
        dispatch({
            type: 'SHUFFLE_QUEUE',
            queue
        })
    }
}




//function deleteStation(stationId) {
//    var stationIdx = gStations.findIndex(function (station) {
//        return stationId === station.id
//    })
//    gStations.splice(stationIdx, 1)
//    _saveStationsToStorage();
//    return Promise.resolve()
//}
