import SingleComment from '../SingleComment/SingleComment'
import './FeedPostComments.css'

const FeedPostComments = ({ comments }) => {
  return (
    <div className="commentsFeed">
      {comments.map((singleComment, key) => (
        <SingleComment comment={singleComment} key={key} />
      ))}
    </div>
  )
}

export default FeedPostComments
