import PostReaction from '../../Shared/PostReaction/PostReaction'
import MessagesFlow from '../MessagesFlow/MessagesFlow'
import ChatHeader from '../ChatHeader/ChatHeader'
import './Chat.css'

const Chat = ({
  selectedConversation,
  allMessages,
  setIsMessageSend,
  handleSubmit,
}) => {
  return (
    <section className="chat">
      <ChatHeader selectedConversation={selectedConversation} />

      <div className="chatBody">
        {allMessages ? <MessagesFlow allMessages={allMessages} /> : <></>}
        <PostReaction
          convId={selectedConversation.id}
          setIsMessageSend={setIsMessageSend}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  )
}

export default Chat
