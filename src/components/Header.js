import React from 'react';
import Button from './Button'
import { Link } from 'react-router-dom';
import '../styles/Header.scss';
import '../styles/Global.scss';
import HeaderImage from '../images/ultimate-marvel_header-transparent.jpg';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Header-main'>
                <section className="Header-image-section">
                    <img className='Header-image' src={HeaderImage} alt="Marvel comics characters" />
                </section>
                <section className='Header-button-section'>
                    <Link to="/CharactersPage"><Button name='Characters' /></Link>
                    <Link to="/CreatorsPage"><Button name='Creators' /></Link>
                    <Link to="/ComicsPage"><Button name='Comics' /></Link>
                    <Link to="/EventsPage"><Button name='Events' /></Link>
                    <Link to="/SeriesPage"><Button name='Series' /></Link>
                    <Link to="/ProfilePage"><Button name='Profile' /></Link>
                </section>
            </div>
        )
    }
}
export default Header;