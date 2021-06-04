import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './UserPage.css'
import { prepareHeaders } from '../../Utils/utils'
import FriendList from '../FriendList/FriendList'
import UserHead from '../UserHead/UserHead'

const UserPage = () => {
  let { id } = useParams()
  const [userData, setUserData] = useState()
  const [amIFriendWithHim, setAmIFriendWithHim] = useState(false)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${id}`,
        prepareHeaders(document.cookie)
      )
      .then((response) => {
        setUserData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  if (userData) {
    return (
      <section className="userPanel">
        <UserHead
          userData={userData}
          amIFriendWithHim={amIFriendWithHim}
        />
        <FriendList
          userId={userData.id}
          setAmIFriendWithHim={setAmIFriendWithHim}
        />
      </section>
    )
  } else {
    return <></>
  }
}

export default UserPage
