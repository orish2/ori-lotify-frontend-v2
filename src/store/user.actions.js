import { userService } from "../services/user.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'
import { socketService } from "../services/socket.service.js";
//import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../services/socket.service.js";

export function loadUser() {
    return async dispatch => {
        try {
            let user = await userService.getLoggedinUser()
            if (!user) {
                user = await userService.login({ username: 'guest' })
            }
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        }
    }
}

export function loadUsers() {
    return async dispatch => {
        try {
            let users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        }
    }
}


export function addLikeToTrack(trackId, stationOrTrack) {
    return async dispatch => {
        try {
            await userService.addLikeToTrack(trackId, stationOrTrack)
            dispatch({ type: 'ADD_LIKE_TO_TRACK', trackId, stationOrTrack })

        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}


export function removeLikeFromTrack(trackId, stationOrTrack) {
    return async dispatch => {
        try {
            await userService.removeLikeFromTrack(trackId, stationOrTrack)
            dispatch({ type: 'REMOVE_LIKE_FROM_TRACK', trackId, stationOrTrack })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}


export function setUserPref(userPref) {
    return async dispatch => {
        try {
            await userService.setUserPref(userPref)
            dispatch({ type: 'SET_USERֹ_PREF', userPref })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            socketService.emit('set-user-socket', user._id);
        } catch (err) {
            showErrorMsg('Cannot login')
            console.log('Cannot login', err)
        }
    }
}


export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            socketService.emit('set-user-socket', user._id);

        } catch (err) {
            showErrorMsg('Cannot signup')
            console.log('Cannot signup', err)
        }

    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            loadUser()
            socketService.emit('unset-user-socket');
        }
        catch (err) {
            showErrorMsg('Cannot signup')
            console.log('Cannot signup', err)

        }

    }
}


export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}


export function updateUser(userToUpdate) {
    return async dispatch => {
        try {
            let a = await userService.updateUser(userToUpdate)
            dispatch({ type: 'UPDATE_USER', user: userToUpdate })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}