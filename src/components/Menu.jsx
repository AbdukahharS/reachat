import { useContext, useState, useRef } from 'react'
import { signOut, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { IoClose } from 'react-icons/io5'
import { MdOutlineModeEdit } from 'react-icons/md'
import { MdDone } from 'react-icons/md'

const Menu = ({ open, setOpen }) => {
  const { currentUser } = useContext(AuthContext)
  const [editMode, setEditMode] = useState(false)
  const nameRef = useRef(null)

  const handleClick = () => {
    const name = nameRef.current

    if (name.innerText) {
      updateProfile(auth.currentUser, { displayName: name.innerText })
        .then(() => {
          setEditMode(false)
          alert('Your name changed succesfully')
        })
        .catch((err) => {
          console.error(err)
          alert(err.message)
        })
    } else {
      name.innerText = currentUser.displayName
      alert('Your name must iclude at least a character')
    }
  }

  return (
    <div className='menuContainer' style={{ display: open ? 'flex' : 'none' }}>
      <div className='menu'>
        <div className='actions'>
          <button className='logout' onClick={() => signOut(auth)}>
            Logout
          </button>
          <button className='close' onClick={() => setOpen(false)}>
            <IoClose />
          </button>
        </div>
        <div className='profile'>
          <img src={currentUser.photoURL} alt='Profile' />
          <div>
            <span
              className='name'
              ref={nameRef}
              contentEditable={editMode}
              suppressContentEditableWarning
            >
              {currentUser.displayName}
            </span>
          </div>

          <div className='profileActions'>
            <button
              className='edit'
              onClick={() => setEditMode(true)}
              style={{ display: editMode ? 'none' : 'block' }}
            >
              <MdOutlineModeEdit />
            </button>
            <button
              className='set'
              onClick={handleClick}
              style={{ display: editMode ? 'block' : 'none' }}
            >
              <MdDone />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
