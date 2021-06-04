import ProfilePicture from '../../Shared/ProfilPicture/ProfilPicture'
require('./ChatHeader.css')

const ConversationHeader = ({ selectedConversation }) => {
  return (
    <div className="chatHeader">
      <div className="conversationInfos">
        <ProfilePicture imageUrl={selectedConversation.friend.imageUrl} />
        <span className="conversationName">
          {selectedConversation.friend.username
            ? selectedConversation.friend.username
            : 'Qui est-ce?'}
        </span>
      </div>
    </div>
  )
}

export default ConversationHeader
