import React from 'react';
import '../styles/Global.scss';
import ComicsSamllSection from '../components/SmallSection'
import DetailSection from '../components/DetailSection';

class ComicsInstance extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='ComicsInstance-main'>
                <DetailSection targetPage='ComicInstancePage' target='comics' hash={this.props.hash} apiKey={this.props.apiKey} />
                <ComicsSamllSection 
                    targetPage='ComicInstancePage' 
                    target='comics' 
                    storeId ={"ComicInstancePage" + "comics" + 'SmallSection'}
                    hash={this.props.hash} 
                    apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default ComicsInstance;