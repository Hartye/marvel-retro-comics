import React from 'react';
import Button from './Button'
import '../styles/Global.scss';
import '../styles/Footer.scss';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear()
        }
    }

    render() {
        return (
            <footer className='Footer-main'>
                <div className='Footer-image'>
                    <img src="https://github.com/hartye.png" alt="Author" />
                </div>
                <div className='Footer-info'>
                    <p>Carlos Santos @{this.state.year}</p>
                    <p>{this.props.copy}</p>
                </div>
                <div className='Footer-buttons'>
                    <a href="https://www.linkedin.com/in/carlos-santos-274a55219/"><Button name="Linkedin"/></a>
                    <a href="https://github.com/hartye"><Button name="Github"/></a>
                </div>
            </footer>
        )
    }
}
export default Footer;