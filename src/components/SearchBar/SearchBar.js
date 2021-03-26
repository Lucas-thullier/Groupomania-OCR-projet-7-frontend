import React, { useState } from "react";
import "./SearchBar.css";
import axios from "axios";
import FriendSearchPreview from "../FriendSearchPreview/FriendSearchPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const searchElement = <FontAwesomeIcon icon={faSearch} />;

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [isSearchBarBlured, setIsSearchBarBlured] = useState(null);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(null);
  const [isSearchBarEmpty, setIsSearchBarEmpty] = useState(null);

  const onSearchChange = (messageChangeEvent) => {
    const searchContent = messageChangeEvent.target.value;
    if (searchContent.length > 0) {
      setIsSearchBarEmpty(false);
    } else {
      setIsSearchBarEmpty(true);
    }
    if (searchContent) {
      axios
        .get(`http://localhost:3001/user/searchUser?searchContent=${searchContent}`)
        .then((searchResponse) => {
          setSearchResult(searchResponse.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchResult(null);
    }
  };

  const handleBlur = (bluredEvent) => {
    setIsSearchBarFocused(false);
    if (bluredEvent) {
      setIsSearchBarBlured(true);
    }
  };

  const handleFocus = (focusEvent) => {
    setIsSearchBarBlured(false);
    if (focusEvent) {
      setIsSearchBarFocused(true);
    }
  };

  return (
    <div>
      <input
        className="searchBar"
        type="text"
        onChange={onSearchChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button> {searchElement} </button>
      {
        <FriendSearchPreview
          searchResult={searchResult}
          isSearchBarBlured={isSearchBarBlured}
          isSearchBarFocused={isSearchBarFocused}
          isSearchBarEmpty={isSearchBarEmpty}
        />
      }
    </div>
  );
};

export default SearchBar;
