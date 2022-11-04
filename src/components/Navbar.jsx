import { useState } from 'react'
import Search from './Search'
import Menu from './Menu'
import Logo from '../img/logo.svg'

const Navbar = ({ setUser, setErr, username, setUsername }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='navbar'>
        <button onClick={() => setOpen(true)}>
          <img src={Logo} alt='logo' className='logo' />
        </button>

        <Search
          setUser={setUser}
          setErr={setErr}
          username={username}
          setUsername={setUsername}
        />
      </div>
      <Menu open={open} setOpen={setOpen} />
    </>
  )
}

export default Navbar
