import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { DraggableTrackPreview } from './draggable-track-preview';




export const DraggableTrackList = SortableContainer(({ songs, currStation, loadStation, 
}) => {
  
  //const sliceNum = isShowAll ? songs.length : 7
  //sliceNum = songs.length>10 
  return (
    <div className="station-track-list flex column">
      <div className="list-headers flex">
        <div className="track-num-header">#</div>
        <div className="track-img-header"></div>
        <div className="track-title-header">Title</div>
        <div className="duration-header">◷</div>
        <div className="likes-header"></div>
        <div className="actions-header">actions</div>
      </div>
      {

        songs.map((track, idx) => {
          return <DraggableTrackPreview key={track.id} index={idx} track={track} idx={idx}
            currStation={currStation} loadStation={loadStation} />
        })

      }

    </div>
  )
});
