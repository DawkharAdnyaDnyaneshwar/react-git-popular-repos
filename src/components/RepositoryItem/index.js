import './index.css'

const RepositoryItem = props => {
  const {repoDetail} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetail

  return (
    <li className="repo-item-container">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h2 className="heading">{name}</h2>
      <div className="img-detail-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="img"
        />
        <p className="detail">{starsCount}</p>
      </div>
      <div className="img-detail-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="img"
        />
        <p className="detail">{forksCount}</p>
      </div>
      <div className="img-detail-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="img"
        />
        <p className="detail">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
