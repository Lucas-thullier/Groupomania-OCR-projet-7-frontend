import ProfilePicture from "../ProfilPicture/ProfilPicture";
import "./SingleUserSearchPreview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { prepareHeaders } from "../Utils/utils";

const SingleUserSearchPreview = ({ singleSearchResult, clearSearchBar }) => {
  const [isAlreadyFriend, setIsAlreadyFriend] = useState(singleSearchResult.isAlreadyFriend);
  const history = useHistory();

  const handleClick = () => {
    if (isAlreadyFriend) {
      createConversation(singleSearchResult.id);
    } else {
      history.push(`/userPage/${singleSearchResult.id}`);
    }

    function createConversation(friendId) {
      let dataForNewConversation = {
        friendId: friendId,
      };
      dataForNewConversation = JSON.stringify(dataForNewConversation);
      axios
        .post("http://localhost:3001/conversation/createConversation", dataForNewConversation, prepareHeaders(document.cookie))
        .then((result) => {
          // setIsNewConversation(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="singleUserSearchPreview" onClick={clearSearchBar}>
      <ProfilePicture imageUrl={singleSearchResult.imageUrl} />

      <div className="previewUsername">{singleSearchResult.username}</div>

      <div
        className="friendStatut"
        onClick={() => {
          handleClick();
        }}
      >
        <span className="fa-layers fa-fw" id="userStatut">
          <FontAwesomeIcon icon={faUserFriends} className="friendshipLogo" />
          <FontAwesomeIcon icon={isAlreadyFriend ? faCheck : faPlus} transform="shrink-4" className="friendshipCheck" />
        </span>
      </div>
    </div>
  );
};

export default SingleUserSearchPreview;
