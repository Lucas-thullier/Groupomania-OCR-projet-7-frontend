import axios from "axios";
import { useEffect, useState } from "react";
import ProfilePicture from "../ProfilPicture/ProfilPicture";
import { prepareHeaders } from "../Utils/utils";
import Modal from "../Modal/Modal";
import ConversationParams from "../ConversationParams/ConversationParams";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
require("./ChatHeader.css");

const ConversationHeader = ({ selectedConversation, setSelectedConversation, setIsPictureChanged, isPictureChanged }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const showModal = () => {
    setIsModalActive(true);
  };

  const hideModal = () => {
    setIsModalActive(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/conversation/id?id=${selectedConversation.id}`, prepareHeaders(document.cookie))
      .then((singleConv) => {
        setSelectedConversation(singleConv.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="chatHeader">
      <div className="conversationInfos">
        <ProfilePicture imageUrl={selectedConversation.imageUrl} />
        <div className="conversationName">
          {selectedConversation.name
            ? selectedConversation.name
            : selectedConversation.Users.map((user, key) => <span key={key}>{`${user.username} `}</span>)}
        </div>
      </div>
      <div className="conversationsActions">
        <button onClick={showModal}>
          <FontAwesomeIcon icon={faCog} />
        </button>
      </div>
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
  );
};

export default ConversationHeader;
