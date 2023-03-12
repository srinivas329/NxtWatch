import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showPassword: '',
    errorText: '',
    errorStatus: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = event => {
    this.setState({showPassword: event.target.checked})
  }

  getLoginSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  getLoginFailure = error => {
    this.setState({errorText: error, errorStatus: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.getLoginSuccess(data.jwt_token)
    } else {
      this.getLoginFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      showPassword,
      errorStatus,
      errorText,
    } = this.state

    const showPasswordValue = showPassword ? 'text' : 'password'

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div>
          <form className="form-bg" onSubmit={this.onSubmitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="login-logo"
            />
            <div className="input-div">
              <label htmlFor="username">USERNAME</label>
              <br />
              <input
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Username"
                className="login-input"
                id="username"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="password">PASSWORD</label>
              <br />
              <input
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
                className="login-input2"
                id="password"
                type={showPasswordValue}
              />
            </div>
            <div className="show-password">
              <input
                value={showPassword}
                onChange={this.onChangeShowPassword}
                id="checkbox"
                type="checkbox"
              />
              <label htmlFor="checkbox">Show Password</label>
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {errorStatus && <p className="error-text">*{errorText}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
