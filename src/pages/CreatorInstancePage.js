import React from 'react';
import '../styles/Global.scss';
import '../styles/CreatorInstancePage.scss';
import SmallSection from '../components/SmallSection'

class CreatorInstance extends React.Component {
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
            'creators/' + // characters | comics | creators | events | series | stories
            id +
            '?apikey=' + this.props.apiKey;
        let req = new Request(url);
        await fetch(req)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res)

                let series = '';

                for (let i = 0; i < res.data.results[0].series.items.length; i++) {
                    series += res.data.results[0].series.items[i].name + '. ';
                }

                let imageURL = res.data.results[0].thumbnail.path + '/portrait_uncanny.' + res.data.results[0].thumbnail.extension;
                let htmlContent =
                    `
                <div id="${id}">
                    <img src="${imageURL}" alt="Comic" />
                    <section>
                        <h1>${res.data.results[0].fullName}</h1>
                        <p><span style="font-weight: bold">Series</span>: ${series}</p>
                    </section>
                </div>
                `;
                document.querySelector(".Creator-instance").innerHTML += htmlContent;

                this.setState({
                    requested: true
                })
            });
    }

    render() {
        return (
            <div className='CreatorInstance-main'>
                <section className='Creator-instance'>
                </section>
                <SmallSection targetPage='ComicInstancePage' target='comics' apiKey={this.props.apiKey} />
            </div>
        )
    }
}
export default CreatorInstance;