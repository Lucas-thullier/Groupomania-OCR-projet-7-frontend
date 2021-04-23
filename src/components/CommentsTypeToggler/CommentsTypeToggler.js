import { useEffect, useState } from "react";
import "./CommentsTypeToggler.css";

const CommentsTypeToggler = () => {
  const [toggleState, setToggleState] = useState("redditComments");

  function toggleCommentsSource() {
    return toggleState == "groupoComments" ? setToggleState("redditComments") : setToggleState("groupoComments");
  }

  useEffect(() => {
    if (document.querySelector(".redditComments") && document.querySelector(".groupoComments")) {
      if (toggleState === "redditComments") {
        document.querySelector(".redditComments").style.display = "none";
        document.querySelector(".groupoComments").style.display = "block";
      } else {
        document.querySelector(".redditComments").style.display = "block";
        document.querySelector(".groupoComments").style.display = "none";
      }
    }
  }, [toggleState]);

  return (
    <div className="commentsTypeToggler">
      <button className="groupoButton" onClick={toggleCommentsSource}>
        Groupo comments
      </button>
      <button className="redditButton" onClick={toggleCommentsSource}>
        Reddit comments
      </button>
    </div>
  );
};

export default CommentsTypeToggler;
