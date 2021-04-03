import axios from "axios";
import { useEffect, useState } from "react";
import { prepareHeaders } from "../Utils/utils";
import PostReaction from "../PostReaction/PostReaction";
import MessagesFlow from "../MessagesFlow/MessagesFlow";
import ChatHeader from "../ChatHeader/ChatHeader";
require("./Chat.css");

const Chat = ({ selectedConversation }) => {
  const [allMessages, setAllMessages] = useState(null);
  const [isMessageSend, setIsMessageSend] = useState(null);
  const [isPictureChanged, setIsPictureChanged] = useState(null);

  useEffect(() => {
    const convId = selectedConversation.id;
    axios
      .get(`http://localhost:3001/messages/getMessagesByConvId?convId=${convId}`, prepareHeaders(document.cookie))
      .then((allMessages) => {
        setAllMessages(allMessages.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [isMessageSend]);

  return (
    <section className="chat">
      <ChatHeader setIsPictureChanged={setIsPictureChanged} isPictureChanged={isPictureChanged} singleConversation={selectedConversation} />
      <div className="chatBody">
        {allMessages ? <MessagesFlow allMessages={allMessages} /> : <></>}
        <PostReaction convId={selectedConversation.id} setIsMessageSend={setIsMessageSend} />
      </div>
    </section>
  );
};

export default Chat;
