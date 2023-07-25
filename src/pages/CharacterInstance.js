import React from 'react';
import '../styles/Global.scss';
import SmallSection from '../components/SmallSection'
import DetailSection from '../components/DetailSection';

class CharacterInstance extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='CharacterInstance-main'>
                <DetailSection targetPage='CharacterInstancePage' target='characters' hash={this.props.hash} apiKey={this.props.apiKey} />
                <SmallSection targetPage='CharacterInstancePage' target='characters' hash={this.props.hash} apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default CharacterInstance;