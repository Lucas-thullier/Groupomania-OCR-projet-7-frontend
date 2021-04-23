import axios from "axios";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { prepareHeaders } from "../Utils/utils";
import PostReaction from "../PostReaction/PostReaction";
import MessagesFlow from "../MessagesFlow/MessagesFlow";
import ChatHeader from "../ChatHeader/ChatHeader";
import { CSSTransition } from "react-transition-group";

require("./Chat.css");

const Chat = ({ selectedConversation, setSelectedConversation }) => {
  const [allMessages, setAllMessages] = useState(null);
  const [isMessageSend, setIsMessageSend] = useState(null);
  const [isPictureChanged, setIsPictureChanged] = useState(null);

  useEffect(() => {
    const conversationId = selectedConversation.id;
    axios
      .get(`http://localhost:3001/messages/getMessagesByConvId?convId=${conversationId}`, prepareHeaders(document.cookie))
      .then((allMessages) => {
        setAllMessages(allMessages.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [isMessageSend, selectedConversation]);

  const handleSubmit = (messageContent) => (submitEvent) => {
    submitEvent.preventDefault();
    if (messageContent) {
      const messageToSend = JSON.stringify({
        messageContent: messageContent,
        convId: selectedConversation.id,
      });
      axios
        .post("http://localhost:3001/messages/newMessage", messageToSend, prepareHeaders(document.cookie))
        .then((response) => {
          if (response.data.message === "true") {
            setIsMessageSend(true);
            document.getElementById("sendResponse").value = "";
          } else {
            setIsMessageSend(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <section className="chat">
      <ChatHeader
        setIsPictureChanged={setIsPictureChanged}
        isPictureChanged={isPictureChanged}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
      />

      <div className="chatBody">
        {allMessages ? <MessagesFlow allMessages={allMessages} /> : <></>}
        <PostReaction convId={selectedConversation.id} setIsMessageSend={setIsMessageSend} handleSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default Chat;
