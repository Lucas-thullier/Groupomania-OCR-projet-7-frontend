require('./SubredditsNav.css')

const SubredditsNav = ({ subredditsList, loadSubreddit }) => {
  return (
    <nav className="subredditsNav">
      {subredditsList.map((singleSubreddit, key) => (
        <div
          className="singleSubreddit"
          key={key}
          onClick={loadSubreddit(singleSubreddit.displayName)}
        >
          {singleSubreddit.displayNamePrefixed}
        </div>
      ))}
    </nav>
  )
}
export default SubredditsNav
