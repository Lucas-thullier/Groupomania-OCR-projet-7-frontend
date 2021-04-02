import axios from "axios";
import ProfilePicture from "../ProfilPicture/ProfilPicture";
import SearchBar from "../SearchBar/SearchBar";
const utils = require("../Utils/utils");

require("./ConversationParams.css");

const ConversationParams = ({ convId, setIsPictureChanged, conversation }) => {
  const searchFor = "friends";

  const changeConversationPicture = (submitEvent) => {
    submitEvent.preventDefault();
    const newConversationPicture = submitEvent.target.querySelector("input.newConversationPicture")
      .files[0];
    const formData = new FormData();
    formData.append("image", newConversationPicture);
    formData.append("convId", convId);
    axios
      .post(
        "http://localhost:3001/conversation/changeConversationPicture",
        formData,
        utils.prepareHeaders(document.cookie, "multipart/form-data")
      )
      .then((changePictureResponse) => {
        setIsPictureChanged(true);
        console.log(changePictureResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="conversationParams">
      <div className="paramsHeader">
        <ProfilePicture imageUrl={conversation.imageUrl} />
        <p>
          {conversation.name ? (
            <span> conversation.name</span>
          ) : (
            conversation.Users.map((user, key) => <span key={key}>{user.username}</span>)
          )}
        </p>
      </div>
      <div className="paramsBody">
        <fieldset>
          <legend>Ajouter un utilisateur à la conversation</legend>
          <SearchBar searchFor={searchFor} />
        </fieldset>
        <fieldset>
          <legend>Photo de conversation</legend>
          <form onSubmit={changeConversationPicture}>
            <input type="file" className="newConversationPicture" name="filename" />
            <input type="submit" />
          </form>
        </fieldset>
        <button className="deleteConv">Supprimer la conversation</button>
      </div>
    </div>
  );
};

export default ConversationParams;
