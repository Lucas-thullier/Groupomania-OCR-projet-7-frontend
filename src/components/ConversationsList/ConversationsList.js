import React, { useEffect, useState } from "react";
import ProfilPicture from "../ProfilPicture/ProfilPicture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../SearchBar/SearchBar";
import axios from "axios";
import utils from "../Utils/utils";
require("./ConversationsList.css");

const plusElement = <FontAwesomeIcon icon={faPlusCircle} />;

const ConversationsList = ({ allConv, setConvId, setIsNewConversation }) => {
  const searchFor = "friends";

  const changeConversationPicture = (convId) => (submitEvent) => {
    submitEvent.preventDefault();
    const newConversationPicture = submitEvent.target.querySelector("input.newConversationPicture")
      .files[0];
    const formData = new FormData();
    formData.append("image", newConversationPicture);
    formData.append("convId", convId);
    console.log(formData);
    axios
      .post(
        "http://localhost:3001/conversation/changeConversationPicture",
        formData,
        utils.prepareHeaders(document.cookie, "multipart/form-data")
      )
      .then((changePictureResponse) => {
        console.log(changePictureResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (allConv) {
    return (
      <aside className="contactPanel">
        <SearchBar searchFor={searchFor} setIsNewConversation={setIsNewConversation} />
        <ul className="contact">
          {allConv.map((singleConv, key) => (
            <li
              onClick={() => {
                setConvId(singleConv.id);
              }}
              key={key}
            >
              <form onSubmit={changeConversationPicture(singleConv.id)}>
                <input type="file" className="newConversationPicture" name="filename" />
                <input type="submit" />
              </form>
              <ProfilPicture imageUrl={singleConv.imageUrl} />
              <p>{singleConv.Users[0].username}</p>
            </li>
          ))}
        </ul>
      </aside>
    );
  } else {
    return <div>cc</div>;
  }
};

export default ConversationsList;
