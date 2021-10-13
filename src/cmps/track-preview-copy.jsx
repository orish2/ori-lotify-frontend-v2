import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { stationService } from '../services/async-storage.service';
import { eventBusService } from '../services/event-bus.service';
// import { loadStations, addToNextQueue, setCurrTrack, setQueue } from '../store/station.actions.js';
import { SortableElement } from 'react-sortable-hoc';


export const TrackPreviewCopy = SortableElement(({ getTimeFromDuration, onAddToStation, onRemoveFromStation, playTrack,
    loadStations, addToNextQueue, track, idx, currStation, stations }) => {
    loadStations()
    return (
        <tr className="song-container" onClick={() => playTrack(track, idx)}>
            <td className='song-num'>{idx + 1}</td>
            <td><img src={track.imgUrl} alt="" /></td>
            <td>{track.title}</td>
            <td>{getTimeFromDuration(track.duration)}</td>
            <td className="button-cell" onClick={(ev) => { ev.stopPropagation() }}>
                <Menu menuButton={
                    <MenuButton><i className="fas fa-ellipsis-h"></i></MenuButton>}>
                    <MenuItem onClick={() => addToNextQueue(track)}>Add To queue</MenuItem>
                    {currStation && <MenuItem onClick={() => {
                        onRemoveFromStation(track, currStation._id)
                    }
                    }>Remove from station</MenuItem>}
                    <SubMenu label="Add to playlist">
                        {stations.map((station) => {
                            return (<MenuItem onClick={() => { onAddToStation(track, station._id) }}>{station.name}</MenuItem>)
                        })
                        }
                        <MenuItem onClick={() => eventBusService.emit("create-playlist")}>Create playlist</MenuItem>
                    </SubMenu>
                </Menu>
            </td>
        </tr>
    )

})
// return (

//     <div className="song-container flex">
//         <div className="song-num">{idx + 1}</div>
//         <div><img src={track.imgUrl} alt="" /></div>
//         <div>{track.title}</div>
//         <div>{this.getTimeFromDuration(track.duration)}</div>
//         <div className="button-cell" onClick={(ev) => { ev.stopPropagation() }}>
//             <Menu menuButton={
//                 <MenuButton><i className="fas fa-ellipsis-h"></i></MenuButton>}>
//                 <MenuItem onClick={() => this.props.addToNextQueue(track)}>Add To queue</MenuItem>
//                 {currStation && <MenuItem onClick={() => {
//                     this.onRemoveFromStation(track, currStation._id)
//                 }
//                 }>Remove from station</MenuItem>}
//                 <SubMenu label="Add to playlist">
//                     {stations.map((station) => {
//                         return (<MenuItem onClick={() => { this.onAddToStation(track, station._id) }}>{station.name}</MenuItem>)
//                     })
//                     }
//                     <MenuItem onClick={() => eventBusService.emit("create-playlist")}>Create playlist</MenuItem>
//                 </SubMenu>
//             </Menu>
//         </div>
//     </div>
// )


{/* <tr className="song-container" onClick={() => this.playTrack(track, idx)}>
    <td className='song-num'>{idx + 1}</td>
    <td><img src={track.imgUrl} alt="" /></td>
    <td>{track.title}</td>
    <td>{this.getTimeFromDuration(track.duration)}</td>
<td className="button-cell" onClick={(ev) => { ev.stopPropagation() }}>
    <Menu menuButton={
        <MenuButton><i className="fas fa-ellipsis-h"></i></MenuButton>}>
        <MenuItem onClick={() => this.props.addToNextQueue(track)}>Add To queue</MenuItem>
        {currStation && <MenuItem onClick={() => {
            this.onRemoveFromStation(track, currStation._id)
        }
        }>Remove from station</MenuItem>}
        <SubMenu label="Add to playlist">
            {stations.map((station) => {
                return (<MenuItem onClick={() => { this.onAddToStation(track, station._id) }}>{station.name}</MenuItem>)
            })
            }
            <MenuItem onClick={() => eventBusService.emit("create-playlist")}>Create playlist</MenuItem>
        </SubMenu>
    </Menu>
</td>
</tr> */}




// function mapStateToProps(state) {
//     return {
//         stations: state.stationMoudle.stations,
//         queue: state.stationMoudle.queue,
//         currTrack: state.stationMoudle.currTrack
//     }
// }
// const mapDispatchToProps = {
//     loadStations,
//     addToNextQueue,
//     setCurrTrack,
//     setQueue
// }


// export const TrackPreviewCopy = connect(mapStateToProps, mapDispatchToProps)(_TrackPreviewCopy)