import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
