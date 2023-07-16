import React from 'react';
import '../styles/Global.scss';
import ImageList from '../components/ImageList';
import SmallSection from '../components/SmallSection';
import SearchSection from '../components/SearchSection';

class Events extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Events-main'>
                <ImageList target="events" targetPage="EventInstancePage" apiKey={this.props.apiKey} />
                <SmallSection target="events" targetPage="EventInstancePage" apiKey={this.props.apiKey} />
                <SearchSection search="events" targetPage="EventInstancePage" apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default Events;