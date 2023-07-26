import React from 'react';
import '../styles/Global.scss';
import '../styles/SmallSection.scss';

class SmallSection extends React.Component {
    constructor(props) {
        super(props);
        this.ElementColapse = this.ElementColapse.bind(this);
    }

    async componentDidMount() {
        let limit = '&limit=' + this.props.limit;
        let localData;
        let url =
            'https://gateway.marvel.com/v1/public/' +
            this.props.target + // characters | comics | creators | events | series | stories
            '?ts=2023' +
            limit +'&apikey=' + this.props.apiKey +
            '&hash=' + this.props.hash;

        if (JSON.parse(localStorage.getItem(this.props.storeId)) == null) {
            localStorage.removeItem(this.props.storeId);
            
            let req = new Request(url);
            await fetch(req)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    localStorage.setItem(this.props.storeId, JSON.stringify(res));
                })

            console.log("Requested")
        } else if (JSON.parse(localStorage.getItem(this.props.storeId)).code != 200) {
            localStorage.removeItem(this.props.storeId);
            
            let req = new Request(url);
            await fetch(req)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    localStorage.setItem(this.props.storeId, JSON.stringify(res));
                })

            console.log("Requested")
        } else if (JSON.parse(localStorage.getItem(this.props.storeId)).data.limit != this.props.limit) {
            localStorage.removeItem(this.props.storeId);
            
            let req = new Request(url);
            await fetch(req)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    localStorage.setItem(this.props.storeId, JSON.stringify(res));
                })

            console.log("Requested")
        }
        
        localData = JSON.parse(localStorage.getItem(this.props.storeId));
        document.querySelector(".Slide-row").innerHTML = '';
        let smallElementsId = 1;
        for (let i = 0; i < localData.data.count; i++) {
            if (i % 10 == 0 && i != 0) {
                smallElementsId++;
                document.querySelector(`.Slide-row`).innerHTML += `<button value="+" class="btn" id="${smallElementsId}">+</button>`;
            }
            
            let imageURL = localData.data.results[i].thumbnail.path.replace("http", "https") + '/portrait_uncanny.' + localData.data.results[i].thumbnail.extension;
            let htmlContent =
                `
            <a href="/${this.props.targetPage}/${localData.data.results[i].id}" id="${smallElementsId}">
                <div id="${i}">
                <img src="${imageURL}" alt="Comic" />
                </div>
            </a>
            `;
            document.querySelector(".Slide-row").innerHTML += htmlContent;
        }

        let smallElements = document.querySelectorAll(`.Slide-row a, .Slide-row button`);
        
        let firstBtn = true;
        for (let i = 0; i < smallElements.length; i++) {
            if (smallElements[i].nodeName == 'BUTTON') {
                if (firstBtn == true) {
                    for (let j = i+1; j < i + 11; j++) {
                        smallElements[j].style.display = 'none';
                    }

                    firstBtn = false;
                } else {
                    for (let j = i; j < i + 11; j++) {
                        smallElements[j].style.display = 'none';
                    }
                }
            }
        }
        
        document.querySelector(`.Slide-row`).addEventListener('click', this.ElementColapse);
    }

    ElementColapse(event) {
        let elements = document.querySelectorAll(`.Slide-row a, .Slide-row button`);
        let buttons = document.querySelectorAll(`.Slide-row button`);
        
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
            <div className='Slide-main'>
                <section className='Slide-instances-container-slide'>
                    <div className="Slide-row"></div>
                </section>
            </div>
        )
    }
}
export default SmallSection;