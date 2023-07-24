import React from 'react';
import '../styles/Global.scss';
import '../styles/ImageListInfinite.scss';

// props: title / format / limit / apiKey / target / targetPage

class InstancesInfinite extends React.Component {
    constructor(props) {
        super(props);
        this.ElementColapse = this.ElementColapse.bind(this);
        this.makeRequest = this.makeRequest.bind(this);
    }

    componentDidMount() {
        this.makeRequest();

        window.addEventListener('resize', this.makeRequest);
    }

    async makeRequest() {
        let portraitType = '';
        let format = this.props.format.replace(" ", "%20") || 'comic';
        let limit = this.props.limit || '10';

        if (window.innerWidth <= 450) {
            portraitType = 'landscape_amazing';
        } else {
            portraitType = 'portrait_uncanny';
        }

        let url =
            'https://gateway.marvel.com/v1/public/' +
            this.props.target + // characters | comics | creators | events | series | stories
            '?format=' + format +
            '&limit=' + limit +
            '&ts=2023&apikey=' + this.props.apiKey +
            '&hash=bf642548afd4b9bff303766d11f7b155';
        let req = new Request(url);
        await fetch(req)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                document.querySelector(`#${this.props.format.replace(" ", "")}`).innerHTML = '';
                let elementsId = 1;
                for (let i = 0; i < this.props.limit; i++) {
                    if (i % 10 == 0 && i != 0) {
                        elementsId++;
                        document.querySelector(`#${this.props.format.replace(" ", "")}`).innerHTML += `<button value="+" class="btn ${this.props.format.replace(" ", "")}" id="${elementsId}">+</button>`;
                    }

                    let imageURL = res.data.results[i].thumbnail.path + '/' + portraitType +'.' + res.data.results[i].thumbnail.extension;
                    let htmlContent =
                        `
                    <a href="/${this.props.targetPage}/${res.data.results[i].id}" id="${elementsId}">
                        <div>
                        <img src="${imageURL}" alt="Characters" />
                        <p>${this.props.target == 'comics' || this.props.target == 'events' || this.props.target == 'series' ? res.data.results[i].title : res.data.results[i].name}</p>
                        </div>
                    </a>
                    `;
                    
                    document.querySelector(`#${this.props.format.replace(" ", "")}`).innerHTML += htmlContent;
                }

                let elements = document.querySelectorAll(`#${this.props.format.replace(" ", "")} a, #${this.props.format.replace(" ", "")} button`);
                
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].nodeName == 'BUTTON') {
                        for (let j = i+1; j < i + 11; j++) {
                            elements[j].style.display = 'none';
                        }
                    }
                }
            })
        
        document.querySelector(`#${this.props.format.replace(" ", "")}`).addEventListener('click', this.ElementColapse);
    }

    ElementColapse(event) {
        let elements = document.querySelectorAll(`#${this.props.format.replace(" ", "")} a, #${this.props.format.replace(" ", "")} button`);
        
        if (event.target.nodeName == 'BUTTON') {
            if (event.target.value == '+') {
                event.target.value = '-';
                event.target.innerText = '-';

                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].id == event.target.id) {
                        elements[i].style.display = 'block';
                    }
                }
            } else {
                event.target.value = '+';
                event.target.innerText = '+';

                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].id == event.target.id) {
                        if (elements[i].nodeName != 'BUTTON') {
                            elements[i].style.display = 'none';
                        }
                    }
                }
            }
        }
    }

    render() {
        return (
            <div className='InstancesInfinite-main'>
                <h1>{this.props.title}</h1>
                <section id={this.props.format.replace(" ", "")} className='InstancesInfinite-container'></section>
            </div>
        )
    }
}
export default InstancesInfinite;