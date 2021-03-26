import React, { useState } from "react";
import "./PostReaction.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoodreads } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

const PaperPlaneElement = <FontAwesomeIcon icon={faPaperPlane} />;
const smileElement = <FontAwesomeIcon icon={faSmile} />;
const shareElement = <FontAwesomeIcon icon={faShareAlt} />;
const gifElement = <FontAwesomeIcon icon={faGoodreads} />;

const PostReaction = ({ userId, convId, setIsMessageSend }) => {
  const [messageContent, setMessageContent] = useState(null);

  const onMessageChange = (messageChangeEvent) => {
    setMessageContent(messageChangeEvent.target.value);
  };

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    if (messageContent) {
      const messageToSend = JSON.stringify({
        messageContent: messageContent,
        convId: convId,
        userId: userId,
      });
      axios
        .post("http://localhost:3001/messages/newMessage", messageToSend, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.message === "true") {
            setIsMessageSend(true);
            setIsMessageSend(false);
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
    <div className="postReaction">
      <ul>
        <li> {shareElement} </li>
        <li> {gifElement} </li>
        <li> {smileElement} </li>
      </ul>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="sendResponse"
          placeholder="Encore une super journée..."
          onChange={onMessageChange}
        />
        <button> {PaperPlaneElement} </button>
      </form>
    </div>
  );
};

export default PostReaction;
