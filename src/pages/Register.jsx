import React, { useState } from 'react'
import Add from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../img/logo.svg'

const Register = () => {
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    if (!file) {
      setLoading(false)
      return setErr('You need to select image for avatar')
    }

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password)

      //Create a unique image name
      const date = new Date().getTime()
      const storageRef = ref(storage, `${displayName + date}`)

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            })
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })

            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {})
            navigate('/')
          } catch (err) {
            console.log(err)
            setErr(err.message)
            setLoading(false)
          }
        })
      })
    } catch (err) {
      console.error(err)
      setErr(err.message)
      setLoading(false)
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <div className='logo'>
          <img src={Logo} alt='' />
          <span>Reachat</span>
        </div>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input required type='text' placeholder='Display name' />
          <input required type='email' placeholder='Email' />
          <input required type='password' placeholder='Password' />
          <input
            style={{ display: 'none' }}
            type='file'
            id='file'
            name='file'
          />
          <label htmlFor='file'>
            <img src={Add} alt='' />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && (
            <span style={{ color: '#fff' }}>
              Uploading and compressing the image please wait...
            </span>
          )}
          {err.length && <span style={{ color: '#fff' }}>{err}</span>}
        </form>
        <p>
          You do have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
