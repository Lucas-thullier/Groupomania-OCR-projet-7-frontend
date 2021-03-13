import React from "react";
import "./Home.css";
import FeedPost from "../FeedPost/FeedPost";

class Home extends React.Component {
  render() {
    return (
      <section className="home">
        <FeedPost />
        <FeedPost />
      </section>
    );
  }
}

export default Home;
