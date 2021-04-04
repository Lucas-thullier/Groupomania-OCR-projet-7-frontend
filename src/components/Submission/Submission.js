import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { prepareHeaders } from "../Utils/utils";
const redditElement = <FontAwesomeIcon icon={faReddit} className="redditLoaderIcon" />;
require("./Submission.css");

const Submission = ({ submission, embedContent }) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/reddit/getCommentsById?submissionId=${submission.submissionId}`,
        prepareHeaders(document.cookie)
      )
      .then((commentsResponse) => {
        setComments(commentsResponse.data);
      });
  }, []);

  if (comments) {
    return (
      <div className="modalSubmission">
        <p className="submissionTitle">{submission.title}</p>
        {submission.textContent ? <p>{submission.textContent}</p> : <></>}
        {embedContent(submission.preview)}
        <p className="submissionAuthor">
          {submission.author} in {submission.subredditNamePrefixed}
        </p>
        <div className="commentsList">
          {comments.map((singleComment, key) => (
            <div className="singleComment" key={key}>
              <p className="commentAuthor">{singleComment.author}</p>
              <p className="commentContent">{singleComment.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div className="redditLoader">{redditElement}</div>;
  }
};
export default Submission;
