import React from 'react'

import { TrackPreview } from './track-preview'

export function TrackList({ loadStation, songs, stationId, currStation, isOnDeatils }) {
    return (<>
        {songs.map((track, idx) => {
            return <TrackPreview  stationId={stationId} isOnDeatils={isOnDeatils} key={track._id} track={track} idx={idx} currStation={currStation} loadStation={loadStation} />
        }
        )}
    </>
    )
}
