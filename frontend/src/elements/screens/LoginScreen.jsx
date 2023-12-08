import { Form, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLoginMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/authSlice'
import { InputField } from '../components/InputField'

import { toast } from 'react-toastify'

import '../css/LoginScreen.css'

const LoginScreen = () =>
{
  // Bring in userInfo from state.auth
  const { userInfo } = useSelector(state => state.auth)

  //set dispatch and navigate func()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Cant go to login if already logged in
  useEffect(() =>
  {
    if (userInfo)
    {
      navigate('/')
    }
  }, [ navigate, userInfo ])

  //Form Input State
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  // handle email input change on InputField
  const emailHandler = (e) =>
  {
    setEmail(e.target.value)
  }

  // handle password input change on InputField
  const passwordHandler = (e) =>
  {
    setPassword(e.target.value)
  }

  // Bring in login from useLoginMutation
  const [ login ] = useLoginMutation()

  // handle submit event on form
  const submitHandler = async (e) =>
  {
    e.preventDefault()
    try
    {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <div className='LoginScreen'>
      <Form onSubmit={ (e) => submitHandler(e) }>
        <InputField placeholder='Email' type='email' state={ email } onChangeHandler={ (e) => emailHandler(e) } />
        <InputField placeholder='Password' type='password' state={ password } onChangeHandler={ (e) => passwordHandler(e) } />
        <button type='submit'>Sign In</button>
      </Form>
    </div>
  )
}

export { LoginScreen }