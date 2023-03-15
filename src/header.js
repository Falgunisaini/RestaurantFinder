import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

const url = "https://foodscapejwt-production.up.railway.app/api/auth/userinfo"

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: '',
            username: '',
            userImg: ''
        }
    }

    handleLogout = () => {
        sessionStorage.removeItem('userInfo');
        sessionStorage.setItem('loginStatus', 'loggedOut');
        sessionStorage.removeItem('LoginToken');
        sessionStorage.removeItem('uName')
        sessionStorage.removeItem('uImg')
        this.setState({ userData: '', username: '', userImg: '' });
        this.props.history.push('/')
    }

    conditionalHeader = () => {
        if (this.state.userData.name || sessionStorage.getItem('uName') !== null) {
            if (sessionStorage.getItem('uName') !== null) {

                // let oAuthArray = [sessionStorage.getItem('uName').toLowerCase().trim().split(' ')[0]]
                // sessionStorage.setItem('oAuthname', oAuthArray);
                // let name = sessionStorage.getItem('uName');
                // let image = sessionStorage.getItem('uImg');
                return (
                    <>
                        <Link to="/" className="btn" id="login" style={{ width: '60%' }}>
                            <img src={image} style={{ height: 40, width: 40, marginTop: '-4%', marginLeft: '-9%' }} id="gitImg" /> &nbsp;
                            <span className="glyphicon glyphicon-user"></span>Hi {name}
                        </Link>
                        &nbsp;
                        <button onClick={this.handleLogout} className="btn" id="signup"><span className="glyphicon glyphicon-log-out"></span>Log out</button>
                        
                    </>
                )
            }
            else {
                let data = this.state.userData;
                let outputArr = [data._id, data.name.toLowerCase().trim().split(' ')[0], data.email, data.phone, data.role]
                sessionStorage.setItem('userInfo', outputArr);
                sessionStorage.setItem('loginStatus', 'loggedIn');
                return (
                    <>
                        <Link to="/" className="btn" id="login" style={{ width: '60%' }}><span className="glyphicon glyphicon-user"></span>Hi {data.name}</Link>
                        &nbsp;
                        <button onClick={this.handleLogout} className="btn" id="signup"><span className="glyphicon glyphicon-log-out"></span>Log out</button>
                    </>
                )
            }
        }
        else {
            return (
                <>
                    {/* <a className="btn btn-info" id="loginGit" href="https://github.com/login/oauth/authorize?client_id=e142ac826f134c8bf347">
                        Login With Github
                    </a>
                    &nbsp; */}
                    <Link to="/login" className="btn" id="login" style={{ width: '30%' }}><span className="glyphicon glyphicon-log-in"></span>Login</Link>
                    &nbsp;
                    <Link to="/register" className="btn" id="signup"><span className="glyphicon glyphicon-user"></span>Sign Up</Link>
                </>
            )
        }
    }


    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">FoodScape</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">

                        <ul className="nav navbar-nav navbar-right">
                            {this.conditionalHeader()}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }

    componentDidMount() {
        if (this.props.location.search) {
            console.log("in git>>>", this.props.location.search)
            if (this.props.location.search.split('=')[0] == '?code') {
                var code = this.props.location.search.split('=')[1]
            }

            if (code) {

                let requestedData = {
                    code: code
                }

                fetch(`https://foodscape-oauth-git.herokuapp.com/oauth`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestedData)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(">>>>data>>>>>", data)
                        let username = data.name;
                        let img = data.avatar_url;
                        let email = data.login;

                        sessionStorage.setItem('uName', username)
                        sessionStorage.setItem('uImg', img)
                        sessionStorage.setItem('email', email)

                        sessionStorage.setItem('loginStatus', 'loggedIn')
                        this.setState({ username: username, userImg: img })
                    })
            }
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': sessionStorage.getItem('LoginToken')
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({ userData: data })
            })
    }
}

export default withRouter(Header)