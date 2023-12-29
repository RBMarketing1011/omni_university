import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { FaXmark, FaCheck } from 'react-icons/fa6'

import { useGetAllCoursesQuery } from '../../slices/coursesApiSlice'

import '../css/DashboardScreen.css'

const DashboardScreen = () =>
{
  const { userInfo } = useSelector(state => state.auth)

  //==========Get all courses to check OU progress==================================
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAllCoursesQuery()

  let coursesContent
  let coursesCompleted
  let coursesNotCompleted
  let progress = []

  if (isLoading)
  {
    coursesContent = <p>Loading...</p>
    coursesCompleted = <p>Loading...</p>
    coursesNotCompleted = <p>Loading...</p>
  } else if (isSuccess)
  {
    courses.map(course => (
      course.videos.map(vid => (
        progress.push(vid)
      ))
    ))

    coursesContent = (
      <div className="content">
        <h1 className="subheading">Courses</h1>
        {
          courses.map(course => (
            <Link className='content-link' key={ course._id } to='/courses'>
              <span className="course-title">
                <h1>{ course.title }</h1>
                {
                  userInfo.omniUProgress.coursesComplete.includes(course._id) ?
                    <FaCheck style={ { color: 'green' } } />
                    :
                    <FaXmark style={ { color: 'var(--main-red)' } } />
                }
              </span>
              {
                course.videos.map(vid => (
                  <span key={ vid._id } className="course-videos">
                    <h3>{ vid.title }</h3>
                    {
                      userInfo.omniUProgress.videosComplete.includes(vid._id) ?
                        <FaCheck style={ { color: 'green' } } />
                        :
                        <FaXmark style={ { color: 'var(--main-red)' } } />
                    }
                  </span>
                ))
              }
            </Link>
          ))
        }
      </div>
    )


    coursesCompleted = (
      courses.map(course => (
        userInfo.omniUProgress.coursesComplete.includes(course._id) &&
        <h2 key={ course._id }>{ course.title }</h2>
      ))
    )

    coursesNotCompleted = (
      courses.map(course => (
        !userInfo.omniUProgress.coursesComplete.includes(course._id) &&
        <Link className='navlink' key={ course._id } to='/courses'>{ course.title }</Link>
      ))
    )
  } else if (isError)
  {
    coursesContent = <p>{ error.error }</p>
    console.log(error)
  }

  //======================calculate % func()==============================
  const percentage = (userInfo.omniUProgress.videosComplete.length * 100) / progress.length

  return (
    <div className='DashboardScreen'>
      <div className="card">
        <div className="card-header">
          <div className="profile-pic">
            <p>{ userInfo.name.firstName.charAt(0) }{ userInfo.name.lastName.charAt(0) }</p>
          </div>
          <div className="header-title">
            <h4>{ userInfo.name.firstName } <span>{ userInfo.name.lastName }</span></h4>
            <div className="progress">
              <h3>{ percentage }% Complete</h3>
              <div className="bar"><span style={ { width: `${ percentage }%` } }></span></div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="userInfo">
            <div className="userInfo-group">
              <div className="title">
                <h4>Name</h4>
              </div>
              <h2>{ userInfo.name.firstName } { userInfo.name.lastName }</h2>
            </div>
            <div className="userInfo-group">
              <div className="title">
                <h4>Date Started Omni U</h4>
              </div>
              <h2>{ new Date(userInfo.createdAt).toDateString() }</h2>
            </div>
            <div className="userInfo-group">
              <div className="title">
                <h4>Last Profile Update</h4>
              </div>
              <h2>{ new Date(userInfo.updatedAt).toDateString() }</h2>
            </div>
            <div className="userInfo-group">
              <div className="title">
                <h4>% Complete</h4>
              </div>
              <h2>{ percentage }%</h2>
            </div>
            <div className="userInfo-group">
              <div className="title">
                <h4>Courses Completed</h4>
              </div>
              {
                coursesCompleted
              }
            </div>
            <div className="userInfo-group">
              <div className="title">
                <h4>Courses Not Completed</h4>
              </div>
              {
                coursesNotCompleted
              }
            </div>
          </div>
          <div className="courses">
            { coursesContent }
          </div>
        </div>
      </div>
    </div>
  )
}

export { DashboardScreen }