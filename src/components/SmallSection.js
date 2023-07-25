import React from 'react';
import '../styles/Global.scss';
import '../styles/SmallSection.scss';

class SmallSection extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let url =
            'https://gateway.marvel.com/v1/public/' +
            this.props.target + // characters | comics | creators | events | series | stories
            '?ts=2023&apikey=' + this.props.apiKey +
            '&hash=' + this.props.hash;
        let req = new Request(url);
        await fetch(req)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                document.querySelector(".Slide-row").innerHTML = '';
                for (let i = 8; i < res.data.count; i++) {
                    let imageURL = res.data.results[i].thumbnail.path + '/portrait_uncanny.' + res.data.results[i].thumbnail.extension;
                    let htmlContent =
                        `
                    <a href="/${this.props.targetPage}/${res.data.results[i].id}">
                        <div id="${i}">
                        <img src="${imageURL}" alt="Comic" />
                        </div>
                    </a>
                    `;
                    document.querySelector(".Slide-row").innerHTML += htmlContent;
                }
            })
    }

    render() {
        return (
            <div className='Slide-main'>
                <section className='Slide-instances-container-slide'>
                    <div className="Slide-row"></div>
                </section>
            </div>
        )
    }
}
export default SmallSection;