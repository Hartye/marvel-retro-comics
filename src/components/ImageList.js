import React from 'react';
import '../styles/Global.scss';
import '../styles/ImageList.scss';

class Instances extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let url =
            'http://gateway.marvel.com/v1/public/' +
            this.props.target + // characters | comics | creators | events | series | stories
            '?apikey=' + this.props.apiKey;
        let req = new Request(url);
        await fetch(req)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res);
                document.querySelector(".Instances-container").innerHTML = '';
                for (let i = 0; i < 8; i++) {
                    let imageURL = res.data.results[i].thumbnail.path + '/portrait_uncanny.' + res.data.results[i].thumbnail.extension;
                    let htmlContent =
                        `
                    <a href="/${this.props.targetPage}/${res.data.results[i].id}">
                        <div id="${i}">
                        <img src="${imageURL}" alt="Characters" />
                        <p>${this.props.target == 'comics' || this.props.target == 'events' || this.props.target == 'series' ? res.data.results[i].title : res.data.results[i].name}</p>
                        </div>
                    </a>
                    `;
                    console.log(imageURL);
                    document.querySelector(".Instances-container").innerHTML += htmlContent;
                }
            })
    }

    render() {
        return (
            <div className='Instances-main'>
                <section className='Instances-container'></section>
            </div>
        )
    }
}
export default Instances;