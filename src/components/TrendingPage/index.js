import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import LeftSection from '../LeftSection'
import SavedItem from '../SavedItem'

const apiResponses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class TrendingPage extends Component {
  state = {
    trendingVideos: [],
    resultStatus: apiResponses.initial,
  }

  componentDidMount() {
    this.getTrendingList()
  }

  getTrendingList = async () => {
    this.setState({resultStatus: apiResponses.loading})
    const token = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/videos/trending'
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
      channel: each.channel,
      publishedAt: each.published_at,
      thumbnailUrl: each.thumbnail_url,
      viewCount: each.view_count,
      title: each.title,
      id: each.id,
    }))
    if (response.ok === true) {
      this.setState({
        trendingVideos: updatedVideos,
        resultStatus: apiResponses.success,
      })
    } else {
      this.setState({resultStatus: apiResponses.failure})
    }
  }

  getLoaderForTrendingPage = () => (
    <div className="loader-container">
      <Loader type="BallTriangle" color="#3b82f6" width={40} height={40} />
    </div>
  )

  onClickRetry = () => {
    this.getTrendingSectionPage()
  }

  getVideosListFailure = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having something trouble to complete request. Please try again
      </p>
      <button onClick={this.onClickRetry} type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  getPageDetails = () => {
    const {trendingVideos} = this.state
    return (
      <div>
        <ul className="saved-ul-list">
          {trendingVideos.map(each => (
            <SavedItem details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  getTrendingSectionPage = () => {
    const {resultStatus} = this.state
    switch (resultStatus) {
      case apiResponses.loading:
        return this.getLoaderForTrendingPage()
      case apiResponses.success:
        return this.getPageDetails()
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
        <div className="saved-videos-page-container">
          <LeftSection />
          <div>
            <div className="saved-logo-container">
              <HiFire color="red" size={40} className="fire-bg" />
              <h1>Trending</h1>
            </div>
            <div>{this.getTrendingSectionPage()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default TrendingPage
