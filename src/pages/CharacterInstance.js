import React from 'react';
import '../styles/Global.scss';
import '../styles/CharacterInstancePage.scss';
import SmallSection from '../components/SmallSection'

class CharacterInstance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requested: false
        }
    }

    async componentDidMount() {
        let id = window.location.pathname.split('/');
        id = id[id.length-1];
        let url =
            'http://gateway.marvel.com/v1/public/' +
            'characters/' + // characters | comics | creators | events | series | stories
            id +
            '?apikey=' + this.props.apiKey;
        let req = new Request(url);
        await fetch(req)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(url)
                console.log(res);

                if (this.state.requested == false) {
                    let counter = 0;
                    counter++;
                    let imageURL = res.data.results[0].thumbnail.path + '/portrait_uncanny.' + res.data.results[0].thumbnail.extension;
                    let htmlContent =
                        `
                    <div id="${id}">
                        <img src="${imageURL}" alt="Comic" />
                        <section>
                            <h1>${res.data.results[0].name}</h1>
                            <p>${res.data.results[0].description == '' ? 'N/A' : res.data.results[0].description}</p>
                        </section>
                    </div>
                    `;
                    document.querySelector(".Characters-instance").innerHTML += htmlContent;
                }

                this.setState({
                    requested: true
                })
            });
    }

    render() {
        return (
            <div className='CharacterInstance-main'>
                <section className='Characters-instance'>
                </section>
                <SmallSection targetPage='CharacterInstancePage' target='characters' apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default CharacterInstance;