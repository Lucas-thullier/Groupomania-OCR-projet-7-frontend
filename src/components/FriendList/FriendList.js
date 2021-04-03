import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FriendList.css";
import { prepareHeaders } from "../Utils/utils";
import ProfilePicture from "../ProfilPicture/ProfilPicture";

const FriendList = () => {
  const [friendList, setFriendList] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/user/getFriendsByUserId", prepareHeaders(document.cookie))
      .then((friendsResponse) => {
        setFriendList(friendsResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (Array.isArray(friendList) && friendList.length != 0) {
    return (
      <section className="friendList">
        <h1>Mes amis</h1>
        {friendList.map((singleFriend, key) => (
          <div className="singleFriend" key={key}>
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
