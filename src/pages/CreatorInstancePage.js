import React from 'react';
import '../styles/Global.scss';
import DetailSection from '../components/DetailSection';

class CreatorInstance extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='CreatorInstance-main'>
                <DetailSection targetPage='CreatorsInstancePage' target='creators' hash={this.props.hash} apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default CreatorInstance;