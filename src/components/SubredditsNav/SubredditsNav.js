import axios from "axios";
import { prepareHeaders } from "../Utils/utils";
require("./SubredditsNav.css");

const SubredditsNav = ({ subredditsList, setSubmissionsList }) => {
  const loadSubreddit = (subredditId) => (clickEvent) => {
    setSubmissionsList(null);
    axios
      .get(`http://localhost:3001/reddit/getSubreddit?subredditId=${subredditId}`, prepareHeaders(document.cookie))
      .then((subreddit) => {
        setSubmissionsList(subreddit.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className="subredditsNav">
      {subredditsList.map((singleSubreddit, key) => (
        <div className="singleSubreddit" key={key} onClick={loadSubreddit(singleSubreddit.displayName)}>
          {singleSubreddit.displayNamePrefixed}
        </div>
      ))}
    </nav>
  );
};
export default SubredditsNav;
