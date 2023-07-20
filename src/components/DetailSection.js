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
        let id = window.location.pathname.split('/');
        id = id[id.length - 1];
        let url =
            'http://gateway.marvel.com/v1/public/' +
            this.props.target + '/' + // characters | comics | creators | events | series | stories
            id +
            '?apikey=' + this.props.apiKey;
        let req = new Request(url);
        await fetch(req)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(url)
                console.log(res);
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

                    // Comic Series
                    series = res.data.results[0].series.name;
                    if (series == '') {
                        series = 'N/A'
                    }
                }

                if (this.props.target == 'events' || this.props.target == 'comics' || this.props.target == 'series') {
                    // Comic Creators and Artirts
                    creators = '';
                    artists = '';
                    items = res.data.results[0].creators.items;
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].role == 'writer') {
                            creators += items[i].name + '. '
                        } else if (items[i].role == 'penciller' || items[i].role == 'colorist' || items[i].role == 'inker') {
                            artists += items[i].name + '. '
                        }
                    }

                    if (creators == '') {
                        creators = 'N/A'
                    } if (artists == '') {
                        artists = 'N/A'
                    }
                }

                if (this.props.target == 'creators') {
                    series = '';

                    for (let i = 0; i < res.data.results[0].series.items.length; i++) {
                        series += res.data.results[0].series.items[i].name + '. ';
                    }
                }

                let imageURL = res.data.results[0].thumbnail.path + '/portrait_uncanny.' + res.data.results[0].thumbnail.extension;
                let htmlContent =
                    `
                <div id="${id}">
                    <img src="${imageURL}" alt="Comic" />
                    <section>
                        <h1>${this.props.target == 'characters' ? res.data.results[0].name : this.props.target == 'creators' ? res.data.results[0].fullName : res.data.results[0].title}</h1>
                        ${
                            this.props.target == 'creators' ? `
                            <p><span style="font-weight: bold">Series</span>: ${series}</p>`
                            : this.props.target == 'comics' ? `
                            <p><span style="font-weight: bold">Published At</span>: ${year}</p>
                            <p><span style="font-weight: bold">Writer(s)</span>: ${creators}</p>
                            <p><span style="font-weight: bold">Artists(s)</span>: ${artists}</p>
                            <p><span style="font-weight: bold">Series</span>: ${series}</p>
                            <p><span style="font-weight: bold">Description</span>: ${res.data.results[0].description == '' || res.data.results[0].description == null ? 'N/A' : res.data.results[0].description}</p>`
                            : this.props.target == 'events' ? `
                            <p><span style="font-weight: bold">Writer(s)</span>: ${creators}</p>
                            <p><span style="font-weight: bold">Artists(s)</span>: ${artists}</p>
                            <p><span style="font-weight: bold">Description</span>: ${res.data.results[0].description == '' || res.data.results[0].description == null ? 'N/A' : res.data.results[0].description}</p>`
                            : this.props.target == 'series' ? `
                            <p><span style="font-weight: bold">Writer(s)</span>: ${creators}</p>
                            <p><span style="font-weight: bold">Artists(s)</span>: ${artists}</p>
                            <p><span style="font-weight: bold">Description</span>: ${res.data.results[0].description == '' || res.data.results[0].description == null ? 'N/A' : res.data.results[0].description}</p>`
                            : this.props.target == 'characters' ? `
                            <p><span style="font-weight: bold">Description</span>: ${res.data.results[0].description == '' || res.data.results[0].description == null ? 'N/A' : res.data.results[0].description}</p>`
                            : `<span style="display: none" />`
                        }
                    </section>
                </div>
                `;
                document.querySelector(".Detail-instance").innerHTML += htmlContent;
            });
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