import React from 'react';
import '../styles/Global.scss';
import '../styles/DetailInstancePage.scss';
import { useNavigate } from 'react-router-dom'

// Props: target, apiKey, targetPage

const GoBackButton = () => {
    const navigate = useNavigate();
    return (
        <>
            <button className='btn Go-back-button' onClick={() => navigate(-1)}>Back</button>
        </>
    )
}

class DetailSection extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let id = window.location.pathname.split('/').slice(-1);
        let url =
            'https://gateway.marvel.com/v1/public/' +
            this.props.target + '/' + // characters | comics | creators | events | series | stories
            id +
            '?ts=2023&apikey=' + this.props.apiKey +
            '&hash=' + this.props.hash;
        let req = new Request(url);
        await fetch(req)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log('Requested');
                let yearList, year, series, artists, creators, items;

                if (this.props.target == 'comics') {
                    yearList = res.data.results[0].title.match(/\d+/);
                    year = 'N/A';
                    if (yearList != null) {
                        for (let i = 0; i < yearList.length; i++) {
                            if (yearList[i].length >= 4) {
                                year = yearList[i];
                            }
                        }
                    }
                }

                if (this.props.target == 'comics' || this.props.target == 'events' || this.props.target == 'series') {
                    creators = '';
                    artists = '';

                    
                    items = res.data.results[0].creators.items;
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].role == 'writer') {
                            creators += `
                            ${` <a href='/CreatorInstancePage/${items[i].resourceURI.split('/').slice(-1)}'>${items[i].name}</a>`}
                            `
                        } else {
                            artists += `
                            ${` <a href='/CreatorInstancePage/${items[i].resourceURI.split('/').slice(-1)}'>${items[i].name}</a>`}
                            `
                        }
                    }

                    if (creators == '') {
                        creators = 'N/A';
                    }
                    if (artists == '') {
                        artists = 'N/A';
                    }
                }

                let imageURL = res.data.results[0].thumbnail.path + '/portrait_uncanny.' + res.data.results[0].thumbnail.extension;
                let htmlContent =
                    `
                <div id="${id}">
                    <img src="${imageURL}" alt="Comic" />
                    <section>
                        <h1>${this.props.target == 'characters' ? res.data.results[0].name : this.props.target == 'creators' ? res.data.results[0].fullName : res.data.results[0].title}</h1>
                        ${this.props.target == 'creators' ? `
                            <div>
                                <button value="Series" class="btn">+ Series</button>
                                <p><span style="font-weight: bold">Series</span>: ${res.data.results[0].series.available == 0 ? 'N/A' : res.data.results[0].series.items.map(i => ` <a href='/SeriesInstancePage/${i.resourceURI.split('/').slice(-1)}'>${i.name}</a>`)}</p>
                            </div>`
                        : this.props.target == 'comics' ? `
                            <p><span style="font-weight: bold">Published At</span>: ${year}</p>
                            <p><span style="font-weight: bold">Writer(s)</span>: ${creators}</p>
                            <p><span style="font-weight: bold">Artists(s)</span>: ${artists}</p>
                            <div>
                                <button value="Series" class="btn">+ Series</button>
                                <p><span style="font-weight: bold">Series</span>: ${` <a href='/SeriesInstancePage/${res.data.results[0].series.resourceURI.split('/').slice(-1)}'>${res.data.results[0].series.name}</a>`}</p>
                            </div>
                            <div>
                                <button value="Characters" class="btn">+ Characters</button>
                                <p><span style="font-weight: bold">Characters</span>: ${res.data.results[0].characters.available == 0 ? 'N/A' : res.data.results[0].characters.items.map(i => ` <a href='/CharacterInstancePage/${i.resourceURI.split('/').slice(-1)}'>${i.name}</a>`)}</p>
                            </div>
                            <div>
                                <button value="Description" class="btn">+ Description</button>
                                <p><span style="font-weight: bold">Description</span>: ${res.data.results[0].description == '' || res.data.results[0].description == null ? 'N/A' : res.data.results[0].description}</p>
                            </div>`
                            : this.props.target == 'events' ? `
                            <p><span style="font-weight: bold">Writer(s)</span>: ${creators}</p>
                            <p><span style="font-weight: bold">Artists(s)</span>: ${artists}</p>
                            <div>
                                <button value="Series" class="btn">+ Series</button>
                                <p><span style="font-weight: bold">Series</span>: ${res.data.results[0].series.available == 0 ? 'N/A' : res.data.results[0].series.items.map(i => ` <a href='/SeriesInstancePage/${i.resourceURI.split('/').slice(-1)}'>${i.name}</a>`)}</p>
                            </div>
                            <div>
                                <button value="Description" class="btn">+ Description</button>
                                <p><span style="font-weight: bold">Description</span>: ${res.data.results[0].description == '' || res.data.results[0].description == null ? 'N/A' : res.data.results[0].description}</p>
                            </div>`
                            : this.props.target == 'series' ? `
                            <p><span style="font-weight: bold">Writer(s)</span>: ${creators}</p>
                            <p><span style="font-weight: bold">Artists(s)</span>: ${artists}</p>
                            <div>
                                <button value="Description" class="btn">+ Description</button>
                                <p><span style="font-weight: bold">Description</span>: ${res.data.results[0].description == '' || res.data.results[0].description == null ? 'N/A' : res.data.results[0].description}</p>
                            </div>`
                            : this.props.target == 'characters' ? `
                            <div>
                                <button value="Series" class="btn">+ Series</button>
                                <p><span style="font-weight: bold">Series</span>: ${res.data.results[0].series.available == 0 ? 'N/A' : res.data.results[0].series.items.map(i => ` <a href='/SeriesInstancePage/${i.resourceURI.split('/').slice(-1)}'>${i.name}</a>`)}</p>
                            </div>
                            <div>
                                <button value="Description" class="btn">+ Description</button>
                                <p><span style="font-weight: bold">Description</span>: ${res.data.results[0].description == '' || res.data.results[0].description == null ? 'N/A' : res.data.results[0].description}</p>
                            </div>`
                            : `<span style="display: none" />`
                    }
                    </section>
                </div>
                `;
                document.querySelector(".Detail-instance").innerHTML = htmlContent;
            });
        
        document.querySelector(".Detail-instance > div > section").addEventListener('click', this.ElementColapse);
    }

    ElementColapse(event) {
        let clickedTag = event.target.value;
        let pTag = event.target.parentNode.children[1];
        let buttonTag = event.target;
        
        if (clickedTag == 'Characters' || clickedTag == 'Description' || clickedTag == 'Series' || clickedTag == 'Writers' || clickedTag == 'Artists') {
            if (pTag.style.display == 'none') {
                pTag.style.display = 'block';
                buttonTag.innerText = '- ' + buttonTag.value;
            } else if (pTag.style.display == 'block') {
                pTag.style.display = 'none';
                buttonTag.innerText = '+ ' + buttonTag.value;
            } else {
                pTag.style.display = 'block';
                buttonTag.innerText = '- ' + buttonTag.value;
            };
        }
    }

    render() {
        return (
            <div className='Instance-main'>
                <div class="Go-back-button-div">
                    <GoBackButton />
                </div>
                <section className='Detail-instance'>
                </section>
            </div>
        )
    }
}
export default DetailSection;