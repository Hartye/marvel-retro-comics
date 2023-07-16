import React from 'react';
import '../styles/Global.scss';
import ImageList from '../components/ImageList';
import SmallSection from '../components/SmallSection';
import SearchSection from '../components/SearchSection';

class Series extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Events-main'>
                <ImageList target="series" targetPage="SeriesInstancePage" apiKey={this.props.apiKey} />
                <SmallSection target="series" targetPage="SeriesInstancePage" apiKey={this.props.apiKey} />
                <SearchSection search="series" targetPage="SeriesInstancePage" apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default Series;