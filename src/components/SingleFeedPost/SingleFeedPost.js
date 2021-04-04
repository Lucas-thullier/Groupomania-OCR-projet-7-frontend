import "./SingleFeedPost.css";
import PostReaction from "../PostReaction/PostReaction";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import FeedPostComments from "../FeedPostComments/FeedPostComments";
import axios from "axios";
import { prepareHeaders } from "../Utils/utils";
import { useEffect, useState } from "react";

const SingleFeedPost = ({ singlePost }) => {
  const [needRefresh, setNeedRefresh] = useState(null);

  const handleSubmit = (messageContent) => (submitEvent) => {
    submitEvent.preventDefault();
    if (messageContent) {
      const messageToSend = JSON.stringify({
        messageContent: messageContent,
        postId: singlePost.post.id,
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

  return (
    <div className="singleFeedPost">
      <div className="postContent">
        <ProfilPicture imageUrl={singlePost.friend.imageUrl} />
        <p className="username">{singlePost.friend.username}</p>
        <p className="textContent">{singlePost.post.text_content}</p>
      </div>
      <PostReaction handleSubmit={handleSubmit} />
      <FeedPostComments postId={singlePost.post.id} needRefresh={needRefresh} setNeedRefresh={setNeedRefresh} />
    </div>
  );
};

export default SingleFeedPost;
