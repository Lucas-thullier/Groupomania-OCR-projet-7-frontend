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

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollPosition(window.pageYOffset)
    })
  })

  useEffect(() => {
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

  return (
    <section className="feedPost">
      <PostCreation setIsNewPost={setIsNewPost} />
      {feedposts.length > 0 ? (
        feedposts.map((singlePost, key) => (
          <SingleFeedPost
            parity={whichParity(key)}
            singlePost={singlePost}
            key={key}
          />
        ))
      ) : (
        <></>
      )}
    </section>
  )
}

export default FeedPost
