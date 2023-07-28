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
                    storeId ={"CharacterInstancePage" + "Characters"}
                    target="characters"
                    targetPage="CharacterInstancePage"
                    hash={this.props.hash}
                    apiKey={this.props.apiKey} />
                <SearchSection 
                    targetPage="CharacterInstancePage" 
                    search="characters" 
                    storeId={"CharacterInstancePage" + "Characters" + "Search"}
                    hash={this.props.hash} 
                    apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default Characters;