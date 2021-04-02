import axios from "axios";
import { useEffect, useState } from "react";
import utils from "../Utils/utils";
import Modal from "../Modal/Modal";
import Subreddit from "../Subreddit/Subreddit";
require("./Reddit.css");

const Reddit = () => {
  const [hotSubreddits, setHotSubreddits] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/reddit/getHotSubreddits",
        utils.prepareHeaders(document.prepareHeaders)
      )
      .then((hotSubredditsResponse) => {
        setHotSubreddits(hotSubredditsResponse.data);
      });
  }, []);

  const showModal = (submission) => (clickEvent) => {
    setSubmission(submission);
    setIsModalActive(true);
  };

  const hideModal = () => {
    setIsModalActive(false);
  };

  const stopPropagation = (clickEvent) => {
    clickEvent.stopPropagation();
  };

  if (hotSubreddits) {
    return (
      <main className="redditFlow">
        {hotSubreddits.map((singleSubreddit, key) => (
          <div className="singleSubreddit" key={key} onClick={showModal(singleSubreddit)}>
            <p className="submissionTitle">
              <a href={singleSubreddit.url} onClick={stopPropagation} target="_blank">
                {singleSubreddit.title}
              </a>
            </p>
            <p id="subredditAuthor">{singleSubreddit.author}</p>
            {singleSubreddit.imageUrl.match(/(.jpg$)|(.png$)/) ? (
              <img src={singleSubreddit.imageUrl} />
            ) : (
              <></>
            )}
          </div>
        ))}
        <Modal show={isModalActive} handleClose={hideModal}>
          {isModalActive ? <Subreddit submission={submission} /> : <></>}
        </Modal>
      </main>
    );
  } else {
    return <div>Reddit</div>;
  }
};

export default Reddit;
