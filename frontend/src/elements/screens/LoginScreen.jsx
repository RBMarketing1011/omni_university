import { Form, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLoginMutation } from '../../slices/usersApiSlice'
import { setCredentials } from '../../slices/authSlice'
import { InputField } from '../components/InputField'
import { PasswordField } from '../components/PasswordField'

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
      toast.success('Logged In Successfully')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <div className='LoginScreen'>
      <div className="card">
        <div className="card-header">
          <div className="profile-pic">
            <p>OU</p>
          </div>
          <div className="header-title">
            <h4>Sign <span>In</span></h4>
          </div>
        </div>
        <div className="card-body">
          <Form className='card-form' onSubmit={ (e) => submitHandler(e) }>
            <div className="card-container">
              <div className="form-group">
                <div className="title">
                  <h4>Email</h4>
                </div>
                <div className="content">
                  <InputField placeholder='Email' type='email' state={ email } onChangeHandler={ (e) => emailHandler(e) } />
                </div>
              </div>
              <div className="form-group">
                <div className="title">
                  <h4>Password</h4>
                </div>
                <div className="content">
                  <PasswordField placeholder='Password' state={ password } onChangeHandler={ (e) => passwordHandler(e) } />
                </div>
              </div>
            </div>
            <button className='btn-primary' type='submit'>Sign In</button>
          </Form>
        </div>
        <div className="card-footer">
          <div className="footer-group">
            <h4 className="footer-title">
              Having Technical Problems?
            </h4>
            <p className="footer-desc">
              Contact Your IT Department
            </p>
          </div>
          <div className="footer-group">
            <h4 className="footer-title">
              Need Training?
            </h4>
            <p className="footer-desc">
              Contact Your Supervisor
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { LoginScreen }