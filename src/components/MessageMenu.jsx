import { useContext } from 'react'
import { updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase'
import { ChatContext } from '../context/ChatContext'
import { MessagesContext } from '../context/MessagesContext'
import { AuthContext } from '../context/AuthContext'
import { AiOutlineDelete } from 'react-icons/ai'

const MessageMenu = ({ uid, message }) => {
  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)
  const context = useContext(MessagesContext)
  const messages = context.messages.messages
  const dispatch = context.dispatch

  const handleDelete = async () => {
    if (uid) {
      if (message.img) {
        const imgArr = message.img.split('/')
        const img = imgArr[imgArr.length - 1]
        const imgArr1 = img.split('?')
        const imgId = imgArr1[0]

        const imgRef = ref(storage, imgId)
        await deleteObject(imgRef)
      }

      const docRef = doc(db, 'chats', data.chatId)
      const updatedMessages = messages.filter((message) => message.id !== uid)
      const lastMessage = updatedMessages[updatedMessages.length - 1]
      updateDoc(docRef, { messages: updatedMessages })
        .then(() => {
          dispatch({ type: 'SET_MESSAGES', payload: updatedMessages })
        })
        .then(() => {
          updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
              text: lastMessage.text
                ? lastMessage.text
                : lastMessage.img
                ? 'File'
                : '',
            },
            [data.chatId + '.date']: serverTimestamp(),
          })
        })
        .then(() => {
          updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
              text: lastMessage.text
                ? lastMessage.text
                : lastMessage.img
                ? 'File'
                : '',
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
