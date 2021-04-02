import React, { useState, useEffect } from "react";
import PostReaction from "../PostReaction/PostReaction";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import ConversationsList from "../ConversationsList/ConversationsList";
import axios from "axios";
import MessagesFlow from "../MessagesFlow/MessagesFlow";
import utils from "../Utils/utils";
import ChatHeader from "../ChatHeader/ChatHeader";
require("./Messaging.css");

const Messaging = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [allConv, setAllConv] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [isMessageSend, setIsMessageSend] = useState(null);
  const [isNewConversation, setIsNewConversation] = useState(null);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isPictureChanged, setIsPictureChanged] = useState(null);

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
  }, [isNewConversation, isPictureChanged]);

  useEffect(() => {
    if (selectedConversation) {
      const convId = selectedConversation.id;
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
  }, [selectedConversation, isMessageSend]);

  return (
    <main className="messaging">
      <ConversationsList
        allConv={allConv}
        setSelectedConversation={setSelectedConversation}
        setIsNewConversation={setIsNewConversation}
      />
      {selectedConversation ? (
        <section className="chat">
          <ChatHeader
            setIsPictureChanged={setIsPictureChanged}
            isPictureChanged={isPictureChanged}
            singleConversation={selectedConversation}
          />
          <div className="chatBody">
            {allMessages ? <MessagesFlow allMessages={allMessages} /> : <div>cc</div>}
            <PostReaction
              userId={userId}
              convId={selectedConversation.id}
              setIsMessageSend={setIsMessageSend}
            />
          </div>
        </section>
      ) : (
        <div className="chatBodyPlaceholder">
          <span>Débutez une conversation avec le panel de gauche &#128172;</span>
        </div>
      )}
    </main>
  );
};

export default Messaging;
