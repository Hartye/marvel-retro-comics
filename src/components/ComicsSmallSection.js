import React from 'react';
import '../styles/Global.scss';
import '../styles/ComicsSmallSection.scss';

class ComicsSmallSection extends React.Component {
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
                    let counter = 0;
                    for (let i = 8; i < res.data.count; i++) {
                        counter++;
                        let imageURL = res.data.results[i].thumbnail.path + '/portrait_uncanny.' + res.data.results[i].thumbnail.extension;
                        let htmlContent =
                            `
                      <a href="/ComicInstancePage/${res.data.results[i].id}">
                          <div className="Comic-instance" id="${i}">
                            <img className="Comic-instance-image" src="${imageURL}" alt="Comic" />
                          </div>
                      </a>
                      `;
                        if (counter > 6) {
                            document.querySelector(".Comics-slide-row-two").innerHTML += htmlContent;
                        } else {
                            document.querySelector(".Comics-slide-row-one").innerHTML += htmlContent;
                        }
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
                <section className='Comics-instances-container-slide'>
                    <div className="Comics-slide-row-one"></div>
                    <div className="Comics-slide-row-two"></div>
                </section>
            </div>
        )
    }
}
export default ComicsSmallSection;