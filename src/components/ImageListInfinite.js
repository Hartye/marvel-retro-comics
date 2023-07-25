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

        // protótipos api
        let format = '';
        if (this.props.format != "false") {
            format = '?format='+this.props.format.replace(" ", "%20");
        }
        let limit = '';
        if (this.props.limit != "false") {
            if (format != '') {
                limit = '&limit='+this.props.limit;
            } else {
                limit = '?limit='+this.props.limit;
            }
        }

        if (window.innerWidth <= 450) {
            portraitType = 'landscape_amazing';
        } else {
            portraitType = 'portrait_uncanny';
        }

        let localData;
        let url =
            'https://gateway.marvel.com/v1/public/' +
            this.props.target + // characters | comics | creators | events | series | stories
            format +
            limit +
            '&ts=2023&apikey=' + this.props.apiKey +
            '&hash=' + this.props.hash;
        if (localStorage.getItem(this.props.storeId) == null) {
            let req = new Request(url);
            await fetch(req)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    localStorage.setItem(this.props.storeId, JSON.stringify(res));
                })
            
            console.log("Requested");
        }

        document.querySelector(`#${this.props.format.replace(" ", "")}`).innerHTML = '';
        localData = JSON.parse(localStorage.getItem(this.props.storeId));

        let elementsId = 1;
        for (let i = 0; i < this.props.limit; i++) {
            if (i % 10 == 0 && i != 0) {
                elementsId++;
                document.querySelector(`#${this.props.format.replace(" ", "")}`).innerHTML += `<button value="+" class="btn ${this.props.format.replace(" ", "")}" id="${elementsId}">+</button>`;
            }

            let imageURL = localData.data.results[i].thumbnail.path + '/' + portraitType +'.' + localData.data.results[i].thumbnail.extension;
            let htmlContent =
                `
            <a href="/${this.props.targetPage}/${localData.data.results[i].id}" id="${elementsId}">
                <div>
                <img src="${imageURL}" alt="Characters" />
                <p>${this.props.target == 'comics' || this.props.target == 'events' || this.props.target == 'series' ? localData.data.results[i].title : localData.data.results[i].name}</p>
                </div>
            </a>
            `;
            
            document.querySelector(`#${this.props.format.replace(" ", "")}`).innerHTML += htmlContent;
        }

        let elements = document.querySelectorAll(`#${this.props.format.replace(" ", "")} a, #${this.props.format.replace(" ", "")} button`);
        
        let firstBtn = true;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].nodeName == 'BUTTON') {
                if (firstBtn == true) {
                    for (let j = i+1; j < i + 11; j++) {
                        elements[j].style.display = 'none';
                    }

                    firstBtn = false;
                } else {
                    for (let j = i; j < i + 11; j++) {
                        elements[j].style.display = 'none';
                    }
                }
            }
        }
        
        document.querySelector(`#${this.props.format.replace(" ", "")}`).addEventListener('click', this.ElementColapse);
    }

    ElementColapse(event) {
        let elements = document.querySelectorAll(`#${this.props.format.replace(" ", "")} a, #${this.props.format.replace(" ", "")} button`);
        let buttons = document.querySelectorAll(`#${this.props.format.replace(" ", "")} button`);
        
        if (event.target.nodeName == 'BUTTON') {
            if (event.target.value == '+') {
                event.target.value = '-';
                event.target.innerText = '-';

                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].id == event.target.id) {
                        elements[i].style.display = 'block';
                    }
                }

                for (let i = 0; i < buttons.length; i++) {
                    if (buttons[i].id == parseInt(event.target.id)+1) {
                        buttons[i].style.display = 'block';
                    }
                }

            } else {
                event.target.value = '+';
                event.target.innerText = '+';

                for (let i = 0; i < buttons.length; i++) {
                    if (parseInt(buttons[i].id) > parseInt(event.target.id)) {
                        buttons[i].style.display = 'none';
                        buttons[i].value = '+';
                        buttons[i].innerText = '+';
                    }
                }

                for (let i = 0; i < elements.length; i++) {
                    if (parseInt(elements[i].id) >= parseInt(event.target.id)) {
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