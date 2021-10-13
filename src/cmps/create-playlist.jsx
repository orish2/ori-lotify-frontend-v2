import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CreatableSelect from 'react-select/creatable';
import { eventBusService } from '../services/event-bus.service';
import { connect } from 'react-redux'
import { addStation } from '../store/station.actions.js';

class _CreateStation extends Component {
    state = {
        station: {
            name: "",
            tags: [],
        },
        songs: [],
        isCreate: false
    }

    labelOptions = [
        { value: "happy", label: "happy" },
        { value: "pop", label: "Pop" },
        { value: "sad", label: "Sad" },
        { value: "alternative", label: "Alternative" },
        { value: "Rock", label: "Rock" },
        { value: "rap", label: "Rap" },]

    componentDidMount() {
        eventBusService.on("create-playlist", this.create)
    }

    create = (track) => {
        const songs = track ? [track] : []
        this.setState({ isCreate: !this.state.isCreate, songs, station: { name: "", tags: [] } })
    }

    handleChange = ({ target }) => {
        if (Array.isArray(target)) {
            let tags = target.map(option => option.value)
            this.setState(prevState => ({ ...prevState, station: { ...prevState.station, tags } }))
            return
        }
        const key = target.name
        const val = target.value
        this.setState(prevState => ({ ...prevState, station: { ...prevState.station, [key]: val } }))
    }


    onAddStation = (ev) => {
        ev.preventDefault()
        if (!this.state.station.name) { }
        const newStation = {
            name: this.state.station.name ? this.state.station.name : 'Playlist',
            tags: this.state.station.tags,
            likedByUsers: [],
            songs: this.state.songs
        }
        this.props.addStation(newStation)
        this.create()
    }


    render() {
        const { isCreate, station } = this.state
        return (
            <>
                <div className={`create-playlist ${isCreate ? "on" : "off"}`} onSubmit={(ev) => { this.onAddStation(ev) }}>
                    <div className="header">
                        <h1>Create Playlist</h1>
                        <button className="create-close-btn" onClick={this.create}>X</button>
                    </div>
                    <div className="body flex">
                        <form onSubmit={(ev) => ev.preventDefault()}>
                            <TextField
                                className="create-name"
                                label="Name"
                                value={station.name}
                                name="name"
                                autoComplete="off"
                                onChange={this.handleChange}
                            />
                            <CreatableSelect
                                onChange={(e) => this.handleChange({ 'target': e })}
                                name='label'
                                className="select"
                                closeMenuOnSelect={false}
                                options={this.labelOptions}
                                isMulti
                                value={this.state.station.tags.map(tag => ({ value: tag, label: tag }))}
                                placeholder="Tags..."
                            />
                            <div className="buttons flex">
                                <Button style={{ height: "33px", background: '#1db954' }} variant="contained" onClick={this.onAddStation}>
                                    Create
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={`body-modal ${isCreate ? "on" : "off"}`} onClick={this.create}></div>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
    }
}
const mapDispatchToProps = {
    addStation
}


export const CreateStation = connect(mapStateToProps, mapDispatchToProps)(_CreateStation)