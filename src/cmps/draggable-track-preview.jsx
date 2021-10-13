import { SortableElement } from 'react-sortable-hoc';
import { TrackPreview } from './track-preview';


export const DraggableTrackPreview = SortableElement(({ track, idx, currStation, loadStation, key }) => {
  return (
    <TrackPreview key={key} track={track} idx={idx} currStation={currStation} loadStation={loadStation} />
  )
});