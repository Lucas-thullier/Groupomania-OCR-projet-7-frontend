import { useEffect, useState } from "react";
import SingleComment from "../SingleComment/SingleComment";
import "./FeedPostComments.css";

const FeedPostComments = ({ comments, setNeedRefresh }) => {
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
    <div className="commentsFeed">
      {comments.redditComments || comments.groupoComments ? (
        <div className="switchComments">
          <button className="groupoButton" onClick={toggleCommentsSource}>
            Groupo comments
          </button>
          <button className="redditButton" onClick={toggleCommentsSource}>
            Reddit comments
          </button>
        </div>
      ) : (
        <></>
      )}

      {comments.redditComments ? (
        <div className="redditComments">
          {comments.redditComments.map((singleComment, key) => (
            <SingleComment comment={singleComment} key={key} setNeedRefresh={setNeedRefresh} />
          ))}
        </div>
      ) : (
        <></>
      )}

      {comments.groupoComments ? (
        <div className="groupoComments">
          {comments.groupoComments.map((singleComment, key) => (
            <SingleComment comment={singleComment} key={key} setNeedRefresh={setNeedRefresh} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FeedPostComments;
