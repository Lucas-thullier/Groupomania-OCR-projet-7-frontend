import axios from 'axios'
import { useEffect, useState } from 'react'
import PostCreation from '../PostCreation/PostCreation'
import SingleFeedPost from '../SingleFeedPost/SingleFeedPost'
import { prepareHeaders } from '../../Utils/utils'
import './FeedPost.css'

const FeedPost = () => {
  const [feedposts, setFeedPosts] = useState([])
  const [isNewPost, setIsNewPost] = useState(null)
  const [offset, setOffset] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(undefined)
  const [needFetchPost, setNeedFetchPost] = useState(true)
  const [feedPostCount, setFeedPostCount] = useState(0)
  const [comments, setComments] = useState([])
  const [singlePostId, setSinglePostId] = useState([])

  useEffect(() => {
    if (needFetchPost) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/feedpost/user?offset=${offset}`,
          prepareHeaders(document.cookie)
        )
        .then((feedPostResponse) => {
          const fetchedFeedPosts = feedPostResponse.data
          const fetchedFeedPostsCount = fetchedFeedPosts.length
          const actualFeedPostCount = feedposts.length
          if (
            fetchedFeedPostsCount + actualFeedPostCount ==
            feedPostCount
          ) {
            setNeedFetchPost(false)
          } else {
            setFeedPosts(feedposts.concat(fetchedFeedPosts))
            setFeedPostCount(actualFeedPostCount + fetchedFeedPostsCount)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [isNewPost, offset])

  const createNewPost = (submitEvent) => {
    submitEvent.preventDefault()

    const dataForCreateNewPost = {
      textContent: submitEvent.target[0].value,
    }

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/feedpost/create`,
        dataForCreateNewPost,
        prepareHeaders(document.cookie)
      )
      .then((creationResponse) => {
        if (creationResponse.status === 200) {
          setIsNewPost(true)
          document.querySelector('textarea[name=newPostContent]').value =
            ''
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollPosition(window.pageYOffset)
    })
    setWindowHeight(
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    )
  })

  useEffect(() => {
    if (windowHeight != 0 && scrollPosition == windowHeight) {
      setOffset(offset + 5)
    }
  }, [scrollPosition])

  const whichParity = (key) => {
    return key % 2 == 0 ? 'even' : 'odd'
  }

  const handleSubmit = (messageContent, singlePostId) => (submitEvent) => {
    submitEvent.preventDefault()
    setSinglePostId(singlePostId)
    if (messageContent) {
      const messageToSend = JSON.stringify({
        messageContent: messageContent,
        postId: singlePostId,
      })
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/feedpost/comment/new`,
          messageToSend,
          prepareHeaders(document.cookie)
        )
        .then((response) => {
          if (response.data == true) {
            document.getElementById('sendResponse').value = ''
          } else {
            console.log('false')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    if (singlePostId) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/feedpost/comment/all?postId=${singlePostId}&offset=${offset}`
        )
        .then((commentsResponse) => {
          setComments(comments.concat(commentsResponse.data.comments))
        })
        .catch((error) => console.log(error))
    }
  }, [singlePostId])

  const deleteComment = (commentId) => (clickEvent) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/feedpost/comment/delete?commentId=${commentId}`,
        prepareHeaders(document.cookie)
      )
      .then((deletionResponse) => {})
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <section className="feedPost">
      <PostCreation
        createNewPost={createNewPost}
        setIsNewPost={setIsNewPost}
      />
      {feedposts.length > 0 ? (
        feedposts.map((singlePost, key) => (
          <SingleFeedPost
            handleSubmit={handleSubmit}
            comments={comments}
            parity={whichParity(key)}
            singlePost={singlePost}
            key={key}
            deleteComment={deleteComment}
          />
        ))
      ) : (
        <></>
      )}
    </section>
  )
}

export default FeedPost
