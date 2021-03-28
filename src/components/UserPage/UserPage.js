import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProfilePicture from "../ProfilPicture/ProfilPicture";
import "./UserPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import utils from "../Utils/utils";
import FriendList from "../FriendList/FriendList";

const addFriendFont = <FontAwesomeIcon icon={faUserPlus} />;

const UserPage = () => {
  let { id } = useParams();
  const [userData, setUserData] = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/user/userById?userId=${id}`,
        utils.prepareHeaders(document.cookie)
      )
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const addFriend = () => {
    let postData = {
      userId: localStorage.getItem("userId"),
      newFriendId: id,
    };
    postData = JSON.stringify(postData);
    axios.post(
      "http://localhost:3001/user/addFriend",
      postData,
      utils.prepareHeaders(document.cookie)
    );
  };

  const changeProfilPicture = (submitEvent) => {
    submitEvent.preventDefault();
    const newProfilPicture = submitEvent.target.querySelector("input#newProfilPicture").files[0];
    const formData = new FormData();
    formData.append("image", newProfilPicture);
    console.log(formData);
    axios.post(
      "http://localhost:3001/user/changeProfilPicture",
      formData,
      utils.prepareHeaders(document.cookie, "multipart/form-data")
    );
  };

  if (userData) {
    return (
      <section className="userPanel">
        <div className="userHead">
          <ProfilePicture imageUrl={userData.imageUrl} />
          <p>{userData.username}</p>
          {userData.id == localStorage.getItem("userId") ? (
            <></>
          ) : (
            <button className="addUserButton" onClick={addFriend}>
              {addFriendFont}
            </button>
          )}
          <form onSubmit={changeProfilPicture}>
            <input type="file" id="newProfilPicture" name="filename" />
            <input type="submit" />
          </form>
        </div>
        <div className="userBody">
          <FriendList />
        </div>
      </section>
    );
  } else {
    return <div>cc</div>;
  }
};

export default UserPage;
