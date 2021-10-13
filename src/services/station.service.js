import { httpService } from './http.service.js'
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
    const res = await axios.get(`${BASE_URL}/station/${user._id}`)
    return res.data
}

async function getStationById(stationId) {
    const res = await axios.get(`${BASE_URL}/${stationId}`)
    console.log("🚀 ~ file: station.service.js ~ line 51 ~ getStationById ~ res.data", res.data)
    return res.data
}

async function getStationFromLocal(stationId) {
    const stations = await storageService.loadFromStorage('stations')
    return stations.find((station) => station._id === stationId)
}

async function getStationByGenre(stationId) {
    const res = await axios.get(`${BASE_URL}/genre/${stationId}`)
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
