import axios from "axios";
import { useEffect, useState } from "react";
import ProfilePicture from "../ProfilPicture/ProfilPicture";
import SearchBar from "../SearchBar/SearchBar";
import utils from "../Utils/utils";
import Modal from "../Modal/Modal";
import ConversationParams from "../ConversationParams/ConversationParams";
require("./ChatHeader.css");

const ConversationHeader = ({ singleConversation, setIsPictureChanged, isPictureChanged }) => {
  const [selectedConversation, setSelectedConversation] = useState(singleConversation);
  const [isModalActive, setIsModalActive] = useState(false);

  const showModal = (clickEvent) => {
    setIsModalActive(true);
  };

  const hideModal = () => {
    setIsModalActive(false);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/conversation/getConversationbyId?id=${selectedConversation.id}`,
        utils.prepareHeaders(document.cookie)
      )
      .then((singleConv) => {
        setSelectedConversation(singleConv.data);
      });
  }, [isPictureChanged]);

  if (selectedConversation) {
    return (
      <div className="chatHeader">
        <div className="conversationInfo">
          {/* <p>{conversationName}</p> */}
          <div>
            {selectedConversation.name
              ? selectedConversation.name
              : selectedConversation.Users.map((user, key) => <div key={key}>{user.username}</div>)}
          </div>
          <button onClick={showModal}>bouton</button>
          <Modal show={isModalActive} handleClose={hideModal}>
            {isModalActive ? (
              <ConversationParams
                conversation={selectedConversation}
                convId={selectedConversation.id}
                setIsPictureChanged={setIsPictureChanged}
                isPictureChanged={isPictureChanged}
              />
            ) : (
              <></>
            )}
          </Modal>
        </div>
        <ProfilePicture imageUrl={selectedConversation.imageUrl} />
      </div>
    );
  }
  return <div className="chatHeader">Placeholder friend(s) infos</div>;
};

export default ConversationHeader;
