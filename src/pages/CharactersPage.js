import React from 'react';
import '../styles/Global.scss';
import SearchSection from '../components/SearchSection';
import InfiniteCharactersImageList from '../components/ImageListInfinite';

class Characters extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Characters-main'>
                <InfiniteCharactersImageList 
                    title="Characters"
                    format="false"
                    limit="30"
                    target="characters"
                    targetPage="CharacterInstancePage"
                    apiKey={this.props.apiKey} />
                <SearchSection targetPage="CharacterInstancePage" search="characters" hash={this.props.hash} apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default Characters;