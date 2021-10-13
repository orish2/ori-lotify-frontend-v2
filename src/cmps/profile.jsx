import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { eventBusService } from '../services/event-bus.service';
import { connect } from 'react-redux'
import { loadUser, onSignup, onLogin, onLogout } from '../store/user.actions';
import { loadStations } from '../store/station.actions';
import FacebookLogin from 'react-facebook-login';
import Avatar from 'react-avatar';
import { LoginSignupForm } from './login-signup-form';


class _UserPrifile extends Component {
    state = {
        loginOrSignup: null,
        isLoggedIn: false,
        credentials: {
            username: null,
            password: null,
            fullname: null,
            facebookUserId: null,
            img: null
            // facebookEmail: null
        }
    }

    componentDidMount() {
        this.props.loadUser()
    }

    getInitialCredentials = () => {
        return {
            username: '',
            password: '',
            fullname: '',
            facebookUserId: null,
            img: null
        }
    }
    setLoginOrSignup = (loginOrSignup) => {

        this.setState(prevState => ({ ...prevState, credentials: this.getInitialCredentials(), loginOrSignup }))
        // this.setState({ loginOrSignup })
    }

    handleChange = ({ target }) => {
        const key = target.name
        const val = target.value
        this.setState(prevState => ({ ...prevState, credentials: { ...prevState.credentials, [key]: val } }))
    }
    closeForm = () => {
        this.setLoginOrSignup(null)
    }
    onSubmit = async (credentials) => {
        // let credentials = this.state.credentials
        if (this.state.loginOrSignup === "Login") {
            // if (!isFacebookLogin)
            // credentials = { username: this.state.credentials.username, password: this.state.credentials.password }
            await this.props.onLogin(credentials)
        } else {
            // credentials = { ...this.state.credentials, userPref: this.props.user.userPref }
            credentials.userPref = this.props.user.userPref
            await this.props.onSignup(credentials)
        }
        this.setLoginOrSignup(null)
        await this.props.loadUser()
        await this.props.loadStations()
    }

    facebookComponentClicked = () => {
    }

    responseFacebook = async response => {
        try {

            const newCredentials = {
                username: response.email,
                password: response.userID,
                fullname: response.name,
                facebookUserId: response.userID,
                img: response.picture.data.url
            }
            this.setLoginOrSignup(null)
            this.setState(prevState => ({ ...prevState, credentials: newCredentials }),
                () => this.onSubmit(true))
        }
        catch {

        }
    }

    render() {
        const { loginOrSignup, credentials } = this.state
        const { user } = this.props
        if (!user) return <></>
        return (
            <>
                <div className="profiler">
                    <Menu menuButton={
                        <MenuButton title={user.username}>
                            <Avatar size="50"  src={user.img ? user.img : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} round={true} />
                        </MenuButton>}>
                        {user.username === "guest" &&
                            <MenuItem onClick={() => this.setLoginOrSignup("Login")}>Login</MenuItem>
                        }
                        {user.username === "guest" ?
                            <MenuItem onClick={() => this.setLoginOrSignup("Signup")}>Signup</MenuItem> :
                            <MenuItem onClick={async () => {
                                await this.props.onLogout()
                                await this.props.loadUser()
                                this.props.loadStations()
                            }
                            }>Logout</MenuItem>
                        }
                    </Menu>

                    {/* ori */}

                </div>
                {loginOrSignup && <LoginSignupForm onSubmit={this.onSubmit}
                    isLogin={loginOrSignup === 'Login' ? true : false}
                    closeForm={this.closeForm} />}


                {/* <div className={`create-playlist ${loginOrSignup ? "on" : "off"}`} >
                    <div className="header">
                        <h1>{loginOrSignup}</h1>
                        <button onClick={() => this.setLoginOrSignup(null)}>X</button>
                    </div>
                    <div className="body flex">
                        <form onSubmit={(ev) => ev.preventDefault()}>
                            <TextField
                                className="username"
                                label="Username"
                                value={credentials.username}
                                name="username"
                                autoComplete="off"
                                onChange={this.handleChange}
                            />
                            {loginOrSignup === "Signup" &&
                                <TextField
                                    className="fullname"
                                    label="Full Name"
                                    value={credentials.fullname}
                                    name="fullname"
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                />}
                            <TextField
                                className="create-name"
                                label="Password"
                                ref='password'
                                hintText="Password"
                                floatingLabelText="Password"
                                type="password"
                                value={credentials.password}
                                name="password"
                                autoComplete="off"
                                onChange={this.handleChange}
                            />
                            <div className="buttons flex">
                                <Button style={{ height: "40px", background: '#1db954' }} variant="contained"
                                    onClick={this.onSubmit}>
                                    {loginOrSignup}
                                </Button>
                                <Button style={{ height: "40px", background: '#1E90EA' }} variant="contained"
                                    className="facebook-login-btn-wrapper-ddd"
                                    onClick={(e) => e.preventDefault()} >
                                    {loginOrSignup === "Signup" ? 'Signup with facebook' : 'Login with facebook'}

                                    <FacebookLogin
                                        className="facebook-login-btn"
                                        appId="992060094973798"
                                        autoLoad={true}
                                        fields="name,email,picture"
                                        onClick={this.facebookComponentClicked}
                                        callback={this.responseFacebook} />

                                </Button>

                            </div>
                        </form>
                    </div>
                </div> */}

                {/** Ori - I've uncomment this */}
                {/* <div className={`body-modal ${loginOrSignup ? "on" : "off"}`} onClick={() => this.setLoginOrSignup(null)}></div> */}
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.userMoudle.user
    }
}
const mapDispatchToProps = {
    loadUser,
    onSignup,
    onLogin,
    onLogout,
    loadStations
}


export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserPrifile)