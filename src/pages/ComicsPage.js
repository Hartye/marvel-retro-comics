import React from 'react';
import '../styles/Global.scss';
import ComicsSamllSection from '../components/SmallSection';
import InfiniteComicsImageList from '../components/ImageListInfinite';

class Comics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            target: 'comics',
            targetPage: 'ComicInstancePage'
        }
    }

    render() {
        return (
            <div className='Comics-main'>
                <InfiniteComicsImageList
                    title="Comics"
                    format="comic"
                    limit="30"
                    storeId={this.state.targetPage + 'comics'}
                    target={this.state.target}
                    targetPage={this.state.targetPage}
                    hash={this.props.hash}
                    apiKey={this.props.apiKey} />
                <ComicsSamllSection
                    targetPage={this.state.targetPage}
                    target={this.state.target}
                    storeId={this.state.targetPage + this.state.target + 'SmallSection'}
                    hash={this.props.hash}
                    limit="30"
                    apiKey={this.props.apiKey} />
                <InfiniteComicsImageList
                    title="Infinite Comics"
                    format="infinite comic"
                    limit="30"
                    storeId={this.state.targetPage + 'infinitecomic'}
                    target={this.state.target}
                    targetPage={this.state.targetPage}
                    hash={this.props.hash}
                    apiKey={this.props.apiKey} />
                <InfiniteComicsImageList
                    title="Trade Paperback"
                    format="trade paperback"
                    limit="30"
                    storeId={this.state.targetPage + 'tradepaperback'}
                    target={this.state.target}
                    targetPage={this.state.targetPage}
                    hash={this.props.hash}
                    apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default Comics;