import React from 'react';
import '../styles/Global.scss';
import '../styles/SmallSection.scss';

class SlideSection extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
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
            document.querySelector(".Slide-instances-container").innerHTML += htmlContent;
        }
    }

    render() {
        return (
            <div className='Slide-main'>
                <section className='Slide-instances-container'>
                </section>
            </div>
        )
    }
}
export default SlideSection;