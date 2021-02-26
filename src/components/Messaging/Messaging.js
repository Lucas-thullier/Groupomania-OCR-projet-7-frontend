import React from "react";
import PostReaction from "../PostReaction/PostReaction";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import ContactList from "../ContactList/ContactList";
require("./Messaging.css");

const Messaging = () => {
  return (
    <section className="messaging">
      <ContactList />
      <div className="chat">
        <div className="messageFlow">
          <div className="oneMessage others">
            <ProfilPicture />
            <div className="textContent">
              <p className="username">Marie</p>
              <p className="messageContent">
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              </p>
            </div>
          </div>
          <div className="oneMessage self">
            <ProfilPicture />
            <div className="textContent">
              <p className="username">julien</p>
              <p className="messageContent">
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              </p>
            </div>
          </div>
        </div>
        <PostReaction />
      </div>
    </section>
  );
};

export default Messaging;
