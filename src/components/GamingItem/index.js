import {Link} from 'react-router-dom'

import './index.css'

const GamingItem = props => {
  const {details} = props
  const {id, thumbnailUrl, viewCount, title} = details
  return (
    <Link className="gaming-list-item" to={`/videos/${id}`}>
      <li className="game-list-item">
        <img className="game-thumbnail" src={thumbnailUrl} alt={title} />
        <div>
          <p>{title}</p>
          <p>{viewCount}Watching Worldwide</p>
        </div>
      </li>
    </Link>
  )
}

export default GamingItem
