import './UserHead.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserAltSlash,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import ProfilePicture from '../../Shared/ProfilPicture/ProfilPicture'
import { prepareHeaders } from '../../Utils/utils'
import { useState, useEffect } from 'react'

const UserHead = ({
  userData,
  amIFriendWithHim,
  deleteFriend,
  addFriend,
  changeProfilPicture,
  setPictureUrl,
  pictureUrl,
}) => {
  useEffect(() => {
    document.querySelector('.userHead').style.transform = 'translateY(0)'
  }, [])

  const toggleToInput = () => {
    if (isMyPage()) {
      const actualUsernameBlock = document.getElementById('actualUsername')
      const actualUsername = actualUsernameBlock.innerHTML

      const inputUsername = document.getElementById('newUsername')
      inputUsername.value = actualUsername

      actualUsernameBlock.setAttribute('hidden', '')
      inputUsername.removeAttribute('hidden')
      inputUsername.focus()

      inputUsername.addEventListener('blur', () => {
        actualUsernameBlock.removeAttribute('hidden')
        inputUsername.setAttribute('hidden', '')
      })

      inputUsername.addEventListener('keyup', (keyEvent) => {
        if (keyEvent.key === 'Enter') {
          const newUsernameForm = {
            newUsername: inputUsername.value,
          }
          axios
            .put(
              `${process.env.REACT_APP_BACKEND_URL}/user/username/change`,
              newUsernameForm,
              prepareHeaders(document.cookie)
            )
            .then((response) => {
              const newUsername = response.data
              actualUsernameBlock.innerHTML = newUsername
              inputUsername.blur()
            })
            .catch((error) => console.log(error))
        }
      })
    }
  }

  function isMyPage() {
    return userData.id == localStorage.getItem('userId') ? true : false
  }

  return (
    <div className="userHead">
      {isMyPage() ? (
        <></>
      ) : (
        <div className="interactWithUser">
          {amIFriendWithHim ? (
            <button className="deleteFriend" onClick={deleteFriend}>
              <FontAwesomeIcon icon={faUserAltSlash} />
            </button>
          ) : (
            <button className="addUserButton" onClick={addFriend}>
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
          )}
        </div>
      )}
      <label htmlFor="newProfilPicture">
        <ProfilePicture imageUrl={pictureUrl ? pictureUrl : ''} />
      </label>

      <p id="actualUsername" onClick={toggleToInput}>
        {userData.username}
      </p>
      <input
        id="newUsername"
        type="text"
        autoComplete="off"
        hidden
      ></input>
      {isMyPage() ? (
        <>
          <form hidden onChange={changeProfilPicture}>
            <input type="file" id="newProfilPicture" name="filename" />
            <input type="submit" />
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default UserHead
