import React from 'react'
import './UserSearchPreview.css'
import SingleUserSearchPreview from '../SingleUserSearchPreview/SingleUserSearchPreview'

const UserSearchPreview = ({ searchResult }) => {
  if (Array.isArray(searchResult) && searchResult.length != 0) {
    return (
      <div className="userSearchPreview">
        {searchResult.map((singleSearchResult, key) => (
          <SingleUserSearchPreview
            key={key}
            singleSearchResult={singleSearchResult}
          />
        ))}
      </div>
    )
  } else {
    return <></>
  }
}

export default UserSearchPreview
