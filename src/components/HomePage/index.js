import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineClose} from 'react-icons/ai'
import {BiSearchAlt2} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import VideoItem from '../VideoItem'
import LeftSection from '../LeftSection'
import './index.css'

const apiResponses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class HomePage extends Component {
  state = {
    videos: [],
    apiStatus: apiResponses.initial,
    primeSection: false,
    searchInput: '',
    search: '',
  }

  componentDidMount() {
    this.getVideosList()
  }

  getVideosList = async () => {
    this.setState({apiStatus: apiResponses.loading})
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(search)
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const {videos} = data
    const updatedData = videos.map(each => ({
      id: each.id,
      channel: {
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      },
      title: each.title,
      viewCount: each.view_count,
      thumbnailUrl: each.thumbnail_url,
      publishedAt: each.published_at,
    }))

    if (response.ok === true) {
      this.setState({
        videos: updatedData,
        apiStatus: apiResponses.success,
      })
    } else if (response.state === 401) {
      this.setState({apiStatus: apiResponses.failure})
    }
  }

  getLoader = () => (
    <div data-testid="loader" className="failure-container">
      <Loader type="ThreeDots" color="navyblue" />
    </div>
  )

  onClickRetry = () => {
    this.getVideosSection()
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

  renderVideoList = () => {
    const {videos} = this.state
    return (
      <>
        {videos.length === 0 ? (
          <div className="failure-container">
            <img
              className="failure-img"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="failure view"
            />
            <h1>No Search results found</h1>
            <p>Try different keywords or remove search filter</p>
            <button
              onClick={this.onClickRetry}
              type="button"
              className="retry-btn"
            >
              Retry
            </button>
          </div>
        ) : (
          <ul className="videos-ul-list">
            {videos.map(each => (
              <VideoItem details={each} key={each.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  getVideosSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiResponses.success:
        return this.renderVideoList()
      case apiResponses.failure:
        return this.getVideosListFailure()
      case apiResponses.loading:
        return this.getLoader()
      default:
        return null
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({search: searchInput}, this.getVideosList)
  }

  onClickClose = () => {
    this.setState({primeSection: true})
  }

  render() {
    const {primeSection} = this.state
    return (
      <div className="home-container">
        <Header />
        <div className="home-bg">
          <LeftSection />
          <div className="right-container">
            {primeSection ? (
              ''
            ) : (
              <div className="prime-banner-bg">
                <div className="wrong-tab">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="logo"
                    className="header-logo"
                  />
                  <AiOutlineClose onClick={this.onClickClose} />
                </div>

                <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                <button type="button" className="prime-button">
                  GET IT NOW
                </button>
              </div>
            )}

            <div className="right-bottom-bg">
              <div className="search-tab">
                <input
                  onChange={this.onChangeSearch}
                  placeholder="Search"
                  className="search-input"
                  type="search"
                />
                <BiSearchAlt2
                  onClick={this.onClickSearchIcon}
                  className="search-icon"
                />
              </div>
              {this.getVideosSection()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
