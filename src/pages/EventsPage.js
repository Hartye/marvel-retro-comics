import React from 'react';
import '../styles/Global.scss';
import InfiniteEventsImageList from '../components/ImageListInfinite';
import SmallSection from '../components/SmallSection';
import SearchSection from '../components/SearchSection';

class Events extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Events-main'>
                <InfiniteEventsImageList 
                    title="Events"
                    format="false"
                    limit="30"
                    target="events"
                    targetPage="EventInstancePage"
                    apiKey={this.props.apiKey} />
                <SmallSection target="events" targetPage="EventInstancePage" hash={this.props.hash} apiKey={this.props.apiKey} />
                <SearchSection search="events" targetPage="EventInstancePage" hash={this.props.hash} apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default Events;