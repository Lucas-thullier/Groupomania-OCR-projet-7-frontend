import axios from 'axios'
import { useEffect, useState } from 'react'
import { prepareHeaders } from '../../Utils/utils'
import Modal from '../../Shared/Modal/Modal'
import Submission from '../Submission/Submission'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import SubredditsNav from '../SubredditsNav/SubredditsNav'
import SubmissionsFlow from '../SubmissionsFlow/SubmissionsFlow'
require('./Reddit.css')

const redditElement = (
  <FontAwesomeIcon icon={faReddit} className="redditLoaderIcon" />
)
const Reddit = () => {
  const [submissionsList, setSubmissionsList] = useState(null)
  const [isModalActive, setIsModalActive] = useState(false)
  const [submission, setSubmission] = useState(null)
  const [subredditsList, setSubredditsList] = useState(null)
  const [comments, setComments] = useState(null)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/reddit/hot-submissions`,
        prepareHeaders(document.prepareHeaders)
      )
      .then((submissionsListResponse) => {
        setSubmissionsList(submissionsListResponse.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/reddit/popular-subreddits`,
        prepareHeaders(document.cookie)
      )
      .then((popularSubreddit) => {
        setSubredditsList(popularSubreddit.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const loadSubreddit = (subredditId) => (clickEvent) => {
    setSubmissionsList(null)
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/reddit/subreddit?subredditId=${subredditId}`,
        prepareHeaders(document.cookie)
      )
      .then((subreddit) => {
        setSubmissionsList(subreddit.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (isModalActive) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/reddit/comment/id?submissionId=${submission.submissionId}`,
          prepareHeaders(document.cookie)
        )
        .then((commentsResponse) => {
          setComments(commentsResponse.data)
        })
    }
  }, [isModalActive])

  const showModal = (submission) => {
    setSubmission(submission)
    setIsModalActive(true)
  }

  const hideModal = () => {
    setIsModalActive(false)
  }

  return (
    <main className="redditFlow">
      {subredditsList ? (
        <SubredditsNav
          subredditsList={subredditsList}
          setSubmissionsList={setSubmissionsList}
          loadSubreddit={loadSubreddit}
        />
      ) : (
        <></>
      )}
      {submissionsList ? (
        <SubmissionsFlow
          submissionsList={submissionsList}
          showModal={showModal}
        />
      ) : (
        <div className="redditLoader">{redditElement}</div>
      )}
      <Modal show={isModalActive} handleClose={hideModal}>
        {isModalActive && comments ? (
          <Submission
            submission={submission}
            withComments={true}
            comments={comments}
          />
        ) : (
          <></>
        )}
      </Modal>
    </main>
  )
}

export default Reddit
