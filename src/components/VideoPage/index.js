import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {RiPlayListAddFill} from 'react-icons/ri'

import ReactPlayer from 'react-player/lazy'

import Header from '../Header'
import LeftSection from '../LeftSection'
import SavedVideosContext from '../../Context/videoContext'

import './index.css'

class VideoPage extends Component {
  state = {
    videoObject: {},
    updatedChannel: {},
    likeStatus: false,
    disLikeStatus: false,
    savedStatus: false,
    isLoading: true,
  }

  componentDidMount() {
    this.getVideoFromResponse()
  }

  getVideoFromResponse = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = {
      videoDetails: data.video_details,
    }
    const {videoDetails} = updatedData
    console.log(videoDetails)
    const updatedDetails = {
      id: videoDetails.id,
      channel: videoDetails.channel,
      title: videoDetails.title,
      description: videoDetails.description,
      videoUrl: videoDetails.video_url,
      viewCount: videoDetails.view_count,
      thumbnailUrl: videoDetails.thumbnail_url,
      publishedAt: videoDetails.published_at,
    }
    const {channel} = videoDetails
    const updatedChannel = {
      name: channel.name,
      profileImageUrl: channel.profile_image_url,
      subscriberCount: channel.subscriber_count,
    }
    if (response.ok === true) {
      this.setState({
        videoObject: updatedDetails,
        updatedChannel,
        isLoading: false,
      })
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({
      likeStatus: !prevState.likeStatus,
      disLikeStatus: false,
    }))
  }

  getLoaderForVideo = () => (
    <div className="loader-container">
      <Loader type="BallTriangle" color="#3b82f6" width={40} height={40} />
    </div>
  )

  onClickDislike = () => {
    this.setState(prevState => ({
      likeStatus: false,
      disLikeStatus: !prevState.disLikeStatus,
    }))
  }

  render() {
    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {addSavedVideo, savedVideoList} = value
          console.log(savedVideoList)
          const {
            videoObject,
            updatedChannel,
            likeStatus,
            disLikeStatus,
            savedStatus,
            isLoading,
          } = this.state

          const likecolor = likeStatus ? 'like-dislike-color' : ''

          const disLikeColor = disLikeStatus ? 'like-dislike-color' : ''

          const savedColor = savedStatus ? 'like-dislike-color' : ''

          const savedText = savedStatus ? 'Saved' : 'Save'

          const {
            description,
            publishedAt,
            title,
            videoUrl,
            viewCount,
          } = videoObject
          const {name, subscriberCount, profileImageUrl} = updatedChannel

          const onClickSavedList = () => {
            addSavedVideo({...videoObject})
            this.setState(prevState => ({savedStatus: !prevState.savedStatus}))
          }

          return (
            <div>
              <Header />
              <div className="video-page-container">
                <LeftSection />
                {isLoading ? (
                  this.getLoaderForVideo()
                ) : (
                  <div className="video-container">
                    <ReactPlayer
                      width={1200}
                      height={600}
                      url={videoUrl}
                      controls
                    />
                    <p className="title">{title}</p>
                    <div className="content-tab">
                      <div className="view-date-tab">
                        <p>{viewCount} Views</p>
                        <p>{publishedAt}</p>
                      </div>
                      <div className="like-container">
                        <button
                          onClick={this.onClickLike}
                          type="button"
                          className={`like-btn ${likecolor}`}
                        >
                          <BiLike size={20} />
                          <p className="like-text">Like</p>
                        </button>
                        <button
                          onClick={this.onClickDislike}
                          type="button"
                          className={`like-btn ${disLikeColor}`}
                        >
                          <BiDislike size={20} />
                          <p className="like-text">DisLike</p>
                        </button>
                        <button
                          onClick={onClickSavedList}
                          type="button"
                          className={`like-btn ${savedColor}`}
                        >
                          <RiPlayListAddFill size={20} />
                          <p className="like-text">{savedText}</p>
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="description-container">
                      <img
                        className="channel-profile"
                        src={profileImageUrl}
                        alt={name}
                      />
                      <div>
                        <p>{name}</p>
                        <p>{subscriberCount} Subscribers</p>
                        <p className="description">{description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}
export default VideoPage
