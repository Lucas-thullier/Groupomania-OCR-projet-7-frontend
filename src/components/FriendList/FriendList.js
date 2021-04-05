import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FriendList.css";
import { prepareHeaders } from "../Utils/utils";
import ProfilePicture from "../ProfilPicture/ProfilPicture";
import { useHistory } from "react-router";

const FriendList = ({ userId }) => {
  const [friendList, setFriendList] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let queryUrl;
    if (userId) {
      queryUrl = `http://localhost:3001/user/getFriendsByUserId?userId=${userId}`;
    } else {
      queryUrl = "http://localhost:3001/user/getFriendsByUserId";
    }
    axios
      .get(queryUrl, prepareHeaders(document.cookie))
      .then((friendsResponse) => {
        setFriendList(friendsResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = (userId) => () => {
    history.push(`/userPage/${userId}`);
  };

  if (Array.isArray(friendList) && friendList.length != 0) {
    return (
      <section className="friendList">
        <h1>Amis</h1>
        {friendList.map((singleFriend, key) => (
          <div className="singleFriend" key={key} onClick={handleClick(singleFriend.id)}>
            <ProfilePicture imageUrl={singleFriend.imageUrl} />
            {singleFriend.username}
          </div>
        ))}
      </section>
    );
  } else {
    return <div>no</div>;
  }
  // return <section className="friendList"></section>;
};

export default FriendList;
