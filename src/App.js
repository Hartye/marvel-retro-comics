import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import ComicsPage from './components/ComicsPage'
import ComicInstancePage from './components/ComicInstancePage'
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import './styles/Global.scss';

// Public API key = 86cb2be8aecbf307ae51cbfb3804be73
// Private API key = cc14c3d6270f17d6060b94a355accd3988e23ae8

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagePath: '',
      footerCopy: '',
      apiKey: '86cb2be8aecbf307ae51cbfb3804be73'
    }
  }

  async componentDidMount() {
    let url =
      'http://gateway.marvel.com/v1/public/' +
      'comics' + // characters | comics | creators | events | series | stories
      '?apikey=' + this.state.apiKey;
    let req = new Request(url);
    await fetch(req)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          footerCopy: res.attributionText
        })
      });
  }

  render() {
    return (
      <div className='App-main'>
        <Header />
        <div className="App-content">
          <Routes>
            <Route path="ComicsPage" element={<ComicsPage apiKey={this.state.apiKey}/>} />
            <Route path="ComicInstancePage/*" element={<ComicInstancePage apiKey={this.state.apiKey}/>} />
          </Routes>
        </div>
        <Footer copy={this.state.footerCopy}/>
      </div>
    );
  }
}

export default App;
