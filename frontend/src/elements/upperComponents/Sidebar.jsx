import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'


import
{
  FaBars,
  FaXmark,
  FaHouseChimney,
  FaChartColumn,
  FaBook,
  FaRegCircleUser,
  FaArrowRightFromBracket,
  FaUser,
  FaVideo
} from 'react-icons/fa6'

import { useLogoutMutation } from '../../slices/usersApiSlice'
import { removeCredentials } from '../../slices/authSlice'

import '../css/Sidebar.css'

const Sidebar = () =>
{
  //initiate userInfo from state.auth
  const { userInfo } = useSelector(state => state.auth)

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
      toast.error(err)
    }
  }

  //sidebar state
  const [ sidebar, setSidebar ] = useState(true)

  const sidebarHandler = () =>
  {
    if (sidebar)
    {
      setSidebar(!sidebar)
    } else
    {
      setSidebar(!sidebar)
    }
  }

  return (
    <>
      {
        userInfo &&
        <nav className={ `Sidebar ${ sidebar ? 'close' : '' }` }>
          <header>
            <div className="image-text">
              <span className="sidebar-logo">
                <div className="logo flex-center">OU</div>
              </span>
              <div className="text header-text">
                <span className="firstName">Omni</span>
                <span className="lastName">University</span>
              </div>
            </div>
            <a className="icon" onClick={ sidebarHandler }>
              {
                sidebar ?
                  < FaBars className='toggle' size={ 25 } />
                  :
                  < FaXmark className='toggle' size={ 25 } />
              }
            </a>
          </header>

          <div className="menu-bar">
            <div className="menu">
              <ul className="menu-links">
                <NavLink className='sidebar-link' to='/'>
                  <li>
                    <FaHouseChimney className='icon' size={ 20 } />
                    <span className="text nav-text">Home</span>
                  </li>
                </NavLink>
                <NavLink className='sidebar-link' to='/dashboard'>
                  <li>
                    <FaChartColumn className='icon' size={ 20 } />
                    <span className="text nav-text">Dashboard</span>
                  </li>
                </NavLink>
                <NavLink className='sidebar-link' to='/courses'>
                  <li>
                    <FaBook className='icon' size={ 20 } />
                    <span className="text nav-text">Courses</span>
                  </li>
                </NavLink>
              </ul>
            </div>

            {
              userInfo.role.includes('admin') &&

              <div className="menu">
                <h4 className="menu-heading text-center">Admin</h4>
                <NavLink className='sidebar-link' to='/admin/users'>
                  <li>
                    <FaUser className='icon' size={ 20 } />
                    <span className="text nav-text">Users</span>
                  </li>
                </NavLink>
                <NavLink className='sidebar-link' to='/admin/courses'>
                  <li>
                    <FaBook className='icon' size={ 20 } />
                    <span className="text nav-text">Courses</span>
                  </li>
                </NavLink>
              </div>
            }

            <div className="userInfo">
              <NavLink className='sidebar-link' to='/profile/edit'>
                <li className='info'>
                  <FaUser className='icon' size={ 20 } />
                  <span className="text nav-text">User Info</span>
                </li>
              </NavLink>
              <div className='text'>
                <p className="info-label">Name</p>
                <p className="section-info">{ userInfo.name }</p>
                <p className="info-label">Email</p>
                <p className="section-info">{ userInfo.email }</p>
                <p className="info-label">Role</p>
                <p className="section-info">{ userInfo.role }</p>
              </div>
            </div>

            <div className="bottom-content">
              <NavLink className='sidebar-link' to='/profile/view'>
                <li>
                  <FaRegCircleUser className='icon' size={ 20 } />
                  <span className="text nav-text">Profile</span>
                </li>
              </NavLink>
              <Link className='sidebar-link' onClick={ logoutHandler }>
                <li>
                  <FaArrowRightFromBracket className='icon' size={ 20 } />
                  <span className="text nav-text">Sign Out</span>
                </li>
              </Link>
            </div>
          </div>
        </nav>
      }
    </>
  )
}

export { Sidebar }