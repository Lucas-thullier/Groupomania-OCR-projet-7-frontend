import React from "react";
import "./FeedPost.css";
import PostReaction from "../PostReaction/PostReaction";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import testPicture from "./1.jpg";

class FeedPost extends React.Component {
  render() {
    return (
      <div className="postContainer">
        <div className="postContent">
          <ProfilPicture />
          <p className="username">Sarah</p>
          <p className="textContent">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            ultricies sagittis odio. Duis metus enim, tempus a mollis ut, tempus
            eget justo. Morbi nec lectus nibh. Donec auctor vulputate risus a
            consectetur. Mauris a interdum velit, a viverra tortor. Morbi
            efficitur scelerisque augue vitae congue. Vestibulum blandit massa
            ut porttitor imperdiet. Sed tincidunt dolor vel lectus ornare
            tristique. Mauris est enim, elementum sit amet mi id, mattis dapibus
            tellus.
          </p>
        </div>
        <PostReaction />
      </div>
    );
  }
}

export default FeedPost;
