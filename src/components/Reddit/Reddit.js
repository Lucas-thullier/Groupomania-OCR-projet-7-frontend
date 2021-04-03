import axios from "axios";
import { useEffect, useState } from "react";
import { prepareHeaders } from "../Utils/utils";
import Modal from "../Modal/Modal";
import Submission from "../Submission/Submission";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import SubredditsNav from "../SubredditsNav/SubredditsNav";
import SubmissionsFlow from "../SubmissionsFlow/SubmissionsFlow";
require("./Reddit.css");

const redditElement = <FontAwesomeIcon icon={faReddit} className="redditLoaderIcon" />;
const Reddit = () => {
  const [submissionsList, setSubmissionsList] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [submission, setSubmission] = useState(null);
  const [subredditsList, setSubredditsList] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/reddit/getHotSubreddits", prepareHeaders(document.prepareHeaders)).then((submissionsListResponse) => {
      setSubmissionsList(submissionsListResponse.data);
    });
  }, []);

  const showModal = (submission) => (clickEvent) => {
    setSubmission(submission);
    setIsModalActive(true);
  };

  const hideModal = () => {
    setIsModalActive(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/reddit/getPopularSubreddits", prepareHeaders(document.cookie))
      .then((popularSubreddit) => {
        setSubredditsList(popularSubreddit.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const embedContent = (embedContent) => {
    if (!embedContent) {
      return <></>;
    } else if (embedContent.reddit_video_preview) {
      return (
        <video width="320" height="320" controls>
          <source src={embedContent.reddit_video_preview.fallback_url} />
        </video>
      );
    } else if (embedContent.images) {
      return (
        <div className="divImg">
          <img src={embedContent.images[0].source.url} />
        </div>
      );
    }
  };

  return (
    <main className="redditFlow">
      {subredditsList ? <SubredditsNav subredditsList={subredditsList} setSubmissionsList={setSubmissionsList} /> : <></>}
      {submissionsList ? <SubmissionsFlow submissionsList={submissionsList} embedContent={embedContent} showModal={showModal} /> : <div className="redditLoader">{redditElement}</div>}
      <Modal show={isModalActive} handleClose={hideModal}>
        {isModalActive ? <Submission submission={submission} embedContent={embedContent} /> : <></>}
      </Modal>
    </main>
  );
};

export default Reddit;
