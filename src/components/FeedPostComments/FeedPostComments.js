import axios from "axios";
import { useEffect, useState } from "react";
import SingleComment from "../SingleComment/SingleComment";
import "./FeedPostComments.css";

const FeedPostComments = ({ postId, needRefresh, setNeedRefresh }) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/feedpost/comments?postId=${postId}`)
      .then((commentsResponse) => {
        setNeedRefresh(false);
        setComments(commentsResponse.data);
      })
      .catch((error) => console.log(error));
  }, [needRefresh]);

  return (
    <div className="commentsFeed">
      {comments ? (
        comments.map((singleComment, key) => <SingleComment comment={singleComment} key={key} setNeedRefresh={setNeedRefresh} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default FeedPostComments;
