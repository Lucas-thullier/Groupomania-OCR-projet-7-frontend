import React, { useState, useEffect } from "react";
import PostReaction from "../PostReaction/PostReaction";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import ConversationsList from "../ConversationsList/ConversationsList";
import axios from "axios";
import MessagesFlow from "../MessagesFlow/MessagesFlow";
import utils from "../Utils/utils";
require("./Messaging.css");

const Messaging = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [convId, setConvId] = useState(null);
  const [allConv, setAllConv] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [isMessageSend, setIsMessageSend] = useState(null);
  const [isNewConversation, setIsNewConversation] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/conversation/getAllConvByUserId?userId=${userId}`,
        utils.prepareHeaders(document.cookie)
      )
      .then((allConvResponse) => {
        setAllConv(allConvResponse.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [isNewConversation]);

  useEffect(() => {
    if (convId) {
      axios
        .get(
          `http://localhost:3001/messages/getMessagesByConvId?convId=${convId}`,
          utils.prepareHeaders(document.cookie)
        )
        .then((allMessages) => {
          setAllMessages(allMessages.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [convId, isMessageSend]);

  return (
    <main className="messaging">
      <ConversationsList
        allConv={allConv}
        setConvId={setConvId}
        setIsNewConversation={setIsNewConversation}
      />
      {convId ? (
        <section className="chat">
          {allMessages ? <MessagesFlow allMessages={allMessages} /> : <div>cc</div>}
          <PostReaction userId={userId} convId={convId} setIsMessageSend={setIsMessageSend} />
        </section>
      ) : (
        <div>conversation placeholder</div>
      )}
    </main>
  );
};

export default Messaging;
