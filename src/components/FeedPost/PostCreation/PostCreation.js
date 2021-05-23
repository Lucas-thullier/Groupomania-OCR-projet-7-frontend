import axios from "axios";
import { prepareHeaders } from "../../Utils/utils";
import { useEffect } from "react";
import "./PostCreation.css";

const PostCreation = ({ setIsNewPost }) => {
  useEffect(() => {
    if (document.querySelector(".postCreation")) {
      document.querySelector(".postCreation").style.transform = "translateY(0)";
    }
  }, []);

  const createNewPost = (submitEvent) => {
    submitEvent.preventDefault();

    const dataForCreateNewPost = {
      textContent: submitEvent.target[0].value,
    };

    console.log(dataForCreateNewPost);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/feedpost/create`, dataForCreateNewPost, prepareHeaders(document.cookie))
      .then((creationResponse) => {
        if (creationResponse.status === 200) {
          setIsNewPost(true);
          document.querySelector("textarea[name=newPostContent]").value = "";
        }
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
