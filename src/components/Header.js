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
            <div>
                <section className="Header-image-section">
                    <img className='Header-image' src={HeaderImage} alt="Marvel comics characters" />
                </section>
                <section className='Header-button-section'>
                    <Button name='Characters' />
                    <Button name='Creators' />
                    <Link to="/ComicsPage"><Button name='Comics' /></Link>
                    <Button name='Events' />
                    <Button name='Series' />
                </section>
            </div>
        )
    }
}
export default Header;