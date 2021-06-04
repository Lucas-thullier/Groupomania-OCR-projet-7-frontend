import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { prepareHeaders } from '../../Utils/utils'
import FriendList from '../FriendList/FriendList'
import UserHead from '../UserHead/UserHead'
import './UserPage.css'

const UserPage = () => {
  let { id } = useParams()
  const [userData, setUserData] = useState()
  const [pictureUrl, setPictureUrl] = useState(null)
  const [userId, setUserId] = useState(id)
  const [friendList, setFriendList] = useState(null)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${id}`,
        prepareHeaders(document.cookie)
      )
      .then((response) => {
        setUserData(response.data)
        setPictureUrl(response.data.imageUrl)
      })
      .catch((error) => {
        console.log(error)
      })

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${userId}/friends`,
        prepareHeaders(document.cookie)
      )
      .then((friendsResponse) => {
        setFriendList(friendsResponse.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [userId])

  const addFriend = () => {
    let postData = {
      newFriendId: userData.id,
    }
    postData = JSON.stringify(postData)
    axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/friend/add`,
      postData,
      prepareHeaders(document.cookie)
    )
  }

  const deleteFriend = () => {
    const friendId = userData.id
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/friend/delete?friendId=${friendId}`,
        prepareHeaders(document.cookie)
      )
      .then((deletionResponse) => {
        console.log(deletionResponse)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const changeProfilPicture = (submitEvent) => {
    submitEvent.preventDefault()
    const newProfilPicture = document.querySelector(
      'input#newProfilPicture'
    ).files[0]
    const formData = new FormData()
    formData.append('image', newProfilPicture)
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/user/profil-picture/change`,
        formData,
        prepareHeaders(document.cookie, 'multipart/form-data')
      )
      .then((response) => {
        const newPictureUrl = response.data
        setPictureUrl(newPictureUrl)
      })
      .catch((error) => console.log(error))
  }

  if (userData) {
    return (
      <section className="userPanel">
        <UserHead
          userData={userData}
          deleteFriend={deleteFriend}
          addFriend={addFriend}
          changeProfilPicture={changeProfilPicture}
          setPictureUrl={setPictureUrl}
          pictureUrl={pictureUrl}
        />
        <FriendList friendList={friendList} />
      </section>
    )
  } else {
    return <></>
  }
}

export default UserPage
