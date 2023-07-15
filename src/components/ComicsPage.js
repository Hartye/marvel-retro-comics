import React from 'react';
import '../styles/Global.scss';
import '../styles/ComicsPage.scss';
import ComicsSamllSection from './ComicsSmallSection'

class Comics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requested: false
        }
    }

    async componentDidMount() {
        let url =
            'http://gateway.marvel.com/v1/public/' +
            'comics' + // characters | comics | creators | events | series | stories
            '?apikey=' + this.props.apiKey;
        let req = new Request(url);
        await fetch(req)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (this.state.requested == false) {
                    for (let i = 0; i < 8; i++) {
                        let imageURL = res.data.results[i].thumbnail.path + '/portrait_uncanny.' + res.data.results[i].thumbnail.extension;
                        let htmlContent =
                            `
                      <a href="/ComicInstancePage/${res.data.results[i].id}">
                          <div className="Comic-instance" id="${i}">
                            <img className="Comic-instance-image" src="${imageURL}" alt="Comic" />
                            <p>${res.data.results[i].title}</p>
                          </div>
                      </a>
                      `;
                        console.log(imageURL);
                        document.querySelector(".Comics-instances-container").innerHTML += htmlContent;
                    }

                    this.setState({
                        requested: true
                    })
                }
            })
    }

    render() {
        return (
            <div className='Comics-main'>
                <section className='Comics-instances-container'></section>
                <ComicsSamllSection apiKey={this.props.apiKey}/>
            </div>
        )
    }
}
export default Comics;