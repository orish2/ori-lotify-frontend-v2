import storageService from '../services/storage.service'
import { utilService } from './util.service.js'
import { gPlaylists } from "./data";
import Axios from 'axios'
import { update } from 'lodash';
import { stationServiceNew } from './station.service';
import { socketService } from '../services/socket.service'

const axios = Axios.create({
    withCredentials: true
});

export const userService = {
    getLoggedinUser,
    getUserById,
    addLikeToTrack,
    removeLikeFromTrack,
    AddToRecentlyPlayed,
    setUserPref,
    isGuest,
    updateUser,
    signup,
    login,
    logout,
    getUsers
}
const STORAGE_KEY = "user"
const URL = (process.env.NODE_ENV === 'production') ?
    '/api' :
    'http://localhost:3030/api';


async function signup(user) {
    let userToSave = await axios.post(`${URL}/auth/signup`, user)
    userToSave = userToSave.data
    storageService.saveToStorage(STORAGE_KEY, userToSave)
    return userToSave
}

async function login(credentials) {
    let userToSave = await axios.post(`${URL}/auth/login`, credentials)
    userToSave = userToSave.data
    storageService.saveToStorage(STORAGE_KEY, userToSave)
    return userToSave
}

async function logout() {
    const removed = await axios.post(`${URL}/auth/logout`)
    storageService.removeFromStorage(STORAGE_KEY)
    return removed
}


async function updateUser(user) {
    if (user.username !== "guest") {
        let updatedUser = await axios.put(`${URL}/user/${user._id}`, user)
        _saveUserToStorage(updatedUser.data)
        return updatedUser.data

    }
    else {
        _saveUserToStorage(user)
        return user
    }

}
async function AddToRecentlyPlayed(track, stationOrTrack) {
    let user = await getLoggedinUser()
    if (stationOrTrack === 'track') {
        let recentlyPlayedSongs = user.recentlyPlayedSongs
        if (!recentlyPlayedSongs.length < 10)
            recentlyPlayedSongs = recentlyPlayedSongs.slice(Math.max(recentlyPlayedSongs.length - 9, 0))
        recentlyPlayedSongs.unshift(track)
        user.recentlyPlayedSongs = recentlyPlayedSongs
    }
    else {
        if (!track || track === null) return
        let recentlyPlayedStations = user.recentlyPlayedStations
        if (recentlyPlayedStations.some(stationIdx => stationIdx === track)) return
        if (!recentlyPlayedStations.length < 10)
            recentlyPlayedStations = recentlyPlayedStations.slice(Math.max(recentlyPlayedStations.length - 9, 0))

        recentlyPlayedStations.unshift(track)
        user.recentlyPlayedStations = recentlyPlayedStations
    }
    if (user.username !== "guest") {
        user = await updateUser(user)
    }
    _saveUserToStorage(user)
    return user
}

async function getLoggedinUser() {
    let user = storageService.loadFromStorage(STORAGE_KEY)
    console.log(user);
    if (!user) {
        await login({ username: "guest" })
        getLoggedinUser()
    }
    return user
}

async function isGuest() {
    const user = await getLoggedinUser()
    return user.username === "guest"
}

async function addLikeToTrack(trackId, stationOrTrack) {
    let user = await getLoggedinUser()
    if (stationOrTrack === 'station') {
        user.likedStations.unshift(trackId)
        let stationToUpdate = await stationServiceNew.getStationFromLocal(trackId)//search in local storage
        if (!stationToUpdate)
            if (trackId.length === 24) {
                stationToUpdate = await stationServiceNew.getStationById(trackId)
                console.log('got by id', stationToUpdate);
            } else {
                stationToUpdate = await stationServiceNew.getStationByGenre(trackId)
                console.log('got by genre', stationToUpdate);
            }
            socketService.emit('add like', { userIdliked: stationToUpdate.createdBy.id, currUser: user, stationName: stationToUpdate.name })

        if (!stationToUpdate.likedByUsers) stationToUpdate.likedByUsers = []
        if (!stationToUpdate.likedByUsers.some(likedByUser => likedByUser.id === user._id)) {
            stationToUpdate.likedByUsers.push({ username: user.username, id: user._id })
            await stationServiceNew.saveStation(stationToUpdate)
        }
    }
    else {
        user.likedTracks.unshift(trackId)
    }
    
    if (user.username !== "guest") {
        user = await updateUser(user)
    }
    _saveUserToStorage(user)
    return user
}

async function removeLikeFromTrack(currTrackId, stationOrTrack) {
    let user = await getLoggedinUser()
    if (stationOrTrack === 'station') {
        let likedStations = user.likedStations.filter(trackId => trackId !== currTrackId)
        user.likedStations = likedStations
    }
    else {
        let likedTracks = user.likedTracks.filter(track => track.id !== currTrackId)
        user.likedTracks = likedTracks
    }
    if (user.username !== "guest") {
        user = await updateUser(user)
    }
    _saveUserToStorage(user)
    return user
}


async function getUserById(userId) {
    let user = await axios.get(`${URL}/user/${userId}`)
    return user.data
}
async function getUsers(filterBy) {
    filterBy = { filterBy }
    console.log(filterBy, 'filterBy');
    let res = await axios.get(`${URL}/user`, { params: filterBy })
    return res.data
}

async function setUserPref(userPref) {
    let user = await getLoggedinUser()
    user.userPref = userPref
    if (user.username !== "guest") {
        updateUser(user)
    }
    _saveUserToStorage(user)
    // let user = await axios.get(`${URL}/user/${user._id}`)
    return user
}


function _saveUserToStorage(user) {
    storageService.saveToStorage(STORAGE_KEY, user)
}
