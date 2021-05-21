import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { prepareHeaders } from "../Utils/utils";
import PostReaction from "../PostReaction/PostReaction";
import FeedPostComments from "../FeedPostComments/FeedPostComments";
const redditElement = <FontAwesomeIcon icon={faReddit} className="redditLoaderIcon" />;
require("./Submission.css");

const Submission = ({ submission, showModal, withComments }) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (withComments) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/reddit/comment/id?submissionId=${submission.submissionId}`,
          prepareHeaders(document.cookie)
        )
        .then((commentsResponse) => {
          setComments(commentsResponse.data);
        });
    }
  }, [withComments]);

  function embedContent(embedContent) {
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
  }

  const handleClickOnPost = () => {
    if (!document.querySelector(".modal-main > .singlePost")) {
      showModal(submission);
    }
  };

  return (
    <>
      <div className="singlePost" onClick={handleClickOnPost}>
        <div className="submissionTitle">
          <a href={submission.url} onClick={(clickEvent) => clickEvent.stopPropagation()} target="_blank">
            {submission.title}
          </a>
          {submission.textContent ? <p>{submission.textContent}</p> : <></>}
        </div>

        {embedContent(submission.preview)}

        <p id="submissionAuthor">
          {submission.author} in {submission.subredditNamePrefixed}
        </p>
      </div>

      {comments ? <FeedPostComments comments={comments} /> : <></>}
    </>
  );
};
export default Submission;
