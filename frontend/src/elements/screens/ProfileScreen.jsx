import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaArrowRightFromBracket, FaPenToSquare } from 'react-icons/fa6'
import { toast } from 'react-toastify'

import { removeCredentials } from '../../slices/authSlice'
import { useLogoutMutation, useGetUserProfileQuery } from '../../slices/usersApiSlice'

import '../css/ProfileScreen.css'

const ProfileScreen = () =>
{
  const { userInfo } = useSelector(state => state.auth)

  //===================================Logout User=================================

  //set dispatch and navigate func()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //initiate useLogoutMutation 
  const [ logout ] = useLogoutMutation()

  //logout handler func()
  const logoutHandler = async () =>
  {
    try
    {
      await logout().unwrap()
      dispatch(removeCredentials())
      navigate('/')
      toast.success('Logged Out Successfully')
    } catch (err)
    {
      toast.error(err?.data?.message || err)
    }
  }

  //================User Profile Fetch=====================================
  const {
    data: user,
    isLoading: profileLoading,
    isSuccess: profileSuccess,
    isError: profileIsError,
    error: profileError,
    refetch: profilefetch
  } = useGetUserProfileQuery(userInfo._id)

  let profile
  if (profileLoading)
  {
    profile = <p>Loading</p>
  } else if (profileSuccess)
  {
    const createdAt = new Date(user.createdAt).toDateString()
    const updatedAt = new Date(user.updatedAt).toDateString()

    profile = (
      <div className="card">
        <div className="card-header">
          <div className="profile-pic">
            {
              <p>{ user.name.firstName.charAt(0) }{ user.name.lastName.charAt(0) }</p>
            }
          </div>
          <div className="header-title">
            {
              <h4>{ user.name.firstName } <span>{ user.name.lastName }</span></h4>
            }
          </div>
        </div>
        <div className="card-body">
          <div className="card-container">
            <div className="form-group">
              <div className="title">
                <h4>name</h4>
              </div>
              <div className="content">
                {
                  <p>{ user.name.firstName } { user.name.lastName }</p>
                }
              </div>
            </div>
            <div className="form-group">
              <div className="title">
                <h4>email</h4>
              </div>
              <div className="content">
                {
                  <p>{ user.email }</p>
                }
              </div>
            </div>
            <div className="form-group">
              <div className="title">
                <h4>Role</h4>
              </div>
              <div className="content">
                {
                  <p>{ user.role }</p>
                }
              </div>
            </div>
            <div className="form-group">
              <div className="title">
                <h4>Courses Completed</h4>
              </div>
              <div className="content">

                {
                  user.omniUProgress.coursesComplete.length > 0 ?

                    user.omniUProgress.coursesComplete.map((course, courseIndex) => (
                      <p key={ courseIndex }>{ course.title }</p>
                    ))
                    :
                    <p>No Courses Complete</p>

                }

              </div>
            </div>
            <div className="form-group">
              <div className="title">
                <h4>Videos Completed</h4>
              </div>
              <div className="content">

                {

                  user.omniUProgress.videosComplete.length > 0 ?

                    user.omniUProgress.videosComplete.map((vid, vidIndex) => (
                      <p key={ vidIndex }>{ vid.title }</p>
                    ))

                    :

                    <p>No Videos Complete</p>

                }

              </div>
            </div>
            <div className="form-group">
              <div className="title">
                <h4>Accepted Into Omni University On:</h4>
              </div>
              <div className="content">
                <p>{ createdAt }</p>
              </div>
            </div>
            <div className="form-group">
              <div className="title">
                <h4>Profile Last Updated On:</h4>
              </div>
              <div className="content">
                <p>{ updatedAt }</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="footer-group">
            <h4 className="footer-title">
              Having Technical Problems or Need Training?
            </h4>
            <p className="footer-desc">
              IT Department: (404) 912-5392
            </p>
            <p className="footer-desc">
              Omni U Service: (404) 912-5392
            </p>
          </div>
          <div className="footer-group">
            <div className="logout-container">
              <Link className='logout-btn btn-primary' onClick={ logoutHandler }>
                Sign Out
                <FaArrowRightFromBracket size={ 25 } />
              </Link>
              <Link to='/profile/edit' className='logout-btn btn-secondary'>
                Edit Profile
                <FaPenToSquare size={ 25 } />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )

  } else if (profileIsError)
  {
    profile = <p>{ profileError.error }</p>
  }

  return (
    <div className='ProfileScreen' >
      { profile }
    </div >
  )
}

export { ProfileScreen }