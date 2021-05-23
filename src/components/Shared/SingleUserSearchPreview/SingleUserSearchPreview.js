import ProfilePicture from "../ProfilPicture/ProfilPicture";
import "./SingleUserSearchPreview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { prepareHeaders } from "../../Utils/utils";

const SingleUserSearchPreview = ({ singleSearchResult }) => {
  const [isAlreadyFriend, setIsAlreadyFriend] = useState(singleSearchResult.isAlreadyFriend);
  const history = useHistory();

  const handleClickOnContextualButton = (clickEvent) => {
    clickEvent.stopPropagation();
    if (isAlreadyFriend) {
      createConversation(singleSearchResult.id);
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/conversation/getConversationByUserAndFriendId?friendId=${singleSearchResult.id}`,
          prepareHeaders(document.cookie)
        )
        .then((test) => {
          history.push({
            pathname: "/messaging",
            state: {
              conversation: test.data,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let postData = {
        newFriendId: singleSearchResult.id,
      };
      postData = JSON.stringify(postData);
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/friend/add`, postData, prepareHeaders(document.cookie));
    }

    function createConversation(friendId) {
      let dataForNewConversation = {
        friendId: friendId,
      };
      dataForNewConversation = JSON.stringify(dataForNewConversation);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/conversation/createConversation`,
          dataForNewConversation,
          prepareHeaders(document.cookie)
        )
        .then((result) => {
          // setIsNewConversation(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleClickOnPreview = () => {
    history.push(`/userPage/${singleSearchResult.id}`);
  };

  return (
    <div className="singleUserSearchPreview" onClick={handleClickOnPreview}>
      <ProfilePicture imageUrl={singleSearchResult.imageUrl} />

      <div className="previewUsername">{singleSearchResult.username}</div>

      <div className="friendStatut" onClick={handleClickOnContextualButton}>
        <span className="fa-layers fa-fw" id="userStatut">
          <FontAwesomeIcon icon={faUserFriends} className="friendshipLogo" />
          <FontAwesomeIcon icon={isAlreadyFriend ? faCheck : faPlus} transform="shrink-4" className="friendshipCheck" />
        </span>
      </div>
    </div>
  );
};

export default SingleUserSearchPreview;
