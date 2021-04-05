import React, { useState, useEffect } from "react";
import ConversationsPanel from "../ConversationsPanel/ConversationsPanel";
import axios from "axios";
import { prepareHeaders } from "../Utils/utils";
import Chat from "../Chat/Chat";
import ChatPlaceholder from "../ChatPlaceholder/ChatPlaceholder";
import { useLocation } from "react-router";
require("./Messaging.css");

const Messaging = () => {
  const location = useLocation();
  const [allConversations, setAllConversations] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useState(() => {
    if (location.state && location.state.conversation) {
      setSelectedConversation(location.state.conversation);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/conversation/getAllConvByUserId`, prepareHeaders(document.cookie))
      .then((allConversationsResponse) => {
        setAllConversations(allConversationsResponse.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (selectedConversation == null) {
      // document.querySelector(".chat").style.transform = "translateX(1000px)";
      // document.querySelector(".chatPlaceholder").style.transform = "translateX(1000px)";
    } else {
    }
  }, [selectedConversation]);

  return (
    <main className="messaging">
      {allConversations ? (
        <ConversationsPanel allConversations={allConversations} setSelectedConversation={setSelectedConversation} />
      ) : (
        <></>
      )}
      {selectedConversation ? <Chat selectedConversation={selectedConversation} /> : <ChatPlaceholder />}
    </main>
  );
};

export default Messaging;
