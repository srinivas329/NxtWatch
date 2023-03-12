import Header from '../Header'
import LeftSection from '../LeftSection'

import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="saved-videos-page-container">
      <LeftSection />

      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
          alt="not found"
          className="failure-img"
        />
        <h1>Page Not Found</h1>
        <p>we are sorry, the page you requested could not be found.</p>
      </div>
    </div>
  </div>
)

export default NotFound
