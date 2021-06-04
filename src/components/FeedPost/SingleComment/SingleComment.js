import ProfilePicture from '../../Shared/ProfilPicture/ProfilPicture'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './SingleComment.css'
import axios from 'axios'
import { prepareHeaders } from '../../Utils/utils'

const SingleComment = ({ comment, setNeedRefresh }) => {
  const deleteComment = (commentId) => (clickEvent) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/feedpost/comment/delete?commentId=${commentId}`,
        prepareHeaders(document.cookie)
      )
      .then((deletionResponse) => {
        setNeedRefresh(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div
      className={
        comment.User.id == localStorage.getItem('userId')
          ? 'singleComment selfComment'
          : 'singleComment'
      }
    >
      <ProfilePicture imageUrl={comment.User.imageUrl} />
      <div className="commentData">
        <p className="commentUsername">{comment.User.username}</p>
        <p className="commentTextcontent">{comment.textContent}</p>
      </div>
      <FontAwesomeIcon
        icon={faTimes}
        className="deletionCross"
        onClick={deleteComment(comment.id)}
      />
    </div>
  )
}
export default SingleComment
