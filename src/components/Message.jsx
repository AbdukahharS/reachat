import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
// import { ChatContext } from '../context/ChatContext'
import MessageMenu from './MessageMenu'
import More from '../img/more.png'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  // const { data } = useContext(ChatContext)
  const [uid, setUid] = useState(null)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  const handleClick = () => {
    if (!uid) {
      setUid(message.id)
    } else {
      setUid(null)
    }
  }

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className='messageContent'>
        {message.img && <img src={message.img} alt='' />}
        <div>
          <p>{message.text}</p>
          <div className='messageDetails'>
            <span>just now</span>
            <img src={More} alt='Open message menu' onClick={handleClick} />
          </div>
        </div>
        <MessageMenu uid={uid} className='messageMenu' />
      </div>
    </div>
  )
}

export default Message
