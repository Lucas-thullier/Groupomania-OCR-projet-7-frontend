import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { prepareHeaders } from "../Utils/utils";
import PostReaction from "../PostReaction/PostReaction";
import FeedPostComments from "../FeedPostComments/FeedPostComments";
import CommentsTypeToggler from "../CommentsTypeToggler/CommentsTypeToggler";
const redditElement = <FontAwesomeIcon icon={faReddit} className="redditLoaderIcon" />;
require("./Submission.css");

const Submission = ({ submission, showModal, withComments, withPostReaction }) => {
  const [comments, setComments] = useState(null);

  const handleSubmit = (messageContent) => (submitEvent) => {
    submitEvent.preventDefault();
    const dataToCreateRedditComment = {
      textContent: messageContent,
      submissionId: submission.submissionId,
    };
    axios
      .post("http://localhost:3001/reddit/createRedditComment", dataToCreateRedditComment, prepareHeaders(document.cookie))
      .then(() => {
        console.log("ok");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (withComments) {
      axios
        .get(
          `http://localhost:3001/reddit/getCommentsById?submissionId=${submission.submissionId}`,
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

  return (
    <>
      <div
        className="singlePost"
        onClick={() => {
          showModal(submission);
        }}
      >
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
        {withPostReaction ? <PostReaction handleSubmit={handleSubmit} /> : <></>}
      </div>

      {withComments && comments ? <CommentsTypeToggler /> : <></>}
      {withComments && comments ? (
        Object.keys(comments).map((comment, key) => <FeedPostComments key={key} comments={comments[comment]} />)
      ) : (
        <></>
      )}
    </>
  );
};
export default Submission;
