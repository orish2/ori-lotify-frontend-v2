import { TrackList } from './trackList';
import React from 'react'
import { TrackPreview } from './track-preview';
import { StationPreview } from './station-preview';

export class SearchResultStation extends React.Component {
    state = {
        stationResult: null,
    }
    componentDidMount() {
        const { stationResult } = this.props
        this.setState({ stationResult })
    }

    componentDidUpdate(prevProps) {
        if (this.props.stationResult !== prevProps.stationResult) {
            const { stationResult } = this.props
            this.setState({ stationResult })
        }
    }

    render() {
        const { stationResult } = this.state
        if (!stationResult || !stationResult.length) return <div>No station found</div>
        return (
            <section className='search-result-container'>
                <h1 className='title'>Station</h1>
                <div className='playlist-container flex'>
                    <div className="flex genre">
                        {stationResult.map((station => <StationPreview key={station._id} station={station} />))}
                    </div>
                </div>
            </section>
        )
    }
}
