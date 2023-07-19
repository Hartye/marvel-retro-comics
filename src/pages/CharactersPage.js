import React from 'react';
import '../styles/Global.scss';
import SearchSection from '../components/SearchSection';
import ImageList from '../components/ImageList';

class Characters extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Characters-main'>
                <ImageList target="characters" targetPage="CharacterInstancePage" apiKey={this.props.apiKey} />
                <SearchSection targetPage="CharacterInstancePage" search="characters" apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default Characters;