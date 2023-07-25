import React from 'react';
import '../styles/Global.scss';
import SmallSection from '../components/SmallSection';
import DetailSection from '../components/DetailSection';

class SeriesInstance extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='SeriesInstance-main'>
                <DetailSection 
                    targetPage='SeriesInstancePage' 
                    target='series' 
                    hash={this.props.hash} 
                    apiKey={this.props.apiKey} />
                <SmallSection 
                    targetPage='SeriesInstancePage' 
                    target='series' 
                    storeId ={"SeriesInstancePage" + "Series" + 'SmallSection'}
                    hash={this.props.hash} 
                    apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default SeriesInstance;