import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import axios from "axios";
import { prepareHeaders } from "../Utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
require("./UserSearchPreview.css");

const UserSearchPreview = ({ searchResult, clearSearchBar, setIsNewConversation }) => {
  const friendStatut = (isAlreadyFriend) => (
    <span className="fa-layers fa-fw" id="userStatut">
      <FontAwesomeIcon icon={faUserFriends} className="friendshipLogo" />

      <FontAwesomeIcon icon={isAlreadyFriend ? faCheck : faPlus} transform="shrink-4" className="friendshipCheck" />
    </span>
  );

  function createConversation(userId, friendId) {
    let dataForNewConversation = {
      userId: userId,
      friendId: friendId,
    };
    dataForNewConversation = JSON.stringify(dataForNewConversation);
    axios
      .post("http://localhost:3001/conversation/createConversation", dataForNewConversation, prepareHeaders(document.cookie))
      .then(() => {
        setIsNewConversation(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function actionOnPreviewClick(singleSearchResult) {
    return (
      <Link to={`/userPage/${singleSearchResult.id}`}>
        <ProfilPicture imageUrl={singleSearchResult.imageUrl} />
        <span>{singleSearchResult.username}</span>
      </Link>
    );
  }

  if (Array.isArray(searchResult) && searchResult.length != 0) {
    return (
      <div className="userSearchPreview">
        {searchResult.map((singleSearchResult, key) => (
          <div className="singleUserSearchPreview" key={key} onClick={clearSearchBar}>
            <ProfilPicture imageUrl={singleSearchResult.imageUrl} />
            <div className="previewUsername">{singleSearchResult.username}</div>
            <div className="friendStatut">{friendStatut(singleSearchResult.isAlreadyFriend)}</div>
          </div>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default UserSearchPreview;
