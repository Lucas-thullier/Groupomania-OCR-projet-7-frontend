import React, { useEffect, useState } from "react";
import "./PostReaction.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoodreads } from "@fortawesome/free-brands-svg-icons";
// import Picker from "emoji-picker-react";

const PaperPlaneElement = <FontAwesomeIcon icon={faPaperPlane} />;
const smileElement = <FontAwesomeIcon icon={faSmile} />;
const shareElement = <FontAwesomeIcon icon={faShareAlt} />;
const gifElement = <FontAwesomeIcon icon={faGoodreads} />;

const PostReaction = ({ handleSubmit }) => {
  const [messageContent, setMessageContent] = useState(null);

  const onMessageChange = (messageChangeEvent) => {
    setMessageContent(messageChangeEvent.target.value);
  };

  // const toggleEmojiPicker = () => {
  //   const emojiPicker = document.querySelector(".emoji-picker-react");
  //   if (emojiPicker.style.display === "block") {
  //     emojiPicker.style.display = "none";
  //   } else {
  //     emojiPicker.style.display = "block";
  //   }
  // };

  // const pickerStyle = {
  //   position: "absolute",
  //   bottom: "5%",
  //   right: "4%",
  //   backgroundColor: "rgba(255, 255, 255, 0.08)",
  //   boxShadow: "none",
  //   border: "none",
  //   display: "none",
  // };

  // const handleEmojiPickerClick = (clickEvent, emojiObject) => {
  //   console.log(emojiObject);
  //   document.querySelector("#sendResponse").value += emojiObject.emoji;
  // };

  return (
    <div className="postReaction" onClick={(clickEvent) => clickEvent.stopPropagation()}>
      <div className="shareElement"> {shareElement} </div>
      <form method="POST" onSubmit={handleSubmit(messageContent)}>
        <input
          autoComplete="off"
          id="sendResponse"
          type="text"
          name="sendResponse"
          placeholder="Encore une super journée..."
          onChange={onMessageChange}
        />
        <button> {PaperPlaneElement} </button>
      </form>
      <ul>
        <li>
          {/* <Picker pickerStyle={pickerStyle} disableSearchBar={true} onEmojiClick={handleEmojiPickerClick} /> */}
          {smileElement}
        </li>
        <li> {gifElement} </li>
      </ul>
    </div>
  );
};

export default PostReaction;
