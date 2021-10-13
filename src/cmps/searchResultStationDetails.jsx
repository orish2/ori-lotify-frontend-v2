import { TrackList } from './trackList';
import React from 'react'
import { TrackPreview } from './track-preview';

export class SearchResultStationDetails extends React.Component {
    state = {
        trackResult: null,
    }
    componentDidMount() {
        const { trackResult } = this.props
        this.setState({ trackResult })

    }
    componentDidUpdate(prevProps) {
        if (this.props.trackResult !== prevProps.trackResult) {
            const { trackResult } = this.props
            this.setState({ trackResult })
        }
    }

    render() {
        const { trackResult } = this.state
        if (!trackResult || !trackResult.length) return <div>No track found</div>
        return (
            <section className='search-result-container'>
                <TrackList loadStation={this.props.loadStation} stationId={this.props.stationId} isOnDeatils={true} songs={trackResult} playTrack={this.props.playTrack} onAddToNextQueue={this.props.onAddToNextQueue} />
            </section>
        )
    }
}
