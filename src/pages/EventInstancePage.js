import React from 'react';
import '../styles/Global.scss';
import SmallSection from '../components/SmallSection'
import DetailSection from '../components/DetailSection';

class EventInstance extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='EventInstance-main'>
                <DetailSection targetPage='EventInstancePage' target='events' hash={this.props.hash} apiKey={this.props.apiKey} />
                <SmallSection 
                    targetPage='EventInstancePage' 
                    target='characters' 
                    limit="30" 
                    storeId ={"EventInstancePage" + "Events" + 'SmallSection'}
                    hash={this.props.hash} 
                    apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default EventInstance;