import {Link} from 'react-router-dom'

import './index.css'

const SavedItem = props => {
  const {details} = props
  const {thumbnailUrl, id, viewCount, publishedAt, title, channel} = details
  return (
    <Link className="video-list-item" to={`/videos/${id}`}>
      <li className="saved-list-item">
        <div>
          <img className="saved-thumbnail" src={thumbnailUrl} alt={title} />
        </div>
        <div>
          <p className="saved-heading">{title}</p>
          <p>{channel.name}</p>
          <div className="views-count">
            <p className="views-num">{viewCount} Views</p>
            <p>{publishedAt}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SavedItem
