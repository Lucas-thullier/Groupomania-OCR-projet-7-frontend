import React, { useEffect, useState } from "react";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
require("./ConversationsPanel.css");

const ConversationsPanel = ({ allConversations, setSelectedConversation }) => {
  useEffect(() => {
    document.querySelector(".conversationsPanel").style.transform = "translateX(0)";
  }, []);

  return (
    <aside className="conversationsPanel">
      <ul className="contact">
        {allConversations.map((singleConversation, key) => (
          <li
            onClick={() => {
              setSelectedConversation(singleConversation);
            }}
            key={key}
          >
            <ProfilPicture imageUrl={singleConversation.imageUrl} />
            <div>{singleConversation.name ? singleConversation.name : singleConversation.Users.map((user, key) => <div key={key}>{user.username}</div>)}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ConversationsPanel;
