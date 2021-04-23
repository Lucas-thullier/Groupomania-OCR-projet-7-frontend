import "./SingleFeedPost.css";
import PostReaction from "../PostReaction/PostReaction";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import FeedPostComments from "../FeedPostComments/FeedPostComments";
import axios from "axios";
import { prepareHeaders } from "../Utils/utils";
import { useEffect, useState } from "react";

const SingleFeedPost = ({ singlePost }) => {
  const [needRefresh, setNeedRefresh] = useState(null);
  const [comments, setComments] = useState(null);

  const handleSubmit = (messageContent) => (submitEvent) => {
    submitEvent.preventDefault();
    if (messageContent) {
      const messageToSend = JSON.stringify({
        messageContent: messageContent,
        postId: singlePost.id,
      });
      axios
        .post("http://localhost:3001/feedpost/newComment", messageToSend, prepareHeaders(document.cookie))
        .then((response) => {
          if (response.data == true) {
            setNeedRefresh(true);
            document.getElementById("sendResponse").value = "";
          } else {
            console.log("false");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/feedpost/comments?postId=${singlePost.id}`)
      .then((commentsResponse) => {
        setNeedRefresh(false);
        setComments(commentsResponse.data);
      })
      .catch((error) => console.log(error));
  }, [needRefresh]);

  return (
    <div className="singleFeedPost">
      <div className="postContent">
        <ProfilPicture imageUrl={singlePost.User.imageUrl} />
        <p className="username">{singlePost.User.username}</p>
        <p className="textContent">{singlePost.text_content}</p>
      </div>
      <PostReaction handleSubmit={handleSubmit} />
      {comments ? <FeedPostComments comments={comments} setNeedRefresh={setNeedRefresh} /> : <></>}
    </div>
  );
};

export default SingleFeedPost;
