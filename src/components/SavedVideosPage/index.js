import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import LeftSection from '../LeftSection'
import SavedItem from '../SavedItem'
import SavedVideosContext from '../../Context/videoContext'

import './index.css'

class SavedVideosPage extends Component {
  getNoSavedVideosPage = () => (
    <div className="no-saved-videos-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved"
        className="no-videos-img"
      />
      <h1>No Saved Videos</h1>
      <p>you can save your videos</p>
    </div>
  )

  render() {
    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {savedVideoList} = value
          return (
            <div>
              <Header />
              <div className="saved-videos-page-container">
                <LeftSection />
                <div>
                  <div className="saved-logo-container">
                    <HiFire color="red" size={40} className="fire-bg" />
                    <h1>Saved Videos</h1>
                  </div>
                  {savedVideoList.length === 0 ? (
                    this.getNoSavedVideosPage()
                  ) : (
                    <div>
                      <ul className="saved-ul-list">
                        {savedVideoList.map(each => (
                          <SavedItem details={each} key={each.id} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}

export default SavedVideosPage
