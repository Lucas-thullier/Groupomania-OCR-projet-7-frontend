import React, { useEffect, useState } from "react";
import ProfilPicture from "../../Shared/ProfilPicture/ProfilPicture";
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
            <ProfilPicture imageUrl={singleConversation.friend.imageUrl} />
            <div>{singleConversation.friend.username ? singleConversation.friend.username : "Mais qui est-ce?"}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ConversationsPanel;
