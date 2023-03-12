import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import './index.css'

const VideoItem = props => {
  const {details} = props
  const {channel, publishedAt, id, thumbnailUrl, title, viewCount} = details
  const {name, profileImageUrl} = channel

  const time = formatDistanceToNow(new Date(publishedAt))
  return (
    <Link className="video-list-item" to={`/videos/${id}`}>
      <li>
        <img className="thumbnail" src={thumbnailUrl} alt={name} />
        <div className="thumbnail-details">
          <img
            className="video-profile-image"
            src={profileImageUrl}
            alt={name}
          />
          <div>
            <p>{title}</p>
            <p className="channel-name">{name}</p>
            <div className="views-date">
              <p>{viewCount} Views</p>
              <p className="time">{time}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default VideoItem
