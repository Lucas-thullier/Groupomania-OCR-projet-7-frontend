import axios from "axios";
import { useEffect, useState } from "react";
import ProfilePicture from "../ProfilPicture/ProfilPicture";
import SearchBar from "../SearchBar/SearchBar";
import { prepareHeaders } from "../Utils/utils";
import Modal from "../Modal/Modal";
import ConversationParams from "../ConversationParams/ConversationParams";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
require("./ChatHeader.css");

const settingsElement = <FontAwesomeIcon icon={faCog} />;

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
      .get(`http://localhost:3001/conversation/getConversationbyId?id=${selectedConversation.id}`, prepareHeaders(document.cookie))
      .then((singleConv) => {
        setSelectedConversation(singleConv.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isPictureChanged]);

  if (selectedConversation) {
    return (
      <div className="chatHeader">
        <div className="conversationInfos">
          <ProfilePicture imageUrl={selectedConversation.imageUrl} />
          <div className="conversationName">{selectedConversation.name ? selectedConversation.name : selectedConversation.Users.map((user, key) => <span key={key}>{`${user.username} `}</span>)}</div>
        </div>
        <div className="conversationsActions">
          <button onClick={showModal}>{settingsElement}</button>
        </div>
        <Modal show={isModalActive} handleClose={hideModal}>
          {isModalActive ? (
            <ConversationParams conversation={selectedConversation} convId={selectedConversation.id} setIsPictureChanged={setIsPictureChanged} isPictureChanged={isPictureChanged} />
          ) : (
            <></>
          )}
        </Modal>
      </div>
    );
  } else {
    return <div className="chatHeader">Placeholder friend(s) infos</div>;
  }
};

export default ConversationHeader;
