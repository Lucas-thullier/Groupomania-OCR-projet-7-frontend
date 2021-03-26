import React, { useState, useEffect } from "react";
const ProfilPicture = require("../ProfilPicture/ProfilPicture");
require("./FriendSearchPreview.css");

const FriendSearchPreview = ({
  searchResult,
  isSearchBarBlured,
  isSearchBarFocused,
  isSearchBarEmpty,
}) => {
  if (Array.isArray(searchResult) && searchResult.length != 0) {
    return (
      <div className="friendSearchPreview">
        {searchResult.map((singleSearchResult, key) => (
          <div className="singleFriendSearchPreview" key={key}>
            {singleSearchResult.username}
          </div>
        ))}
      </div>
    );
  } else {
    if (isSearchBarFocused && isSearchBarEmpty === false) {
      return <>Aucun resultat ne correspond a votre recherche</>;
    }
    return <></>;
  }
};

export default FriendSearchPreview;
