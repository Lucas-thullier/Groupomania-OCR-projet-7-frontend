import React, { useEffect, useState } from 'react'
import './PostReaction.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faGoodreads } from '@fortawesome/free-brands-svg-icons'

const PaperPlaneElement = <FontAwesomeIcon icon={faPaperPlane} />
const smileElement = <FontAwesomeIcon icon={faSmile} />
const shareElement = <FontAwesomeIcon icon={faShareAlt} />
const gifElement = <FontAwesomeIcon icon={faGoodreads} />

const PostReaction = ({ handleSubmit }) => {
  const [messageContent, setMessageContent] = useState(null)

  const onMessageChange = (messageChangeEvent) => {
    setMessageContent(messageChangeEvent.target.value)
  }

  return (
    <div
      className="postReaction"
      onClick={(clickEvent) => clickEvent.stopPropagation()}
    >
      <div className="shareElement"> {shareElement} </div>
      <form method="POST" onSubmit={handleSubmit(messageContent)}>
        <input
          autoComplete="off"
          id="sendResponse"
          type="text"
          name="sendResponse"
          placeholder="Encore une super journée..."
          onChange={onMessageChange}
        />
        <button> {PaperPlaneElement} </button>
      </form>
      <ul>
        <li>{smileElement}</li>
        <li> {gifElement} </li>
      </ul>
    </div>
  )
}

export default PostReaction
