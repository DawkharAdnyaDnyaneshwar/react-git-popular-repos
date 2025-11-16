import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repoList: [],
    activeId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepoList()
  }

  getRepoList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachPopularRepo => ({
        name: eachPopularRepo.name,
        id: eachPopularRepo.id,
        issuesCount: eachPopularRepo.issues_count,
        forksCount: eachPopularRepo.forks_count,
        starsCount: eachPopularRepo.stars_count,
        avatarUrl: eachPopularRepo.avatar_url,
      }))
      this.setState({
        repoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateActiveItem = id => {
    this.setState({activeId: id}, this.getRepoList)
  }

  renderSuccess = repoList => (
    <ul className="repo-item-container">
      {repoList.map(eachRepo => (
        <RepositoryItem key={eachRepo.id} repoDetail={eachRepo} />
      ))}
    </ul>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
    </div>
  )

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderResult = () => {
    const {repoList, apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess(repoList)
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="main-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-filter-container">
          {languageFiltersData.map(eachFilterData => (
            <LanguageFilterItem
              key={eachFilterData.id}
              detail={eachFilterData}
              isActive={eachFilterData.id === activeId ? 'active' : ''}
              updateActiveItem={this.updateActiveItem}
            />
          ))}
        </ul>
        {this.renderResult()}
      </div>
    )
  }
}

export default GithubPopularRepos
