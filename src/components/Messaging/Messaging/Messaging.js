import React, { useState, useEffect } from 'react'
import ConversationsPanel from '../ConversationsPanel/ConversationsPanel'
import axios from 'axios'
import { prepareHeaders } from '../../Utils/utils'
import Chat from '../Chat/Chat'
import ChatPlaceholder from '../ChatPlaceholder/ChatPlaceholder'
import { useLocation } from 'react-router'
require('./Messaging.css')

const Messaging = () => {
  const location = useLocation()
  const [allConversations, setAllConversations] = useState(null)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [allMessages, setAllMessages] = useState(null)
  const [isMessageSend, setIsMessageSend] = useState(null)

  useState(() => {
    if (location.state && location.state.conversation) {
      setSelectedConversation(location.state.conversation)
    }
  }, [])

  const handleSubmit = (messageContent) => (submitEvent) => {
    submitEvent.preventDefault()
    if (messageContent) {
      const messageToSend = JSON.stringify({
        messageContent: messageContent,
        convId: selectedConversation.id,
      })
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/message/create`,
          messageToSend,
          prepareHeaders(document.cookie)
        )
        .then((response) => {
          if (response.data.message === 'true') {
            setIsMessageSend(true)
            document.getElementById('sendResponse').value = ''
          } else {
            setIsMessageSend(false)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    if (selectedConversation) {
      const conversationId = selectedConversation.id

      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/message/conversationId?convId=${conversationId}`,
          prepareHeaders(document.cookie)
        )
        .then((allMessages) => {
          setAllMessages(allMessages.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [isMessageSend, selectedConversation])

  useEffect(() => {
    if (selectedConversation) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/conversation/id?id=${selectedConversation.id}`,
          prepareHeaders(document.cookie)
        )
        .then((singleConv) => {
          setSelectedConversation(singleConv.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/conversation/all/userId`,
        prepareHeaders(document.cookie)
      )
      .then((allConversationsResponse) => {
        setAllConversations(allConversationsResponse.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <main className="messaging">
      {allConversations ? (
        <ConversationsPanel
          allConversations={allConversations}
          setSelectedConversation={setSelectedConversation}
        />
      ) : (
        <></>
      )}
      {selectedConversation ? (
        <Chat
          handleSubmit={handleSubmit}
          selectedConversation={selectedConversation}
          allMessages={allMessages}
          setIsMessageSend={setIsMessageSend}
          setSelectedConversation={setSelectedConversation}
        />
      ) : (
        <ChatPlaceholder />
      )}
    </main>
  )
}

export default Messaging
