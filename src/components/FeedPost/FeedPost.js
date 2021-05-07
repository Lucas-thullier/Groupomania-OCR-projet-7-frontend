import axios from "axios";
import { useEffect, useState } from "react";
import PostCreation from "../PostCreation/PostCreation";
import SingleFeedPost from "../SingleFeedPost/SingleFeedPost";
import { prepareHeaders } from "../Utils/utils";
import "./FeedPost.css";

const FeedPost = () => {
  const [feedposts, setFeedPosts] = useState([]);
  const [isNewPost, setIsNewPost] = useState(null);
  const [offset, setOffset] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(undefined);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/feedpost/user?offset=${offset}`, prepareHeaders(document.cookie))
      .then((feedPostResponse) => {
        setFeedPosts(feedposts.concat(feedPostResponse.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isNewPost, offset]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollPosition(window.pageYOffset);
    });
  });

  useEffect(() => {
    setWindowHeight(document.documentElement.scrollHeight - document.documentElement.clientHeight);
  });

  useEffect(() => {
    if (windowHeight != 0 && scrollPosition == windowHeight) {
      const temporaryOffset = offset;
      setOffset(offset + 5);
    }
  }, [scrollPosition]);

  return (
    <section className="feedPost">
      <PostCreation setIsNewPost={setIsNewPost} />
      {feedposts.length > 0 ? feedposts.map((singlePost, key) => <SingleFeedPost singlePost={singlePost} key={key} />) : <></>}
    </section>
  );
};

export default FeedPost;
