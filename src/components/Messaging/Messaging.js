import React, { useState, useEffect } from "react";
import PostReaction from "../PostReaction/PostReaction";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import ContactList from "../ContactList/ContactList";
import axios from "axios";
import MessagesFlow from "../MessagesFlow/MessagesFlow";
require("./Messaging.css");

const Messaging = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [actualConv, setActualConv] = useState(null);
  const [convId, setConvId] = useState(null);
  const [allConv, setAllConv] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [isMessageSend, setIsMessageSend] = useState(null);
  // const [friendId, setFriendId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/conversation/getAllConvByUserId?userId=${userId}`)
      .then((allConvResponse) => {
        setAllConv(allConvResponse.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (convId) {
      axios
        .get(`http://localhost:3001/messages/getMessagesByConvId?convId=${convId}`)
        .then((allMessages) => {
          setAllMessages(allMessages.data);
        });
    }
  }, [convId, isMessageSend]);

  useEffect(() => {
    if (isMessageSend) {
    }
  }, [isMessageSend]);

  return (
    <section className="messaging">
      <ContactList allConv={allConv} setConvId={setConvId} />
      <div className="chat">
        {allMessages ? <MessagesFlow allMessages={allMessages} /> : <div>cc</div>}
        <PostReaction userId={userId} convId={convId} setIsMessageSend={setIsMessageSend} />
      </div>
    </section>
  );
};

export default Messaging;
