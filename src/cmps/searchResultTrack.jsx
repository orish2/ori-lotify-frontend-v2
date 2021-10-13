import { TrackList } from './trackList';
import React from 'react'
import { TrackPreview } from './track-preview';

export class SearchResultTrack extends React.Component {
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

                <div className='grid-search-result-container'>
                    <span className='title'>songs</span>
                    {trackResult.length  &&
                                <TrackList songs={trackResult.slice(0, 5)} playTrack={this.props.playTrack} onAddToNextQueue={this.props.onAddToNextQueue} />
                    }

                </div>
            </section>
        )
    }
}
