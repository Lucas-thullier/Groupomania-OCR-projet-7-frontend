import React from "react";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
require("./ContactList.css");

const ContactList = ({ allFriends, setFriendId }) => {
  return allFriends ? (
    <ul className="contact">
      {allFriends.map((key, singleFriend) => (
        <li
          onClick={() => {
            setFriendId(singleFriend.User.id);
          }}
          key={key}
        >
          <ProfilPicture />
          <p>{singleFriend.User.username}</p>
        </li>
      ))}
    </ul>
  ) : (
    <div>cc</div>
  );
};

export default ContactList;
