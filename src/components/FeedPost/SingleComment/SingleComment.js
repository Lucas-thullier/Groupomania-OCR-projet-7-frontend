import ProfilePicture from '../../Shared/ProfilPicture/ProfilPicture'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './SingleComment.css'

const SingleComment = ({ comment, deleteComment }) => {
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
        onClick={deleteComment ? deleteComment(comment.id) : null}
      />
    </div>
  )
}
export default SingleComment
