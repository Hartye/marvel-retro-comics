import React from 'react';
import '../styles/Global.scss';
import '../styles/SearchSection.scss';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.searchChar = this.searchChar.bind(this);
    }

    async componentDidMount() {
        let url =
            'https://gateway.marvel.com/v1/public/' +
            this.props.search + // characters | comics | creators | events | series | stories
            '?ts=2023&limit=50&apikey=' + this.props.apiKey +
            '&hash=' + this.props.hash;
        let req = new Request(url);
        await fetch(req)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                document.querySelector(".Search-instance-row-two").innerHTML = '';
                document.querySelector(".Search-instance-row-one").innerHTML = '';
                for (let i = 0; i < res.data.results.length; i++) {
                    let htmlContent = 
                        `
                    <a href="/${this.props.targetPage}/${res.data.results[i].id}">
                        <div>
                            <p>${this.props.search == 'characters' ? res.data.results[i].name : this.props.search == 'creators' ? res.data.results[i].fullName : res.data.results[i].title}</p>
                        </div>
                    </a>
                    `;
                    if (i >= res.data.results.length / 2) {
                        document.querySelector(".Search-instance-row-two").innerHTML += htmlContent;
                    } else {
                        document.querySelector(".Search-instance-row-one").innerHTML += htmlContent;
                    }
                }
            });
    }

    async searchChar(event) {
        if (event.key == 'Enter' || event.target.value == 'search') {
            let searchValue = document.querySelector('.Search-bar input').value;
            let url =
                'https://gateway.marvel.com/v1/public/' +
                this.props.search + // characters | comics | creators | events | series | stories
                `?ts=2023&${this.props.search == 'comics' || this.props.search == 'series' ? 'title' : 'name'}StartsWith=` + searchValue +
                '&limit=50&apikey=' + this.props.apiKey +
                '&hash=' + this.props.hash;
            let req = new Request(url);
            await fetch(req)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    document.querySelector(".Search-instance-row-one").innerHTML = '';
                    document.querySelector(".Search-instance-row-two").innerHTML = '';
                    for (let i = 0; i < res.data.results.length; i++) {
                        let htmlContent =
                            `
                        <a href="/${this.props.targetPage}/${res.data.results[i].id}">
                            <div id="${res.data.results[i].id}">
                                <p>${this.props.search == 'creators' ? res.data.results[i].fullName : this.props.search == 'events' || this.props.search == 'series' ? res.data.results[i].title : res.data.results[i].name}</p>
                            </div>
                        </a>
                        `;
                        if (i >= res.data.results.length / 2) {
                            document.querySelector(".Search-instance-row-two").innerHTML += htmlContent;
                        } else {
                            document.querySelector(".Search-instance-row-one").innerHTML += htmlContent;
                        }
                    }
                })
        }
    }

    render() {
        return (
            <div className='Search-main'>
                <div className='Search-bar'>
                    <input type="text" onKeyUp={this.searchChar} placeholder='Search' />
                    <button value='search' className='btn' onClick={this.searchChar}>GO</button>
                </div>
                <section className='Search-instance'>
                    <div className='Search-instance-row-one' />
                    <div className='Search-instance-row-two' />
                </section>
            </div>
        )
    }
}
export default Search;