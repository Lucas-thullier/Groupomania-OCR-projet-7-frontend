import axios from "axios";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { prepareHeaders } from "../Utils/utils";
import PostReaction from "../PostReaction/PostReaction";
import MessagesFlow from "../MessagesFlow/MessagesFlow";
import ChatHeader from "../ChatHeader/ChatHeader";
import { CSSTransition } from "react-transition-group";

require("./Chat.css");

const Chat = ({ selectedConversation }) => {
  const [allMessages, setAllMessages] = useState(null);
  const [isMessageSend, setIsMessageSend] = useState(null);
  const [isPictureChanged, setIsPictureChanged] = useState(null);
  const [switchConversations, setSwitchConversations] = useState(false);

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

  useEffect(() => {
    setSwitchConversations(true);
  }, []);

  // useEffect(() => {});

  const actualChat = useRef(null);

  const deleteOnExit = () => {
    console.log("cc");
    // actualChat.current = document.querySelector(".chat");
    console.log(actualChat);
    actualChat.current.remove();
    // setSwitchConversations(false);
  };

  return (
    // <div>
    <CSSTransition
      in={switchConversations}
      timeout={400}
      classNames="chat"
      // unmountOnExit
      // exit={false}
      onExit={() => {
        console.log("cc");
      }}
    >
      <section className="chat">
        <ChatHeader setIsPictureChanged={setIsPictureChanged} isPictureChanged={isPictureChanged} singleConversation={selectedConversation} />
        <div className="chatBody">
          {allMessages ? <MessagesFlow allMessages={allMessages} /> : <></>}
          <PostReaction convId={selectedConversation.id} setIsMessageSend={setIsMessageSend} />
        </div>
      </section>
    </CSSTransition>
    // </div>
  );
};

export default Chat;
