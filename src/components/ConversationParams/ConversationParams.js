import axios from "axios";
import ProfilePicture from "../ProfilPicture/ProfilPicture";
import SearchBar from "../SearchBar/SearchBar";
import { prepareHeaders } from "../Utils/utils";
import "./ConversationParams.css";

const ConversationParams = ({ convId, setIsPictureChanged, conversation }) => {
  const changeConversationPicture = (submitEvent) => {
    submitEvent.preventDefault();
    const newConversationPicture = submitEvent.target.querySelector("input.newConversationPicture").files[0];
    const formData = new FormData();
    formData.append("image", newConversationPicture);
    formData.append("convId", convId);

    axios
      .post(
        "http://localhost:3001/conversation/changeConversationPicture",
        formData,
        prepareHeaders(document.cookie, "multipart/form-data")
      )
      .then((changePictureResponse) => {
        setIsPictureChanged(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const leaveConversation = (conversationId) => (clickEvent) => {
    axios
      .put(
        "http://localhost:3001/conversation/leaveConversation",
        { conversationId: conversationId },
        prepareHeaders(document.cookie)
      )
      .then((leaveResponse) => {
        console.log(leaveResponse);
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
            conversation.Users.map((user, key) => <span key={key}>{user.username} </span>)
          )}
        </p>
      </div>
      <div className="paramsBody">
        <fieldset>
          <legend>Ajouter un utilisateur à la conversation</legend>
          <SearchBar />
        </fieldset>
        <fieldset>
          <legend>Photo de conversation</legend>
          <form onSubmit={changeConversationPicture}>
            <input type="file" className="newConversationPicture" name="filename" />
            <input type="submit" />
          </form>
        </fieldset>
        <button className="deleteConv" onClick={leaveConversation(conversation.id)}>
          Supprimer la conversation
        </button>
      </div>
    </div>
  );
};

export default ConversationParams;
