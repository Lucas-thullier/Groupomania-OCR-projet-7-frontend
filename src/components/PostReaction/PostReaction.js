import React from "react";
import "./PostReaction.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoodreads } from "@fortawesome/free-brands-svg-icons";

const PaperPlaneElement = <FontAwesomeIcon icon={faPaperPlane} />;
const smileElement = <FontAwesomeIcon icon={faSmile} />;
const shareElement = <FontAwesomeIcon icon={faShareAlt} />;
const gifElement = <FontAwesomeIcon icon={faGoodreads} />;

class PostReaction extends React.Component {
  render() {
    return (
      <div className="postReaction">
        <ul>
          <li> {shareElement} </li>
          <li> {gifElement} </li>
          <li> {smileElement} </li>
        </ul>
        <form method="POST">
          <input type="text" name="sendResponse" placeholder="Encore une super journée..." />
          <button> {PaperPlaneElement} </button>
        </form>
      </div>
    );
  }
}

export default PostReaction;
