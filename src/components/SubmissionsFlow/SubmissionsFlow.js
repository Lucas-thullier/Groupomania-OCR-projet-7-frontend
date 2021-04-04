import Submission from "../Submission/Submission";
require("./SubmissionsFlow.css");

const SubmissionsFlow = ({ submissionsList, showModal }) => {
  return (
    <section className="submissionsFlow">
      {submissionsList.map((singleSubmission, key) => (
        <Submission withPostReaction={false} submission={singleSubmission} showModal={showModal} key={key} />
      ))}
    </section>
  );
};

export default SubmissionsFlow;
