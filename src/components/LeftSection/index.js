import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddFill} from 'react-icons/ri'
import {Link} from 'react-router-dom'

import './index.css'

const LeftSection = () => (
  <div className="left-card">
    <ul>
      <Link className="left-links" to="/">
        <li className="left-icon-tab">
          <AiFillHome size={25} />
          <p className="home-text">Home</p>
        </li>
      </Link>
      <Link className="left-links" to="/trending">
        <li className="left-icon-tab">
          <HiFire size={25} />
          <p className="home-text">Trending</p>
        </li>
      </Link>
      <Link className="left-links" to="/gaming">
        <li className="left-icon-tab">
          <SiYoutubegaming size={25} />
          <p className="home-text">Gaming</p>
        </li>
      </Link>
      <Link className="left-links" to="/saved-videos">
        <li className="left-icon-tab">
          <RiPlayListAddFill size={20} />
          <p className="home-text">Saved Videos</p>
        </li>
      </Link>
    </ul>
    <div>
      <p className="contact-us">CONTACT US</p>
      <div className="logos-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
          className="logos"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
          className="logos"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
          className="logos"
        />
      </div>
      <p className="tag">
        Enjoy! now to see your channels and recommendations.
      </p>
    </div>
  </div>
)

export default LeftSection
