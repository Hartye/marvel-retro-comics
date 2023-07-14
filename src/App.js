import React from 'react';
import './App.scss';

// Public API key = 86cb2be8aecbf307ae51cbfb3804be73
// Private API key = cc14c3d6270f17d6060b94a355accd3988e23ae8

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footerCopy: '',
      apiKey: '86cb2be8aecbf307ae51cbfb3804be73'
    }
  }

  async componentDidMount() {
    let url =
      'http://gateway.marvel.com/v1/public/' +
      'comics' + // characters | comics | creators | events | series | stories
      '?apikey=86cb2be8aecbf307ae51cbfb3804be73';
    let req = new Request(url);
    await fetch(req)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          footerCopy: res.attributionText
        })

        for (let i = 0; i < res.data.count; i++) {
          let imageURL = res.data.results[i].thumbnail.path + '/portrait_medium.' + res.data.results[i].thumbnail.extension;
          let htmlContent =
            `
            <div className="App-comic-instance" id="${i}">
              <img className="App-instance-image" src="${imageURL}" alt="Comic" />
              <h1>${res.data.results[i].title}</h1>
            </div>
            `;
          console.log(imageURL);
          document.querySelector(".App-content-instances").innerHTML += htmlContent;
        }
      })
  }

  render() {
    return (
      <div className="App-content-instances">

      </div>
    );
  }
}

export default App;
