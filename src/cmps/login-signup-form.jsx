import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import logo from '../assets/img/gramophone-svgrepo-com.svg'

export class LoginSignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // credentials: {
      username: '',
      password: '',
      fullname: '',
      isLogin: this.props.isLogin
      // facebookUserId: null,
      // img: null
      // }
    };
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
      this.props.onSubmit(newCredentials)
    }
    catch (e) {
      console.log('err:', e);
    }
  }

  handleChange = ({ target }) => {
    this.setState(ps => ({ ...ps, [target.name]: target.value }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const credentials = this.state
    this.props.onSubmit(credentials)
  }

  resetCredentials = () => {
    this.setState({ username: '', fullname: '', password: '', facebookUserId: null, img: null })
  }

  handleClose = (e) => {
    this.resetCredentials()
    this.props.closeForm()
  }

  handleSignIn = () => {
    this.setState(ps => ({ ...ps, isLogin: false }))
  }

  handleLogin = () => {
    this.setState(ps => ({ ...ps, isLogin: true }))
  }

  render() {
    const { username, fullname, password, isLogin } = this.state
    return (
      <>
        <div className="screen" onClick={this.handleClose}></div>
        <section className="form-wrapper">
          <span className="close-form" onClick={this.handleClose}>X</span>
          <div className="form-logo flex column align-center">
            <img src={logo} alt="" />
            <div className="brand-name"><span>Lotify</span><span>.</span></div>

          </div>
          <h2 className="form-header">{isLogin ? 'Sign in to continue' : 'Signup to continue'}</h2>
          <form action="" className="login-signup-form flex column align-center" onSubmit={this.handleSubmit}>
            <input type="text" name="username" placeholder="Enter your username" value={username}
              onChange={this.handleChange} />

            {!isLogin && <input type="text" name="fullname" placeholder="Enter your fullName"
              value={fullname} onChange={this.handleChange} />}

            <input type="password" name="password" placeholder="Enter your password" value={password}
              onChange={this.handleChange} />
            {/* <div className="submit-btns flex"> */}
            <button type="submit" className="login-signup-btn">{isLogin ? 'Login' : 'Signup'}</button>

            {/* <button className="facebook-login-btn-wrapper" type="button">
              {isLogin ? 'Login with Facebook' : 'Signup with Facebook'}

              <FacebookLogin
                className="facebook-login-btn"
                appId="992060094973798"
                autoLoad={false}
                fields="name,email,picture"
                isSdkLoaded={false}
                onClick={this.facebookComponentClicked}
                callback={this.responseFacebook} />
            </button> */}
            {isLogin && <div className="to-sign-in flex"><span>Dont have an acount?</span>
              <span onClick={this.handleSignIn}>Sign here</span>
            </div>}
            {!isLogin && <span className="back-to-login" onClick={this.handleLogin}>Back to Login</span>}
            {/* </div> */}
          </form>
        </section>
      </>
    )
  }
}