import "./UserHead.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAltSlash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import ProfilePicture from "../ProfilPicture/ProfilPicture";
import { prepareHeaders } from "../Utils/utils";

const UserHead = ({ userData }) => {
  const addFriend = () => {
    let postData = {
      newFriendId: userData.id,
    };
    postData = JSON.stringify(postData);
    axios.post("http://localhost:3001/user/addFriend", postData, prepareHeaders(document.cookie));
  };

  const deleteFriend = () => {
    const friendId = userData.id;
    axios
      .delete(`http://localhost:3001/friends/deleteFriend?friendId=${friendId}`, prepareHeaders(document.cookie))
      .then((deletionResponse) => {
        console.log(deletionResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeProfilPicture = (submitEvent) => {
    submitEvent.preventDefault();
    const newProfilPicture = submitEvent.target.querySelector("input#newProfilPicture").files[0];
    const formData = new FormData();
    formData.append("image", newProfilPicture);
    axios.post(
      "http://localhost:3001/user/changeProfilPicture",
      formData,
      prepareHeaders(document.cookie, "multipart/form-data")
    );
  };

  return (
    <div className="userHead">
      <ProfilePicture imageUrl={userData.imageUrl} />
      <p>{userData.username}</p>
      {userData.id == localStorage.getItem("userId") ? (
        <>
          <form onSubmit={changeProfilPicture}>
            <input type="file" id="newProfilPicture" name="filename" />
            <input type="submit" />
          </form>
        </>
      ) : (
        <>
          <button className="addUserButton" onClick={addFriend}>
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
          <button className="deleteFriend" onClick={deleteFriend}>
            <FontAwesomeIcon icon={faUserAltSlash} />
          </button>
        </>
      )}
    </div>
  );
};

export default UserHead;
