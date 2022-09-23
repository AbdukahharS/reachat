import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import Search from './Search'
import Logo from '../img/logo.svg'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='navbar'>
      <img src={Logo} alt='logo' className='logo' />
      {/* <div className='user'>
        <img src={currentUser.photoURL} alt='' />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div> */}
      <Search />
    </div>
  )
}

export default Navbar
