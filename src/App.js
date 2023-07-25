// React
import React from 'react';
// Components
import Header from './components/Header';
import Footer from './components/Footer';
// Pages
import ComicsPage from './pages/ComicsPage';
import ComicInstancePage from './pages/ComicInstancePage';
import CharactersPage from './pages/CharactersPage';
import CharacterInstancePage from './pages/CharacterInstance';
import CreatorsPage from './pages/CreatorsPage';
import CreatorInstancePage from './pages/CreatorInstancePage';
import EventsPage from './pages/EventsPage';
import EventInstancePage from './pages/EventInstancePage';
import SeriesPage from './pages/SeriesPage';
import SeriesInstancePage from './pages/SeriesInstancePage'
// Router
import { Routes, Route, Navigate } from 'react-router-dom';
// Styles
import './App.scss';
import './styles/Global.scss';

// Public API key = 86cb2be8aecbf307ae51cbfb3804be73

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagePath: '',
      footerCopy: '',
      apiKey: '3ba73c1775850bd66035aae90c2baa76', // 86cb2be8aecbf307ae51cbfb3804be73 - 3ba73c1775850bd66035aae90c2baa76
      hash: '6d8929bc52e7ecf2762f8d7b19c279cc' // bf642548afd4b9bff303766d11f7b155 - 6d8929bc52e7ecf2762f8d7b19c279cc
    }
  }

  async componentDidMount() {
    let url =
      'https://gateway.marvel.com/v1/public/' +
      'comics' + // characters | comics | creators | events | series | stories
      '?ts=2023&apikey=' + this.state.apiKey +
      '&hash=' + this.state.hash;
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
            <Route path="/" element={<Navigate to="ComicsPage" />} />
            <Route path="ComicsPage" element={<ComicsPage hash={this.state.hash} apiKey={this.state.apiKey}/>} />
            <Route path="ComicInstancePage/*" element={<ComicInstancePage hash={this.state.hash} apiKey={this.state.apiKey}/>} />
            <Route path="CharactersPage" element={<CharactersPage hash={this.state.hash} apiKey={this.state.apiKey}/>} />
            <Route path="CharacterInstancePage/*" element={<CharacterInstancePage hash={this.state.hash} apiKey={this.state.apiKey}/>} />
            <Route path="CreatorsPage" element={<CreatorsPage hash={this.state.hash} apiKey={this.state.apiKey} />} />
            <Route path="CreatorInstancePage/*" element={<CreatorInstancePage hash={this.state.hash} apiKey={this.state.apiKey} />} />
            <Route path="EventsPage" element={<EventsPage hash={this.state.hash} apiKey={this.state.apiKey} />} />
            <Route path="EventInstancePage/*" element={<EventInstancePage hash={this.state.hash} apiKey={this.state.apiKey} />} />
            <Route path="SeriesPage" element={<SeriesPage hash={this.state.hash} apiKey={this.state.apiKey} />} />
            <Route path="SeriesInstancePage/*" element={<SeriesInstancePage hash={this.state.hash} apiKey={this.state.apiKey} />} />
          </Routes>
        </div>
        <Footer copy={this.state.footerCopy}/>
      </div>
    );
  }
}

export default App;
