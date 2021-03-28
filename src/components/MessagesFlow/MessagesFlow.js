import React, { useState, useEffect } from "react";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
require("./MessagesFlow.css");

const MessagesFlow = ({ allMessages }) => {
  useEffect(() => {
    const MessagesFlowDiv = document.getElementsByClassName("messagesFlow")[0];
    MessagesFlowDiv.scrollTop = MessagesFlowDiv.scrollHeight;
  }, [allMessages]);

  const userId = localStorage.getItem("userId");
  return (
    <div className="messagesFlow">
      {allMessages.map((singleMessage, key) => (
        <div
          key={key}
          className={singleMessage.User.id == userId ? "oneMessage self" : "oneMessage other"}
          id={singleMessage.User.id}
        >
          <ProfilPicture imageUrl={singleMessage.User.imageUrl} />
          <div className="textContent">
            <p className="username">{singleMessage.User.username}</p>
            <p className="messageContent">{singleMessage.text_content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesFlow;
