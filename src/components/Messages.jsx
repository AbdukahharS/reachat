import { doc, onSnapshot } from 'firebase/firestore'
import { useContext, useEffect } from 'react'
import { ChatContext } from '../context/ChatContext'
import { MessagesContext } from '../context/MessagesContext'
import { db } from '../firebase'
import Message from './Message'

const Messages = () => {
  const { data } = useContext(ChatContext)
  const context = useContext(MessagesContext)
  const messages = context.messages.messages
  const dispatch = context.dispatch

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      console.log(doc.data().messages)
      doc.exists() &&
        dispatch({ type: 'SET_MESSAGES', payload: doc.data().messages })
    })

    return () => {
      unSub()
    }
  }, [data.chatId, dispatch])

  return (
    <div className='messages'>
      {messages && messages.map((m) => <Message message={m} key={m.id} />)}
    </div>
  )
}

export default Messages
