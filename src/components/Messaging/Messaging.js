import React, { useState, useEffect } from "react";
import ConversationsPanel from "../ConversationsPanel/ConversationsPanel";
import axios from "axios";
import { prepareHeaders } from "../Utils/utils";
import Chat from "../Chat/Chat";
import ChatPlaceholder from "../ChatPlaceholder/ChatPlaceholder";
require("./Messaging.css");

const Messaging = () => {
  const [allConversations, setAllConversations] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/conversation/getAllConvByUserId`, prepareHeaders(document.cookie))
      .then((allConversationsResponse) => {
        setAllConversations(allConversationsResponse.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  return (
    <main className="messaging">
      {allConversations ? <ConversationsPanel allConversations={allConversations} setSelectedConversation={setSelectedConversation} /> : <></>}
      {selectedConversation ? <Chat selectedConversation={selectedConversation} /> : <ChatPlaceholder />}
    </main>
  );
};

export default Messaging;
