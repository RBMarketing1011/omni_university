import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUserProfileQuery } from '../../slices/usersApiSlice'

import '../css/EditProfileScreen.css'

const EditProfileScreen = () =>
{
  //initiate userInfo from state.auth
  const { userInfo } = useSelector(state => state.auth)

  // set useState to handle mutations
  const [ firstname, setFirstname ] = useState('')
  const [ lastname, setLastname ] = useState('')
  const [ email, setEmail ] = useState('')

  // using the useGetUserProfileQuery
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUserProfileQuery(userInfo._id)

  let content
  if (isLoading)
  {
    content = <p>Loading...</p>
  } else if (isSuccess)
  {
    const date1 = new Date(user.createdAt)
    const date2 = new Date(user.updatedAt)
    const createdOn = date1.toDateString()
    const updatedOn = date2.toDateString()
    content =
      <>
        <div className="card-header">
          <div className="profile-pic">
            <p>{ user.name.firstName.charAt(0) }{ user.name.lastName.charAt(0) }</p>
          </div>
          <div className="user-name">
            <h4>{ user.name.firstName }<span>{ user.name.lastName }</span></h4>
          </div>
        </div>
        <div className="card-body">
          <div className="card-container">
            <div className="user-name">
              <div className="title">Name</div>
              <div className="content">
                <h1>{ user.name.firstName }</h1>
                <h1>{ user.name.lastName }</h1>
              </div>
            </div>
            <div className="user-email">
              <div className="title">Email</div>
              <div className="content">
                <h1>{ user.email }</h1>
              </div>
            </div>
            <div className="user-role">
              <div className="title">Role</div>
              <div className="content">
                <h1>{ user.role }</h1>
              </div>
            </div>
            <div className="user-courses">
              <div className="title">Courses Completed</div>
              <div className="content">
                <ul>{
                  user.omniUProgress.coursesComplete.length ?
                    user.omniUProgress.coursesComplete.map((item, i) =>
                    {
                      return (
                        <li key={ i }><h1>{ item }</h1></li>
                      )
                    })
                    :
                    'No Courses Completed'
                }</ul>
              </div>
            </div>
          </div>
          <div className="btn-group">
            <a className='btn-primary'>Update User Info</a>
            <button type='submit' className='btn-secondary'>Update User Info</button>
          </div>
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
      </>
  } else if (isError)
  {
    content = <p>{ error }</p>
  }

  return (
    <div className='EditProfileScreen'>
      <div className="card">
        { content }
      </div>
    </div>
  )
}

export { EditProfileScreen }