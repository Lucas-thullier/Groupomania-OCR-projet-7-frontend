import axios from "axios";
import { useEffect, useState } from "react";
const utils = require("../Utils/utils");

require("./Subreddit.css");
const Subreddit = ({ submission }) => {
  const [comments, setComments] = useState(null);
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/reddit/getCommentsById?submissionId=${submission.submissionId}`,
        utils.prepareHeaders(document.cookie)
      )
      .then((commentsResponse) => {
        setComments(commentsResponse.data);
      });
  }, []);
  if (comments) {
    return (
      <div>
        <p>{submission.title}</p>
        <p>{submission.author}</p>
        {/* <p>{submission.imageUrl}</p> */}
        {submission.imageUrl.match(/(.jpg$)|(.png$)/) ? <img src={submission.imageUrl} /> : <></>}>
        {comments.map((singleComment, key) => (
          <div key={key}>
            <p>{singleComment.author}</p>
            <p>{singleComment.body}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <p>cc</p>
      </div>
    );
  }
};
export default Subreddit;
