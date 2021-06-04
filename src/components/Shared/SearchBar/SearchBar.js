import React, { useEffect, useState } from 'react'
import './SearchBar.css'
import axios from 'axios'
import UserSearchPreview from '../UserSearchPreview/UserSearchPreview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { prepareHeaders } from '../../Utils/utils'
const searchElement = <FontAwesomeIcon icon={faSearch} />

const SearchBar = ({ searchFor, setIsNewConversation }) => {
  const [searchResult, setSearchResult] = useState(null)
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(null)
  const [isSearchBarEmpty, setIsSearchBarEmpty] = useState(null)
  const [searchContent, setSearchContent] = useState(null)

  useEffect(() => {
    if (searchContent) {
      if (searchContent.length > 0) {
        setIsSearchBarEmpty(false)
      } else {
        setIsSearchBarEmpty(true)
      }

      const searchUrl = `${process.env.REACT_APP_BACKEND_URL}/user/search?searchContent=${searchContent}`
      axios
        .get(searchUrl, prepareHeaders(document.cookie))
        .then((searchResponse) => {
          setSearchResult(searchResponse.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setSearchResult(null)
    }
  }, [searchContent, isSearchBarFocused])

  const clearSearchBar = () => {
    document.querySelector(
      '.searchWrapper >.searchBar > .searchBarInput'
    ).value = ''
  }

  const handleFocus = (focusEvent) => {
    if (focusEvent) {
      setIsSearchBarFocused(true)
    }
  }

  const handleBlur = (blurEvent) => {
    setIsSearchBarFocused(false)
    if (blurEvent) {
      setTimeout(() => {
        setSearchResult(null)
        clearSearchBar()
      }, 200)
    }
  }
  const onSearchChange = (messageChangeEvent) => {
    setSearchContent(messageChangeEvent.target.value)
  }

  return (
    <div className="searchWrapper">
      <div className="searchBar">
        <input
          className="searchBarInput"
          type="text"
          onChange={onSearchChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button> {searchElement} </button>
        <UserSearchPreview
          setIsNewConversation={setIsNewConversation}
          searchResult={searchResult}
          clearSearchBar={clearSearchBar}
        />
      </div>
    </div>
  )
}

export default SearchBar
