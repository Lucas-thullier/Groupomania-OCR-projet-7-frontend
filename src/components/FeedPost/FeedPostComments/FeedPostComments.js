import SingleComment from '../SingleComment/SingleComment'
import './FeedPostComments.css'

const FeedPostComments = ({ comments, setNeedRefresh }) => {
  return (
    <div className="commentsFeed">
      {comments.map((singleComment, key) => (
        <SingleComment
          comment={singleComment}
          key={key}
          setNeedRefresh={setNeedRefresh}
        />
      ))}
    </div>
  )
}

export default FeedPostComments
