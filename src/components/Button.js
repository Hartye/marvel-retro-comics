import React from 'react';
import '../styles/Global.scss';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="btn">{this.props.name}</button>
        )
    }
}
export default Button;