import React from 'react';
import '../styles/Global.scss';
import DetailSection from '../components/DetailSection';
import InfiniteComicsImageList from '../components/ImageListInfinite';

class CreatorInstance extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='CreatorInstance-main'>
                <DetailSection targetPage='CreatorsInstancePage' target='creators' hash={this.props.hash} apiKey={this.props.apiKey} />
                <InfiniteComicsImageList
                    title="Creations"
                    format="comic"
                    creator={window.location.pathname.split('/').slice(-1).toString()}
                    limit="30"
                    storeId={"CreatorCreations" + "comics"}
                    target='comics' 
                    targetPage='ComicInstancePage' 
                    request="true"
                    hash={this.props.hash}
                    apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default CreatorInstance;