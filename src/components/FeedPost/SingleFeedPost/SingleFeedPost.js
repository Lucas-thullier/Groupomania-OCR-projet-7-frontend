import './SingleFeedPost.css'
import PostReaction from '../../Shared/PostReaction/PostReaction'
import ProfilPicture from '../../Shared/ProfilPicture/ProfilPicture'
import FeedPostComments from '../FeedPostComments/FeedPostComments'
import DisplayMore from '../../Shared/DisplayMore/DisplayMore'
import axios from 'axios'
import { prepareHeaders } from '../../Utils/utils'
import { useEffect, useState } from 'react'

const SingleFeedPost = ({
  singlePost,
  parity,
  handleSubmit,
  comments,
}) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (document.querySelector('.even, .odd')) {
      document.querySelectorAll('.even, .odd').forEach((singlePost) => {
        singlePost.style.transform = 'translateX(0)'
      })
    }
  }, [singlePost])

  return (
    <div className={`singleFeedPost ${parity}`}>
      <div className="postContent">
        <ProfilPicture imageUrl={singlePost.User.imageUrl} />
        <p className="username">{singlePost.User.username}</p>
        <p className="textContent">{singlePost.textContent}</p>
      </div>
      <PostReaction
        handleSubmit={handleSubmit}
        singlePostId={singlePost.id}
      />
      {comments.length > 0 ? (
        <>
          <FeedPostComments comments={comments} />
          <DisplayMore offset={offset} setOffset={setOffset} />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default SingleFeedPost
