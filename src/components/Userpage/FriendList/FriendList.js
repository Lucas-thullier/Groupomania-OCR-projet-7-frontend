import React, { useEffect } from 'react'
import ProfilePicture from '../../Shared/ProfilPicture/ProfilPicture'
import { useHistory } from 'react-router'
import './FriendList.css'

const FriendList = ({ friendList }) => {
  const history = useHistory()

  useEffect(() => {
    if (document.querySelector('.friendList')) {
      document.querySelector('.friendList').style.transform =
        'translateX(0)'
    }
  }, [friendList])

  const handleClick = (userId) => () => {
    history.push(`/userPage/${userId}`)
  }

  if (Array.isArray(friendList) && friendList.length != 0) {
    return (
      <fieldset className="friendList">
        <legend>Amis</legend>
        {friendList.map((singleFriend, key) => (
          <div
            className="singleFriend"
            key={key}
            onClick={handleClick(singleFriend.id)}
          >
            <ProfilePicture imageUrl={singleFriend.imageUrl} />
            {singleFriend.username}
          </div>
        ))}
      </fieldset>
    )
  } else {
    return <></>
  }
}

export default FriendList
