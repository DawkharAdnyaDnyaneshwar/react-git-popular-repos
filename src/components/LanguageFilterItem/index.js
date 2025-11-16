import './index.css'

const LanguageFilterItem = props => {
  const {detail, updateActiveItem, isActive} = props
  const {id, language} = detail

  const languageBtn = `language-btn ${isActive}`

  const onClickBtn = () => {
    updateActiveItem(id)
  }

  return (
    <li className="language-item">
      <button type="button" className={languageBtn} onClick={onClickBtn}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
