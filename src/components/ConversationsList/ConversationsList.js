import React, { useEffect, useState } from "react";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../SearchBar/SearchBar";
require("./ConversationsList.css");

const plusElement = <FontAwesomeIcon icon={faPlusCircle} />;

const ConversationsList = ({ allConv, setSelectedConversation, setIsNewConversation }) => {
  const searchFor = "friends";

  if (allConv) {
    return (
      <aside className="contactPanel">
        <SearchBar searchFor={searchFor} setIsNewConversation={setIsNewConversation} />
        <ul className="contact">
          {allConv.map((singleConv, key) => (
            <li
              onClick={() => {
                setSelectedConversation(singleConv);
              }}
              key={key}
            >
              <ProfilPicture imageUrl={singleConv.imageUrl} />
              <div>
                {singleConv.name
                  ? singleConv.name
                  : singleConv.Users.map((user, key) => <div key={key}>{user.username}</div>)}
              </div>
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
