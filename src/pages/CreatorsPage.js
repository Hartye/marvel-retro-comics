import React from 'react';
import '../styles/Global.scss';
import SearchSection from '../components/SearchSection';

class Characters extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Characters-main'>
                <SearchSection targetPage="noPage" search="creators" apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default Characters;