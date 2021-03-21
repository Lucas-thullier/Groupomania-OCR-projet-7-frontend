import React, { useState, useEffect } from "react";
import PostReaction from "../PostReaction/PostReaction";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import ContactList from "../ContactList/ContactList";
import axios from "axios";
require("./Messaging.css");

const Messaging = () => {
  const [allFriends, setAllFriends] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [actualConv, setActualConv] = useState(null);
  const [convId, setConvId] = useState(null);
  const [friendId, setFriendId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/friends/getAllFriends?userId=${userId}`)
      .then((allFriendsResponse) => {
        setAllFriends(allFriendsResponse.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (friendId) {
      axios
        .get(
          `http://localhost:3001/conversation/byUserAndFriend?userId=${userId}&friendId=${friendId}`
        )
        .then((conversationResponse) => {
          setConvId(conversationResponse.data.convId);

          setActualConv(conversationResponse.data.messagesData);
        });
    }
  }, [friendId]);

  return (
    <section className="messaging">
      <ContactList allFriends={allFriends} setFriendId={setFriendId} />
      <div className="chat">
        <div className="messageFlow">
          {actualConv ? (
            actualConv.map((key, singleMessage) => (
              <div key={key} className="oneMessage self">
                <ProfilPicture />
                <div className="textContent">
                  <p className="username">{singleMessage.User.username}</p>
                  <p className="messageContent">{singleMessage.text_content}</p>
                </div>
              </div>
            ))
          ) : (
            <div>cc</div>
          )}
        </div>
        <PostReaction userId={userId} convId={convId} />
      </div>
    </section>
  );
};

export default Messaging;
