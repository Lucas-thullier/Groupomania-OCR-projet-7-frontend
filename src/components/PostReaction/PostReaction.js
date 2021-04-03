import React, { useEffect, useState } from "react";
import "./PostReaction.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoodreads } from "@fortawesome/free-brands-svg-icons";
import { prepareHeaders } from "../Utils/utils";
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
      });
      axios
        .post("http://localhost:3001/messages/newMessage", messageToSend, prepareHeaders(document.cookie))
        .then((response) => {
          if (response.data.message === "true") {
            setIsMessageSend(true);
            setIsMessageSend(false);
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
    <div className="postReaction">
      <div className="shareElement"> {shareElement} </div>
      <form method="POST" onSubmit={handleSubmit}>
        <input autoComplete="off" id="sendResponse" type="text" name="sendResponse" placeholder="Encore une super journée..." onChange={onMessageChange} />
        <button> {PaperPlaneElement} </button>
      </form>
      <ul>
        <li> {smileElement} </li>
        <li> {gifElement} </li>
      </ul>
    </div>
  );
};

export default PostReaction;
