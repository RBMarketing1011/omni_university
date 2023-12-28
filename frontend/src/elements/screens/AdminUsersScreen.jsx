import { FaTrash, FaPenToSquare, FaPlus, FaMagnifyingGlass } from 'react-icons/fa6'
import { useState } from 'react'
import { Form } from 'react-router-dom'
import { toast } from 'react-toastify'

import
{
  useGetAllUserProfilesQuery,
  useUpdateUserMutation,
  useRegisterMutation,
  useDeleteUserMutation
} from '../../slices/usersApiSlice'

import { InputField } from '../components/InputField'
import { PasswordField } from '../components/PasswordField'
import { SelectField } from '../components/SelectField'
import { SearchBox } from '../components/SearchBox'

import '../css/AdminUsersScreen.css'
import { useSelector } from 'react-redux'

const AdminUsersScreen = () =>
{
  const { userInfo } = useSelector(state => state.auth)

  let isAuth
  if (userInfo)
  {
    isAuth = userInfo.role.includes('admin') || userInfo.role.includes('manager')
  }
  //============================Users CRUD Ops =====================

  //========================================================Search Box Handler ===================
  const [ search, setSearch ] = useState('')

  const searchBoxHandler = (e) =>
  {
    setSearch(e.target.value)
  }
  //============================================================Get All Users Data====================
  const {
    data: users,
    isLoading: loadingProfiles,
    isSuccess: usersSuccess,
    isError: usersIsError,
    error: usersError,
    refetch: refetchUsers
  } = useGetAllUserProfilesQuery()

  let allUsersContent

  if (loadingProfiles)
  {
    allUsersContent = <h3>Loading...</h3>
  } else if (usersSuccess)
  {
    let filtered = users.allUsers.filter((user) =>
    (
      user.name.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.name.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    ))

    allUsersContent =
      (
        <>

          {
            filtered.map(user => (
              <div key={ user._id } className="user">
                <div className="user-heading">
                  <h2 className='user-name'>{ user.name.firstName } { user.name.lastName }</h2>

                  {
                    isAuth &&
                    <div className="user-icons">
                      <FaPenToSquare size={ 25 } style={ { color: 'var(--light)' } } onClick={ () => editUser(user) } />
                      <FaTrash size={ 25 } style={ { color: 'var(--main-red)' } } onClick={ (e) => deleteUser(user._id) } />
                    </div>
                  }

                </div>
                <div className="user-details">
                  <div className="user-email">
                    <h4>Email</h4>
                    <p>{ user.email }</p>
                  </div>
                  <div className="user-role">
                    <h4>Role</h4>
                    <p>{ user.role }</p>
                  </div>
                  <div className="user-completion">
                    <h4>Completed Omni U</h4>
                    { user.completedOU ? <p>Completed</p> : <p>Not Completed</p> }
                  </div>
                  <div className="user-completed-courses">
                    <h4>Courses Completed</h4>
                    {
                      user.omniUProgress.coursesComplete.length > 0 ?
                        user.omniUProgress.coursesComplete.map((course, index) => (
                          <p key={ index }>{ course.title }</p>
                        ))
                        :
                        <p>No Courses Completed</p>
                    }
                  </div>
                </div>
              </div>
            ))
          }

        </>
      )
  } else if (usersIsError)
  {
    allUsersContent = <h3>{ usersError.error }</h3>
  }

  //======================================================Add User ================================
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ role, setRole ] = useState('')

  //Reset All useState func()
  const resetState = () =>
  {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setRole('')
  }

  const firstnameStateHandler = (e) =>
  {
    setFirstName(e.target.value)
  }

  const lastnameStateHandler = (e) =>
  {
    setLastName(e.target.value)
  }

  const emailStateHandler = (e) =>
  {
    setEmail(e.target.value)
  }

  const passwordStateHandler = (e) =>
  {
    setPassword(e.target.value)
  }

  const roleStateHandler = (e) =>
  {
    setRole(e.target.value)
  }

  const [ registerUser ] = useRegisterMutation()

  const submitRegisterUserForm = async (e) =>
  {
    e.preventDefault()

    try
    {
      await registerUser({ firstName, lastName, email, password, role }).unwrap()
      resetState()
      refetchUsers()
      toast.success('Added New User Successfully')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
    }
  }

  //========================================================UPDATE USER============================
  const [ editUserMutation ] = useUpdateUserMutation()

  const [ openEditUser, setOpenEditUser ] = useState(false)

  const [ userId, setUserId ] = useState('')

  const setState = (user) =>
  {
    setFirstName(user.name.firstName)
    setLastName(user.name.lastName)
    setEmail(user.email)
    setRole(user.role)
  }

  const editUser = (user) =>
  {
    setState(user)
    setOpenEditUser(true)
    setUserId(user._id)
  }

  const closeUpdateUser = () =>
  {
    resetState()
    setOpenEditUser(false)
  }

  const submitEditUserForm = async (e) =>
  {
    e.preventDefault()

    try
    {
      await editUserMutation({ id: userId, firstName, lastName, email, role }).unwrap()
      resetState()
      setUserId('')
      setOpenEditUser(false)
      refetchUsers()
      toast.success('User Updated Successfully')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
    }
  }

  //========================================================DELETE USER ============================ 
  const [ deleteUserMutation ] = useDeleteUserMutation()

  const deleteUser = async (id) =>
  {
    try
    {
      await deleteUserMutation({ id }).unwrap()
      refetchUsers()
      toast.success('Deleted User Successfully')
    } catch (err)
    {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className='AdminUsersScreen'>
      <div className="display-container">
        <div className="users-heading">
          <h1 className='heading'>Omni U <span>Users</span></h1>
        </div>
        <SearchBox placeholder='Search Users' state={ search } stateHandler={ (e) => searchBoxHandler(e) } />
        <div className="users-content">

          { allUsersContent }

        </div>
      </div>

      {
        isAuth &&
        <div className="card">
          <div className="card-header">
            <div className="profile-pic">
              <p>OU</p>
            </div>
            <div className="header-title">

              {
                openEditUser ?
                  <h4>Edit User</h4>
                  :
                  <h4>Create User</h4>
              }

            </div>
          </div>
          <div className="card-body">

            {
              openEditUser ?

                <Form className='card-form' onSubmit={ (e) => submitEditUserForm(e) }>
                  <div className="card-container">
                    <div className="form-group" style={ { marginTop: '0' } }>
                      <div className="title">
                        <h4>Firstname</h4>
                      </div>
                      <div className="content">
                        < InputField placeholder='First Name' type='text' state={ firstName } onChangeHandler={ (e) => firstnameStateHandler(e) } />
                      </div>
                    </div>
                    <div className="form-group" style={ { marginTop: '0' } }>
                      <div className="title">
                        <h4>Lastname</h4>
                      </div>
                      <div className="content">
                        < InputField placeholder='Last Name' type='text' state={ lastName } onChangeHandler={ (e) => lastnameStateHandler(e) } />
                      </div>
                    </div>
                    <div className="form-group" style={ { marginTop: '0' } }>
                      <div className="title">
                        <h4>Email</h4>
                      </div>
                      <div className="content">
                        < InputField placeholder='Email' type='email' state={ email } onChangeHandler={ (e) => emailStateHandler(e) } />
                      </div>
                    </div>
                    <div className="form-group" style={ { marginTop: '0' } }>
                      <div className="title">
                        <h4>Role</h4>
                      </div>
                      <div className="content">

                        <SelectField
                          stateHandler={ (e) => roleStateHandler(e) }
                          options={ [
                            'employee',
                            'lead',
                            'manager',
                            'admin'
                          ] }
                          disabled='Choose A Role'
                        />

                      </div>
                    </div>
                  </div>
                  <div className="btn-group">
                    <button type='submit' className='btn-primary'>Save Changes</button>
                    <a className='btn-primary' onClick={ closeUpdateUser }>Close</a>
                  </div>
                </Form>

                :

                <Form className='card-form' onSubmit={ (e) => submitRegisterUserForm(e) }>
                  <div className="card-container">
                    <div className="form-group" style={ { marginTop: '0' } }>
                      <div className="title">
                        <h4>Firstname</h4>
                      </div>
                      <div className="content">
                        < InputField placeholder='First Name' type='text' state={ firstName } onChangeHandler={ (e) => firstnameStateHandler(e) } />
                      </div>
                    </div>
                    <div className="form-group" style={ { marginTop: '0' } }>
                      <div className="title">
                        <h4>Lastname</h4>
                      </div>
                      <div className="content">
                        < InputField placeholder='Last Name' type='text' state={ lastName } onChangeHandler={ (e) => lastnameStateHandler(e) } />
                      </div>
                    </div>
                    <div className="form-group" style={ { marginTop: '0' } }>
                      <div className="title">
                        <h4>Email</h4>
                      </div>
                      <div className="content">
                        < InputField placeholder='Email' type='email' state={ email } onChangeHandler={ (e) => emailStateHandler(e) } />
                      </div>
                    </div>
                    <div className="form-group" style={ { marginTop: '0' } }>
                      <div className="title">
                        <h4>Password</h4>
                      </div>
                      <div className="content">
                        <PasswordField placeholder='Password' state={ password } onChangeHandler={ (e) => passwordStateHandler(e) } />
                      </div>
                    </div>
                    <div className="form-group" style={ { marginTop: '0' } }>
                      <div className="title">
                        <h4>Role</h4>
                      </div>
                      <div className="content">

                        <SelectField
                          stateHandler={ (e) => roleStateHandler(e) }
                          options={ [
                            'employee',
                            'lead',
                            'manager',
                            'admin'
                          ] }
                          disabled='Choose A Role'
                        />

                      </div>
                    </div>
                  </div>
                  <div className="btn-group">
                    <button type='submit' className='btn-primary'>Add New User</button>
                  </div>
                </Form>
            }

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
      }

    </div>
  )
}

export { AdminUsersScreen }