import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import axios from "axios";
import UserSearchPreview from "../UserSearchPreview/UserSearchPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import utils from "../Utils/utils";
const searchElement = <FontAwesomeIcon icon={faSearch} />;

const SearchBar = ({ searchFor, setIsNewConversation }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(null);
  const [isSearchBarEmpty, setIsSearchBarEmpty] = useState(null);
  const [searchContent, setSearchContent] = useState(null);

  useEffect(() => {
    if (searchContent) {
      if (searchContent.length > 0) {
        setIsSearchBarEmpty(false);
      } else {
        setIsSearchBarEmpty(true);
      }

      axios
        .get(searchUrl, utils.prepareHeaders(document.cookie))
        .then((searchResponse) => {
          setSearchResult(searchResponse.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchResult(null);
    }
  }, [searchContent]);

  const clearSearchBar = () => {
    document.getElementsByClassName("searchBarInput")[0].value = "";
    setSearchResult(null);
  };

  const handleFocus = (focusEvent) => {
    if (focusEvent) {
      setIsSearchBarFocused(true);
    }
  };

  const onSearchChange = (messageChangeEvent) => {
    setSearchContent(messageChangeEvent.target.value);
  };

  let searchUrl;
  switch (searchFor) {
    case "users":
      searchUrl = `http://localhost:3001/user/searchUser?searchContent=${searchContent}`;
      break;
    case "friends":
      const userId = localStorage.getItem("userId");
      searchUrl = `http://localhost:3001/user/searchFriendUsers?searchContent=${searchContent}&userId=${userId}`;
      break;
    default:
      break;
  }

  return (
    <div className="searchWrapper">
      <div className="searchBar">
        <input
          className="searchBarInput"
          type="text"
          onChange={onSearchChange}
          onFocus={handleFocus}
        />
        <button> {searchElement} </button>
        <UserSearchPreview
          setIsNewConversation={setIsNewConversation}
          searchResult={searchResult}
          isSearchBarFocused={isSearchBarFocused}
          isSearchBarEmpty={isSearchBarEmpty}
          clearInput={clearSearchBar}
          searchFor={searchFor}
        />
      </div>
    </div>
  );
};

export default SearchBar;
