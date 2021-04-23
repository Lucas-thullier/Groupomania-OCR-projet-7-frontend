import axios from "axios";
import { useEffect, useState } from "react";
import PostCreation from "../PostCreation/PostCreation";
import SingleFeedPost from "../SingleFeedPost/SingleFeedPost";
import { prepareHeaders } from "../Utils/utils";
import "./FeedPost.css";

const FeedPost = () => {
  const [feedposts, setFeedPosts] = useState(null);
  const [isNewPost, setIsNewPost] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/feedpost/getFeedPost", prepareHeaders(document.cookie))
      .then((feedPostResponse) => {
        setFeedPosts(feedPostResponse.data);
        setIsNewPost(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isNewPost]);

  return (
    <section className="feedPost">
      <PostCreation setIsNewPost={setIsNewPost} />
      {feedposts ? feedposts.map((singlePost, key) => <SingleFeedPost singlePost={singlePost} key={key} />) : <></>}
    </section>
  );
};

export default FeedPost;
