import { useContext } from 'react'
import { updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { ChatContext } from '../context/ChatContext'
import { MessagesContext } from '../context/MessagesContext'
import { AuthContext } from '../context/AuthContext'
import { AiOutlineDelete } from 'react-icons/ai'

const MessageMenu = ({ uid }) => {
  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)
  const context = useContext(MessagesContext)
  const messages = context.messages.messages
  const dispatch = context.dispatch

  const handleDelete = () => {
    if (uid) {
      const docRef = doc(db, 'chats', data.chatId)
      const updatedMessages = messages.filter((message) => message.id !== uid)

      updateDoc(docRef, { messages: updatedMessages })
        .then(() => {
          dispatch({ type: 'SET_MESSAGES', payload: updatedMessages })
        })
        .then(() => {
          updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
              text: updatedMessages[updatedMessages.length - 1].text,
            },
            [data.chatId + '.date']: serverTimestamp(),
          })
        })
        .then(() => {
          updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
              text: updatedMessages[updatedMessages.length - 1].text,
            },
            [data.chatId + '.date']: serverTimestamp(),
          })
          console.log('success')
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  return (
    <div className='messageMenu' style={{ display: uid ? 'flex' : 'none' }}>
      <button className='delete' onClick={handleDelete}>
        <AiOutlineDelete />
      </button>
    </div>
  )
}

export default MessageMenu
