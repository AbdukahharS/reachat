import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { IoClose } from 'react-icons/io5'
import { MdOutlineModeEdit } from 'react-icons/md'

const Menu = ({ open, setOpen }) => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='menuContainer' style={{ display: open ? 'flex' : 'none' }}>
      <div className='menu'>
        <div className='actions'>
          <button className='logout'>Logout</button>
          <button className='close' onClick={() => setOpen(false)}>
            <IoClose />
          </button>
        </div>
        <div className='profile'>
          <img src={currentUser.photoURL} alt='Profile' />
          <div>
            <span className='name'>{currentUser.displayName}</span>
          </div>
          <button className='edit'>
            <MdOutlineModeEdit />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Menu
