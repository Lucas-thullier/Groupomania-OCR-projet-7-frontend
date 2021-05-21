import axios from "axios";
import { useEffect, useState } from "react";
import ProfilePicture from "../ProfilPicture/ProfilPicture";
import { prepareHeaders } from "../Utils/utils";
require("./ChatHeader.css");

const ConversationHeader = ({ selectedConversation, setSelectedConversation }) => {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/conversation/id?id=${selectedConversation.id}`, prepareHeaders(document.cookie))
      .then((singleConv) => {
        setSelectedConversation(singleConv.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="chatHeader">
      <div className="conversationInfos">
        <ProfilePicture imageUrl={selectedConversation.friend.imageUrl} />
        <span className="conversationName">
          {selectedConversation.friend.username ? selectedConversation.friend.username : "Qui est-ce?"}
        </span>
      </div>
    </div>
  );
};

export default ConversationHeader;
