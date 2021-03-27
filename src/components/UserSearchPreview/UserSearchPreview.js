import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import axios from "axios";
import utils from "../Utils/utils";
require("./UserSearchPreview.css");

const UserSearchPreview = ({
  searchResult,
  isSearchBarBlured,
  isSearchBarFocused,
  isSearchBarEmpty,
  clearSearchBar,
  searchFor,
  setIsNewConversation,
}) => {
  function createConversation(userId, friendId) {
    let dataForNewConversation = {
      userId: userId,
      friendId: friendId,
    };
    dataForNewConversation = JSON.stringify(dataForNewConversation);
    axios
      .post(
        "http://localhost:3001/conversation/createConversation",
        dataForNewConversation,
        utils.prepareHeaders(document.cookie)
      )
      .then(() => {
        setIsNewConversation(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function actionOnPreviewClick(singleSearchResult) {
    switch (searchFor) {
      case "users":
        return (
          <Link to={`/userPage/${singleSearchResult.id}`}>
            <ProfilPicture />
            <span>{singleSearchResult.username}</span>
          </Link>
        );
      case "friends":
        const userId = localStorage.getItem("userId");
        const friendId = singleSearchResult.id;
        return (
          <div onClick={() => createConversation(userId, friendId)}>
            <ProfilPicture />
            <span>{singleSearchResult.username}</span>
          </div>
        );
      default:
        break;
    }
  }

  if (Array.isArray(searchResult) && searchResult.length != 0) {
    return (
      <div className="userSearchPreview">
        {searchResult.map((singleSearchResult, key) => (
          <div className="singleUserSearchPreview" key={key} onClick={clearSearchBar}>
            {actionOnPreviewClick(singleSearchResult)}
          </div>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default UserSearchPreview;
