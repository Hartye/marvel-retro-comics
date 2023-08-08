import React from 'react';
import '../styles/Global.scss';
import '../styles/Profile.scss';
import DetailSection from '../components/DetailSection';
import { Link } from 'react-router-dom';

class LogInPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.testFields = this.testFields.bind(this);
        this.state = {
            name: '',
            age: 0,
            pass: ''
        }
    }

    handleChange(event) {
        if (event.target.id == "name") {
            this.setState({
                name: event.target.value
            })
        } else if (event.target.id == "age") {
            this.setState({
                age: event.target.value
            })
        } else if (event.target.id == "pass") {
            this.setState({
                pass: event.target.value
            })
        };
    }

    async testFields() {
        if ((this.state.age < 13 || this.state.age > 120) || this.state.name == '' || this.state.pass == '') {
            alert("Note: all the fields should be filled, you must be over 13");
        } else {
            let url = 'https://marvel-retro-comics-back-end.vercel.app/api/add/';

            let req = new Request(url);
            let params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{ "name": "'+this.state.name+'", "age": '+this.state.age+', "pass": "'+this.state.pass+'" }'
            };
            await fetch(req, params);

            localStorage.setItem('profile', JSON.stringify({"name": this.state.name, "age": this.state.age, "pass": this.state.pass}))
            window.location.reload(false);            
        }
    }

    render() {
        return (
            <div className='LogIn-main'>
                <div className='Modal-section'>
                    <p>Please input your name</p>
                    <input id="name" type="text" placeholder='Name' onChange={this.handleChange} />
                    <p>Please input your age</p>
                    <input id="age" type='number' placeholder='Age' onChange={this.handleChange} />
                    <p>Please input your PassWord</p>
                    <input id="pass" type='text' placeholder='PassWord' onChange={this.handleChange} />
                    <div className='Modal-buttons'>
                        <button className='btn log' onClick={this.testFields}>Log In</button>
                        <Link to="/ComicsPage">
                            <button className='btn close'>Close</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pass: 0,
            logged: false
        }
    }

    componentDidMount() {
        if (JSON.parse(localStorage.getItem("profile")) == null) {
            localStorage.removeItem("profile");
            this.setState({
                logged: false
            })
        } else {
            let localData = JSON.parse(localStorage.getItem('profile'));

            this.setState({
                name: localData.name,
                pass: localData.pass,
                logged: true
            })
        }
    }

    render() {
        return (
            <div className='Profile-main'>
                {
                    this.state.logged == false ? 
                        <LogInPopUp /> : 
                        <DetailSection 
                            targetPage='ProfilePage' 
                            name={this.state.name} 
                            pass={this.state.pass} 
                            target='profile' 
                            hash={this.props.hash} 
                            apiKey={this.props.apiKey} />
                }
                
            </div>
        );
    }
}
export default Profile;