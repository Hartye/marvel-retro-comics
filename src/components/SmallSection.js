import React from 'react';
import '../styles/Global.scss';
import '../styles/SmallSection.scss';

class SmallSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requested: false
        }
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
                if (this.state.requested == false) {
                    let counter = 0;
                    for (let i = 8; i < res.data.count; i++) {
                        counter++;
                        let imageURL = res.data.results[i].thumbnail.path + '/portrait_uncanny.' + res.data.results[i].thumbnail.extension;
                        let htmlContent =
                            `
                      <a href="/${this.props.targetPage}/${res.data.results[i].id}">
                          <div id="${i}">
                            <img src="${imageURL}" alt="Comic" />
                          </div>
                      </a>
                      `;
                        if (counter > 6) {
                            document.querySelector(".Slide-row-two").innerHTML += htmlContent;
                        } else {
                            document.querySelector(".Slide-row-one").innerHTML += htmlContent;
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
            <div className='Slide-main'>
                <section className='Slide-instances-container-slide'>
                    <div className="Slide-row-one"></div>
                    <div className="Slide-row-two"></div>
                </section>
            </div>
        )
    }
}
export default SmallSection;