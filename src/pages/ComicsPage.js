import React from 'react';
import '../styles/Global.scss';
import ComicsSamllSection from '../components/SmallSection';
import ImageList from '../components/ImageList';

class Comics extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Comics-main'>
                <ImageList target="comics" targetPage="ComicInstancePage" apiKey={this.props.apiKey} />
                <ComicsSamllSection targetPage='ComicInstancePage' target='comics' apiKey={this.props.apiKey}/>
            </div>
        )
    }
}
export default Comics;