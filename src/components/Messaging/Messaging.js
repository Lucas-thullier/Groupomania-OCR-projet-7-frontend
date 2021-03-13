import React, { useState, useEffect } from "react";
import PostReaction from "../PostReaction/PostReaction";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import ContactList from "../ContactList/ContactList";
import axios from "axios";
require("./Messaging.css");

const Messaging = () => {
  const [allMessages, setAllMessages] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/conversation")
      .then((conversationResponse) => {
        const conversationMessages = conversationResponse.data;
        setAllMessages(conversationMessages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return allMessages ? (
    <section className="messaging">
      <ContactList />
      <div className="chat">
        <div className="messageFlow">
          {allMessages.map((singleMessage) => (
            <div className="oneMessage self">
              {/* self doit etre rendu dynamique en fonction de la personne co */}
              <ProfilPicture />
              <div className="textContent">
                <p className="username">{singleMessage.User.username}</p>
                <p className="messageContent">{singleMessage.text_content}</p>
              </div>
            </div>
          ))}
        </div>
        <PostReaction />
      </div>
    </section>
  ) : (
    <div>coucou</div>
  );
};

export default Messaging;
