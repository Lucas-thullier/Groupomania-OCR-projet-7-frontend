import { useEffect } from "react";

require("./SubmissionsFlow.css");

const SubmissionsFlow = ({ submissionsList, embedContent, showModal }) => {
  useEffect(() => {
    document.querySelectorAll(".singlePost").forEach((singlePost) => {
      singlePost.style.transform = "translateX(0)";
      singlePost.style.transition = "transform 500ms ease-in-out";
    });
  }, []);
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
          <div className="comments">
            <div>From reddit</div>
            <div>From groupomania</div>
          </div>
        </div>
      ))}
    </section>
  );
};
export default SubmissionsFlow;
