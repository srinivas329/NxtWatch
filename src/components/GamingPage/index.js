import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import LeftSection from '../LeftSection'
import GamingItem from '../GamingItem'

import './index.css'

const apiResponses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class GamingPage extends Component {
  state = {gamingVideos: [], resultStatus: apiResponses.initial}

  componentDidMount() {
    this.getGamingList()
  }

  getGamingList = async () => {
    this.setState({resultStatus: apiResponses.loading})
    const token = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const {videos} = data
    const updatedVideos = videos.map(each => ({
      thumbnailUrl: each.thumbnail_url,
      viewCount: each.view_count,
      title: each.title,
      id: each.id,
    }))
    if (response.ok === true) {
      this.setState({
        gamingVideos: updatedVideos,
        resultStatus: apiResponses.success,
      })
    } else {
      this.setState({resultStatus: apiResponses.failure})
    }
  }

  getLoaderForGamingPage = () => (
    <div className="loader-container">
      <Loader type="BallTriangle" color="#3b82f6" width={40} height={40} />
    </div>
  )

  onClickRetry = () => {
    this.renderGamingPageSection()
  }

  getVideosListFailure = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble to complete request. Please try again</p>
      <button onClick={this.onClickRetry} type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  getGamingPageDetails = () => {
    const {gamingVideos} = this.state
    return (
      <div>
        <ul className="gaming-ul-list">
          {gamingVideos.map(each => (
            <GamingItem details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderGamingPageSection = () => {
    const {resultStatus} = this.state
    switch (resultStatus) {
      case apiResponses.loading:
        return this.getLoaderForGamingPage()
      case apiResponses.success:
        return this.getGamingPageDetails()
      case apiResponses.failure:
        return this.getVideosListFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="gaming-div-container">
          <LeftSection />
          <div>
            <div className="saved-logo-container">
              <HiFire color="red" size={40} className="fire-bg" />
              <h1>Gaming</h1>
            </div>
            {this.renderGamingPageSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default GamingPage
