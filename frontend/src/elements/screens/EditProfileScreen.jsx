import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useUpdateUserMutation } from '../../slices/usersApiSlice'
import { InputField } from '../components/InputField'
import { setCredentials } from '../../slices/authSlice'

import '../css/EditProfileScreen.css'

const EditProfileScreen = () =>
{
  //initiate userInfo from state.auth
  const { userInfo } = useSelector(state => state.auth)

  // set useState to handle mutations and form data
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email, setEmail ] = useState('')

  useEffect(() =>
  {
    setFirstName(userInfo.name.firstName)
    setLastName(userInfo.name.lastName)
    setEmail(userInfo.email)
  }, [ userInfo.setFirstName, userInfo.setLastName, userInfo.setEmail ])

  const firstNameStateHandler = (e) =>
  {
    setFirstName(e.target.value)
  }

  const lastNameStateHandler = (e) =>
  {
    setLastName(e.target.value)
  }

  const emailStateHandler = (e) =>
  {
    setEmail(e.target.value)
  }

  //Mutate data when form submitted
  const [ updateUser ] = useUpdateUserMutation(userInfo._id)

  const dispatch = useDispatch()

  const [ formState, setFormState ] = useState(false)

  const formStateHandler = () =>
  {
    setFormState(!formState)
  }

  const submitFormHandler = async (e) =>
  {
    e.preventDefault()
    try
    {
      const res = await updateUser({ id: userInfo._id, firstName, lastName, email }).unwrap()
      dispatch(setCredentials({ ...res }))
      setFormState(!formState)
      toast.success('Info Updated Successfully')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
    }
  }

  const date1 = new Date(userInfo.createdAt)
  const date2 = new Date(userInfo.updatedAt)
  const createdOn = date1.toDateString()
  const updatedOn = date2.toDateString()

  return (
    <div className='EditProfileScreen'>
      <div className="card">
        <div className="card-header">
          <div className="profile-pic">
            <p>{ userInfo.name.firstName.charAt(0) }{ userInfo.name.lastName.charAt(0) }</p>
          </div>
          <div className="user-name">
            <h4>{ userInfo.name.firstName }<span>{ userInfo.name.lastName }</span></h4>
          </div>
        </div>
        <div className="card-body">
          < Form className='card-form' onSubmit={ (e) => submitFormHandler(e) } >
            <div className="card-container">
              <div className="user-name">
                <div className="title">Name</div>
                <div className="content">
                  {
                    formState ?
                      <>
                        < InputField type='text' state={ firstName } onChangeHandler={ (e) => firstNameStateHandler(e) } />
                        < InputField type='text' state={ lastName } onChangeHandler={ (e) => lastNameStateHandler(e) } />
                      </>
                      :
                      <>
                        <h1>{ userInfo.name.firstName }</h1>
                        <h1>{ userInfo.name.lastName }</h1>
                      </>
                  }
                </div>
              </div>
              <div className="user-email">
                <div className="title">Email</div>
                <div className="content">
                  {
                    formState ?
                      < InputField type='email' state={ email } onChangeHandler={ (e) => emailStateHandler(e) } />
                      :
                      <h1>{ userInfo.email }</h1>
                  }
                </div>
              </div>
            </div>
            <div className="btn-group">
              {
                formState ?
                  <>
                    <a className='btn-primary' onClick={ formStateHandler }>close</a>
                    <button type='submit' className='btn-secondary'>Save</button>
                  </>
                  :
                  <a className='btn-primary' onClick={ formStateHandler }>Update User Info</a>
              }
            </div>
          </Form>
        </div>
        <div className="card-footer">
          <div className="footer-group">
            <h4 className="footer-title">
              User Created On:
            </h4>
            <p className="footer-desc">
              { createdOn }
            </p>
          </div>
          <div className="footer-group">
            <h4 className="footer-title">
              User Last Updated On:
            </h4>
            <p className="footer-desc">
              { updatedOn }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { EditProfileScreen }