import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import axios from "axios";
import { prepareHeaders } from "../Utils/utils";
import "./UserSearchPreview.css";
import SingleUserSearchPreview from "../SingleUserSearchPreview/SingleUserSearchPreview";

const UserSearchPreview = ({ searchResult, clearSearchBar, setIsNewConversation }) => {
  if (Array.isArray(searchResult) && searchResult.length != 0) {
    return (
      <div className="userSearchPreview">
        {searchResult.map((singleSearchResult, key) => (
          <SingleUserSearchPreview key={key} singleSearchResult={singleSearchResult} />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default UserSearchPreview;
