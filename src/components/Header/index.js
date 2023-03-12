import {FaMoon} from 'react-icons/fa'
import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = () => {
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    return <Redirect to="/login" />
  }
  return (
    <div className="header-bg">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="logo"
          className="header-logo"
        />
      </Link>

      <div className="header-profile">
        <FaMoon size={25} />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
          alt="profile"
          className="profile"
        />
        <button className="logOutButton" onClick={onClickLogOut} type="button">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header
