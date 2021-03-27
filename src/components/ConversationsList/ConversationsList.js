import React, { useEffect, useState } from "react";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../SearchBar/SearchBar";
require("./ConversationsList.css");

const plusElement = <FontAwesomeIcon icon={faPlusCircle} />;

const ConversationsList = ({ allConv, setConvId, setIsNewConversation }) => {
  const searchFor = "friends";

  if (allConv) {
    return (
      <aside className="contactPanel">
        <SearchBar searchFor={searchFor} setIsNewConversation={setIsNewConversation} />
        <ul className="contact">
          {allConv.map((singleConv, key) => (
            <li
              onClick={() => {
                setConvId(singleConv.id);
              }}
              key={key}
            >
              <ProfilPicture />
              <p>{singleConv.Users[0].username}</p>
            </li>
          ))}
        </ul>
      </aside>
    );
  } else {
    return <div>cc</div>;
  }
};

export default ConversationsList;
