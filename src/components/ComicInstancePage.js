import React from 'react';
import '../styles/Global.scss';
import '../styles/ComicsPage.scss';
import '../styles/ComicInstancePage.scss';
import ComicsSamllSection from './ComicsSmallSection'

class ComicsInstance extends React.Component {
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
            'comics/' + // characters | comics | creators | events | series | stories
            id +
            '?apikey=' + this.props.apiKey;
        let req = new Request(url);
        await fetch(req)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res)
                let year = res.data.results[0].title.match(/\d+/);
                if (year != null) {
                    for (let i = 0; i < year.length; i++) {
                        if (year[i] > 1800) {
                            year = year[i];
                        }
                    }
                } else {
                    year = 'N/A';
                }

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

                if (this.state.requested == false) {
                    let counter = 0;
                    counter++;
                    let imageURL = res.data.results[0].thumbnail.path + '/portrait_uncanny.' + res.data.results[0].thumbnail.extension;
                    let htmlContent =
                        `
                    <div id="${id}">
                        <img className="Comic-instance-image" src="${imageURL}" alt="Comic" />
                        <section>
                            <h1>${res.data.results[0].title}</h1>
                            <p><span style="font-weight: bold">Published At</span>: ${year}</p>
                            <p><span style="font-weight: bold">Writer(s)</span>: ${creators}</p>
                            <p><span style="font-weight: bold">Artists(s)</span>: ${artists}</p>
                            <p>${res.data.results[0].description == '' ? 'N/A' : res.data.results[0].description}</p>
                        </section>
                    </div>
                    `;
                    document.querySelector(".Comic-instance").innerHTML += htmlContent;
                }

                this.setState({
                    requested: true
                })
                
            });
    }

    render() {
        return (
            <div className='ComicsInstance-main'>
                <section className='Comic-instance'>
                </section>
                <ComicsSamllSection apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default ComicsInstance;