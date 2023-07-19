import React from 'react';
import '../styles/Global.scss';
import ReloadImage from '../images/reload_icon.png';

class LoadScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Reload-screen-main'>
                <img src={ReloadImage} alt="Loading" />
            </div>
        )
    }
}
export default LoadScreen;