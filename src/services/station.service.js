// import { httpService } from './http.service.js'
import Axios from 'axios'
import storageService from './storage.service.js';
import { userService } from './user.service.js';

const axios = Axios.create({
    withCredentials: true
});
const BASE_URL = (process.env.NODE_ENV === 'production')
    ? '/api/station'
    : 'http://localhost:3030/api/station';

export const stationServiceNew = {
    query,
    getStationById,
    searchStation,
    saveStation,
    getStationByGenre,
    getStationFromLocal,
    getStationsByUser,
    getStation,
    getGoodDay,
    getHot
}

async function query(filterBy = {}) {
    //const res = await axios.get('http://localhost:3030/api/toy', { params: filterBy })
    const res = await axios.get(`${BASE_URL}`, { params: filterBy })
    return res.data
}

async function getGoodDay() {
    const res = await axios.get(`${BASE_URL}/goodDay`)
    return res.data
}

async function getHot() {
    const res = await axios.get(`${BASE_URL}/hot`)
    return res.data
}

async function getStationsByUser() {
    const user = await userService.getLoggedinUser()
    // const res = await axios.get(`${BASE_URL}/station/${user._id}`)
    // console.log('user from station service', user._id);

    if (user.username === 'guest') {
        let stations = []
        user.likedStations.forEach(async stationId => {
            const station = await getStationById(stationId)
            stations.push(station)
        })
        const likeStation = await getStationByGenre('likedTracks')
        stations.push(likeStation)
        return stations
    }
    // console.log('getting by user');
    const res = await axios.get(`${BASE_URL}/station/${user._id}`)
    return res.data
}

async function getStation(idOrGenre) {
    let station = await getStationFromLocal(idOrGenre)
    console.log('station 64', station);
    if (!station)
        station = idOrGenre.length < 24 ? await getStationByGenre(idOrGenre) : await getStationById(idOrGenre)
    return station
}

async function getStationById(stationId) {
    let station
    if (stationId !== 'likedTracks' && stationId.length < 24)
        station = await getStationFromLocal(stationId)
    if (!station) {
        const res = await axios.get(`${BASE_URL}/${stationId}`)
        station = res.data
    }
    // console.log("🚀 ~ file: station.service.js ~ line 51 ~ getStationById ~ res.data", res.data)
    return station
}

async function getStationFromLocal(stationId) {
    const stations = await storageService.loadFromStorage('stations')
    // console.log('stationsss', stations);
    let station = stations.find((station) => station._id === stationId)
    if (!station && stationId !== 'likedTracks' && stationId.length < 24) {

        console.log('statiolnnid', stationId);
        station = await storageService.loadFromStorage(`${stationId}playlist`)
        // console.log('station is sss', station);
        if (station)
            station = station[0]

    }
    if (!station) return null
    return station
}

async function getStationByGenre(stationId) {
    const res = await axios.get(`${BASE_URL}/genre/${stationId}`)
    console.log('got by genre', res.data);
    return res.data
}

function saveStation(stationToEdit) {
    return stationToEdit._id ? _updateStation(stationToEdit) : _addStation(stationToEdit)
}

async function _addStation(stationToEdit) {
    const res = await axios.post(`${BASE_URL}`, stationToEdit)
    return res.data
}

async function _updateStation(stationToEdit) {
    const res = await axios.put(`${BASE_URL}`, stationToEdit)
    return res.data
}


async function searchStation(keySearch) {
    const stations = await query({ keySearch })
    return stations
}




    //async function remove(toyId) {
    //    await axios.delete(`${BASE_URL}/${toyId}`)
    //}
