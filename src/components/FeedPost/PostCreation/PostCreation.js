import { useEffect } from 'react'
import './PostCreation.css'

const PostCreation = ({ createNewPost }) => {
  useEffect(() => {
    if (document.querySelector('.postCreation')) {
      document.querySelector('.postCreation').style.transform =
        'translateY(0)'
    }
  }, [])

  return (
    <fieldset className="postCreation">
      <legend>Quoi de neuf ?</legend>
      <form method="POST" onSubmit={createNewPost}>
        <textarea name="newPostContent" type="text" maxLength="500" />
        <input type="submit" value="Envoyer" />
      </form>
    </fieldset>
  )
}

export default PostCreation
