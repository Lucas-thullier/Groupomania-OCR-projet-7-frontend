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
    axios
      .get("http://localhost:3001/reddit/getHotSubreddits", prepareHeaders(document.prepareHeaders))
      .then((submissionsListResponse) => {
        setSubmissionsList(submissionsListResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const showModal = (submission) => {
    setSubmission(submission);
    setIsModalActive(true);
  };

  const hideModal = () => {
    setIsModalActive(false);
  };

  return (
    <main className="redditFlow">
      {subredditsList ? <SubredditsNav subredditsList={subredditsList} setSubmissionsList={setSubmissionsList} /> : <></>}
      {submissionsList ? (
        <SubmissionsFlow submissionsList={submissionsList} showModal={showModal} />
      ) : (
        <div className="redditLoader">{redditElement}</div>
      )}
      <Modal show={isModalActive} handleClose={hideModal}>
        {isModalActive ? <Submission submission={submission} withComments={true} /> : <></>}
      </Modal>
    </main>
  );
};

export default Reddit;
