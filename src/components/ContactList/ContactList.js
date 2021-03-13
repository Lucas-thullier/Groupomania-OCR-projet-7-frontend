import React, { useState, useEffect } from "react";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import axios from "axios";
require("./ContactList.css");

const ContactList = () => {
  const [allFriends, setAllFriends] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/friends/getAllFriends")
      .then((allFriendsResponse) => {
        const allFriends = allFriendsResponse.data;
        setAllFriends(allFriends);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return allFriends ? (
    <ul className="contact">
      {allFriends.map((singleFriend) => (
        <li>
          <ProfilPicture />
          <p>{singleFriend.User.username}</p>
        </li>
      ))}
    </ul>
  ) : (
    <div>coucocu</div>
  );
};

export default ContactList;
