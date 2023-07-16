import React from 'react';
import '../styles/Global.scss';
import '../styles/EventInstancePage.scss';
import SmallSection from '../components/SmallSection'

class EventInstance extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let id = window.location.pathname.split('/');
        id = id[id.length-1];
        let url =
            'http://gateway.marvel.com/v1/public/' +
            'events/' + // characters | comics | creators | events | series | stories
            id +
            '?apikey=' + this.props.apiKey;
        let req = new Request(url);
        await fetch(req)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                // Comic Creators and Artirts
                let creators = '';
                let artists = '';
                let items = res.data.results[0].creators.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].role == 'writer') {
                        creators += items[i].name + '. '
                    } else if (items[i].role == 'penciller' || items[i].role == 'colorist' || items[i].role == 'inker') {
                        artists += items[i].name + '. '
                    }
                }

                if (creators == '') {
                    creators = 'N/A'
                } if (artists == '') {
                    artists = 'N/A'
                }

                let imageURL = res.data.results[0].thumbnail.path + '/portrait_uncanny.' + res.data.results[0].thumbnail.extension;
                let htmlContent =
                    `
                <div id="${id}">
                    <img src="${imageURL}" alt="Comic" />
                    <section>
                        <h1>${res.data.results[0].title}</h1>
                        <p><span style="font-weight: bold">Description</span>: ${res.data.results[0].description}</p>
                        <p><span style="font-weight: bold">Writer(s)</span>: ${creators}</p>
                        <p><span style="font-weight: bold">Artists(s)</span>: ${artists}</p>
                    </section>
                </div>
                `;
                document.querySelector(".Event-instance").innerHTML += htmlContent;
            });
    }

    render() {
        return (
            <div className='EventInstance-main'>
                <section className='Event-instance'>
                </section>
                <SmallSection targetPage='EventInstancePage' target='events' apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default EventInstance;