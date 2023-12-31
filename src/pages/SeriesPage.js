import React from 'react';
import '../styles/Global.scss';
import InfiniteEventsImageList from '../components/ImageListInfinite';
import SmallSection from '../components/SmallSection';
import SearchSection from '../components/SearchSection';

class Series extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Events-main'>
                <InfiniteEventsImageList 
                    title="Series"
                    format="false"
                    limit="30"
                    target="series"
                    targetPage="SeriesInstancePage"
                    storeId ={"SeriesInstancePage" + "Series"}
                    hash={this.props.hash}
                    apiKey={this.props.apiKey} />
                <SmallSection 
                    target="series" 
                    targetPage="SeriesInstancePage" 
                    storeId ={"SeriesInstancePage" + "Series" + 'SmallSection'}
                    hash={this.props.hash} 
                    limit="30" 
                    apiKey={this.props.apiKey} />
                <SearchSection 
                    search="series" 
                    targetPage="SeriesInstancePage" 
                    storeId={"SeriesInstancePage" + "Series" + "Search"}
                    hash={this.props.hash} 
                    apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default Series;