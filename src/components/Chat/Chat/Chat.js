import axios from "axios";
import { useEffect, useState } from "react";
import { prepareHeaders } from "../../Utils/utils";
import PostReaction from "../../Shared/PostReaction/PostReaction";
import MessagesFlow from "../MessagesFlow/MessagesFlow";
import ChatHeader from "../ChatHeader/ChatHeader";
import "./Chat.css";

const Chat = ({ selectedConversation, setSelectedConversation }) => {
  const [allMessages, setAllMessages] = useState(null);
  const [isMessageSend, setIsMessageSend] = useState(null);
  const [isPictureChanged, setIsPictureChanged] = useState(null);

  useEffect(() => {
    const conversationId = selectedConversation.id;

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/message/conversationId?convId=${conversationId}`,
        prepareHeaders(document.cookie)
      )
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
        .post(`${process.env.REACT_APP_BACKEND_URL}/message/create`, messageToSend, prepareHeaders(document.cookie))
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
