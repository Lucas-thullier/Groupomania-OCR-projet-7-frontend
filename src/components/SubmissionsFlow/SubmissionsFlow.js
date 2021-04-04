import axios from "axios";
import { useEffect } from "react";
import GroupoComments from "../GroupoComments/GroupoComments";
import PostReaction from "../PostReaction/PostReaction";
import { prepareHeaders } from "../Utils/utils";

require("./SubmissionsFlow.css");

const SubmissionsFlow = ({ submissionsList, embedContent, showModal }) => {
  useEffect(() => {
    document.querySelectorAll(".singlePost").forEach((singlePost) => {
      singlePost.style.transform = "translateX(0)";
      singlePost.style.transition = "transform 500ms ease-in-out";
    });
  }, []);

  const handleSubmit = (messageContent) => (submitEvent) => {
    submitEvent.preventDefault();
    // submitEvent.target[0].value,
    // submitEvent.target[0]
    // axios.post
    const dataToCreateRedditComment = {
      textContent: messageContent,
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

  return (
    <section className="submissionsFlow">
      {submissionsList.map((singleSubmission, key) => (
        <div className={key % 2 == 0 ? "singlePost even" : "singlePost odd"} key={key} onClick={showModal(singleSubmission)}>
          <div className="submissionTitle">
            <a href={singleSubmission.url} onClick={(clickEvent) => clickEvent.stopPropagation()} target="_blank">
              {singleSubmission.title}
            </a>
            {singleSubmission.textContent ? <p>{singleSubmission.textContent}</p> : <></>}
          </div>
          {embedContent(singleSubmission.preview)}
          <p id="subredditAuthor">
            {singleSubmission.author} in {singleSubmission.subredditNamePrefixed}
          </p>
          <PostReaction handleSubmit={handleSubmit} />
          <GroupoComments />
        </div>
      ))}
    </section>
  );
};

export default SubmissionsFlow;
