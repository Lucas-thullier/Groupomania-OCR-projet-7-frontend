import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProfilePicture from "../ProfilPicture/ProfilPicture";
import "./UserPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import utils from "../Utils/utils";

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
  if (userData) {
    return (
      <section className="userPanel">
        <div className="userHead">
          <ProfilePicture />
          <p>{userData.username}</p>
          <button className="addUserButton" onClick={addFriend}>
            {addFriendFont}
          </button>
        </div>
        <div className="userBody">blabla</div>
      </section>
    );
  } else {
    return <div>cc</div>;
  }
};

export default UserPage;
