import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FriendList.css";
import { prepareHeaders } from "../Utils/utils";
import ProfilePicture from "../ProfilPicture/ProfilPicture";
import { useHistory } from "react-router";

const FriendList = ({ userId, setAmIFriendWithHim }) => {
  const [friendList, setFriendList] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (document.querySelector(".friendList")) {
      document.querySelector(".friendList").style.transform = "translateX(0)";
    }
  }, [friendList]);

  useEffect(() => {
    let queryUrl;
    if (userId) {
      queryUrl = `${process.env.REACT_APP_BACKEND_URL}/user/${userId}/friends`;
    } else {
      queryUrl = `${process.env.REACT_APP_BACKEND_URL}/user/id/friends`;
    }
    axios
      .get(queryUrl, prepareHeaders(document.cookie))
      .then((friendsResponse) => {
        setFriendList(friendsResponse.data);

        if (friendList) {
          friendList.forEach((friend) => {
            if (friend.id == localStorage.getItem("userId")) {
              setAmIFriendWithHim(true);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleClick = (userId) => () => {
    history.push(`/userPage/${userId}`);
  };

  if (Array.isArray(friendList) && friendList.length != 0) {
    return (
      <fieldset className="friendList">
        <legend>Amis</legend>
        {friendList.map((singleFriend, key) => (
          <div className="singleFriend" key={key} onClick={handleClick(singleFriend.id)}>
            <ProfilePicture imageUrl={singleFriend.imageUrl} />
            {singleFriend.username}
          </div>
        ))}
      </fieldset>
    );
  } else {
    return <></>;
  }
};

export default FriendList;
