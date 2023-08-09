import React from 'react';
import '../styles/Global.scss';
import '../styles/DetailInstancePage.scss';
import { useNavigate } from 'react-router-dom';
import ImgNotFound from '../images/image_not_found.jpg';

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
        this.makeRequest = this.makeRequest.bind(this);
        this.ElementColapse = this.ElementColapse.bind(this);
        this.state = {
            title: '',
            id: 0,
            category: ''
        }
    }

    componentDidMount() {
        this.makeRequest();
    }

    async makeRequest() {
        let id = window.location.pathname.split('/').slice(-1);
        let localData;
        let url = this.props.target != 'profile' ? 
        'https://gateway.marvel.com/v1/public/' +
        this.props.target + '/' + // characters | comics | creators | events | series | stories
        id +
        '?ts=2023&apikey=' + this.props.apiKey +
        '&hash=' + this.props.hash : 'https://marvel-retro-comics-back-end.vercel.app/api/';

        this.setState({
            id: id,
            category: this.props.target
        })

        if (this.props.target == 'profile') {
            localData = JSON.parse(localStorage.getItem('profile'));
        }
        let req = new Request(url);
        let params = this.props.target == 'profile' ? {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: '{ "name": "' + localData.name + '", "pass": "' + localData.pass + '" }',
        } : { method: 'GET'};
        
        await fetch(req, params)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res)
                console.log('Requested');
                let yearList, year, artists, creators, items, nameP, ageP, variants = 'N/A';

                if (this.props.target == 'profile') {
                    nameP = res.name;
                    ageP = res.age;
                }

                if (this.props.target == 'comics') {
                    if (res.data.results[0].variants.length != 0) {
                        variants = '';
                        for (let i = 0; i < res.data.results[0].variants.length; i++) {
                            variants += `
                            ${` <a href='/ComicInstancePage/${res.data.results[0].variants[i].resourceURI.split('/').slice(-1)}'>${res.data.results[0].variants[i].name + ' #' + i}</a>`}
                            `
                        }
                    }

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

                let instanceTitle = this.props.target == 'characters' ? res.data.results[0].name : this.props.target == 'creators' ? res.data.results[0].fullName : this.props.target == 'profile' ? nameP + ' - ' + ageP : res.data.results[0].title;
                this.setState({
                    title: instanceTitle
                });
                let imageURL = this.props.target != 'profile' ? 
                res.data.results[0].thumbnail.path.replace("http", "https") + '/portrait_uncanny.' + res.data.results[0].thumbnail.extension 
                : ImgNotFound;
                let htmlContent =
                    `
                <div id="${id}">
                    <img src="${imageURL}" alt="Comic" />
                    <section>
                        <h1>${instanceTitle}</h1>
                        ${this.props.target == 'creators' ? `
                            <div>
                                <button value="Series" class="btn">+ Series</button>
                                <p><span style="font-weight: bold">Series</span>: ${res.data.results[0].series.available == 0 ? 'N/A' : res.data.results[0].series.items.map(i => ` <a href='/SeriesInstancePage/${i.resourceURI.split('/').slice(-1)}'>${i.name}</a>`)}</p>
                            </div>`
                        : this.props.target == 'profile' ? `
                            <div>
                                <button value="Favourites" class="btn">+ Favourites</button>
                                <p><span style="font-weight: bold">Favourites</span>: ${res.favourites == undefined ? 'N/A - you can set any comics as favourites!' : res.favourites.length == 0 ? 'N/A - you can set any comics as favourites!' : res.favourites.map(i => ` <a href='/${i.category == 'series' ? 'Series' : i.category == 'comics' ? 'Comic' : i.category == 'events' ? 'Event': 'Character' }InstancePage/${i.id}'>${i.title}</a>`)}</p>
                                <button value="Delete" class="btn" >Delete account</button>
                            </div>`
                        : this.props.target == 'comics' ? `
                            <p><span style="font-weight: bold">Published At</span>: ${year}</p>
                            <p><span style="font-weight: bold">Writer(s)</span>: ${creators}</p>
                            <p><span style="font-weight: bold">Artists(s)</span>: ${artists}</p>
                            <p><span style="font-weight: bold">Variants(s)</span>: ${variants}</p>
                            <button value="FavAdd" class="btn" >Add to Favourites</button>
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
                            <button value="FavAdd" class="btn" >Add to Favourites</button>
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
                            <button value="FavAdd" class="btn" >Add to Favourites</button>
                            <div>
                                <button value="Description" class="btn">+ Description</button>
                                <p><span style="font-weight: bold">Description</span>: ${res.data.results[0].description == '' || res.data.results[0].description == null ? 'N/A' : res.data.results[0].description}</p>
                            </div>`
                            : this.props.target == 'characters' ? `
                            <button value="FavAdd" class="btn" >Add to Favourites</button>
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

                if (this.props.target == 'profile') {
                    if (res.name == undefined) {
                        localStorage.removeItem("profile");
                        window.location.reload(false);
                    }
                }
            });
        
        document.querySelector(".Detail-instance > div > section").addEventListener('click', this.ElementColapse);
    }

    async ElementColapse(event) {
        let clickedTag = event.target.value;
        let pTag = event.target.parentNode.children[1];
        let buttonTag = event.target;
        
        if (clickedTag == 'Characters' || clickedTag == 'Description' || clickedTag == 'Series' || clickedTag == 'Writers' || clickedTag == 'Artists' || clickedTag == 'Favourites') {
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
        } else if (clickedTag == 'Delete') {
            let url = 'https://marvel-retro-comics-back-end.vercel.app/api/remove/';

            let req = new Request(url);
            let params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{ "name": "'+this.props.name+'", "pass": "'+this.props.pass+'" }'
            };
            await fetch(req, params);
            localStorage.removeItem("profile");
            window.location.reload(false);
        } else if (clickedTag == "FavAdd") {
            let localData = JSON.parse(localStorage.getItem('profile'));
            let url = 'https://marvel-retro-comics-back-end.vercel.app/api/fav/add';

            let req = new Request(url);
            let params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{ "name": "'+localData.name+'", "pass": "'+localData.pass+'", "category": "' + this.state.category + '", "id": ' + this.state.id + ', "title": "' + this.state.title + '" }'
            };
            await fetch(req, params);
            console.log('{ "name": "'+localData.name+'", "pass": "'+localData.pass+'", "category": "' + this.state.category + '", "id": ' + this.state.id + ', "title": "' + this.state.title + '" }')
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