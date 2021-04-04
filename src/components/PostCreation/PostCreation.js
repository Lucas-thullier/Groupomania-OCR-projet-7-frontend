import axios from "axios";
import { prepareHeaders } from "../Utils/utils";
import "./PostCreation.css";

const PostCreation = () => {
  const createNewPost = (submitEvent) => {
    submitEvent.preventDefault();

    const dataForCreateNewPost = {
      textContent: submitEvent.target[0].value,
      //todo mettre pour photos
    };

    axios
      .post("http://localhost:3001/feedpost/createFeedPost", dataForCreateNewPost, prepareHeaders(document.cookie))
      .then((creationResponse) => {
        console.log("cc");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <fieldset className="postCreation">
      <legend>Quoi de neuf ?</legend>
      <form method="POST" onSubmit={createNewPost}>
        <textarea name="newPostContent" type="text" maxLength="500" />
        <input type="submit" value="Envoyer" />
      </form>
    </fieldset>
  );
};

export default PostCreation;