import '../css/Header.css'

import { NavLinks } from './NavLinks'
import { Link, Form, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { FaArrowRightToBracket, FaRegCircleUser, FaXmark, FaSquareCheck, FaRegPenToSquare } from "react-icons/fa6"
import { useSelector, useDispatch } from 'react-redux'

import { useLogoutMutation, useUpdateUserMutation } from '../slices/usersApiSlice'
import { removeCredentials, setCredentials } from '../slices/authSlice'

import { toast } from 'react-toastify'


const Header = () =>
{
	//Get userInfo data from redux auth slice stored in localStorage
	const { userInfo } = useSelector((state) => state.auth)

	//State for UpdateUser Form
	const [ firstName, setFirstName ] = useState(userInfo ? userInfo.firstName : '')
	const [ lastName, setLastName ] = useState(userInfo ? userInfo.lastName : '')
	const [ email, setEmail ] = useState(userInfo ? userInfo.email : '')

	//State change functions
	const firstNameChange = (e) =>
	{
		setFirstName(e.target.value)
	}

	const lastNameChange = (e) =>
	{
		setLastName(e.target.value)
	}

	const emailChange = (e) =>
	{
		setEmail(e.target.value)
	}

	//DOM manipulation
	const sidebarRef = useRef(null)
	const formRef = useRef(null)

	const [ sidebarState, setSidebarState ] = useState(false)

	const sidebarHandler = () =>
	{
		if (sidebarState) {
			sidebarRef.current.style.right = '-280px'
			setSidebarState(!sidebarState)
		} else {
			sidebarRef.current.style.right = '0px'
			setSidebarState(!sidebarState)
		}
	}

	//Update User Info Form And State
	const [ updateUserInfo, setUpdateUserInfo ] = useState(false)
	const updateUserFormHandler = () =>
	{
		if (!updateUserInfo) {
			formRef.current.style.left = '5px'
			setUpdateUserInfo(!updateUserInfo)
		} else {
			formRef.current.style.left = '270px'
			setUpdateUserInfo(!updateUserInfo)
		}
	}

	//Setting Navigate and Dispatch Func()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	//Logout func() to remove all credentials and jwt token
	const [ logout ] = useLogoutMutation()

	const logoutUser = async () =>
	{
		try {
			await logout().unwrap()
			dispatch(removeCredentials())
			navigate('/')
		} catch (err) {
			toast.error(err.data.message)
		}
	}

	//update user form submission and handling
	const [ updateUser, { isLoading } ] = useUpdateUserMutation()

	const formHandler = async (e) =>
	{
		e.preventDefault()
		console.log(firstName + ' ' + lastName + ' ' + email)
		try {
			const res = await updateUser({ fitsName, lastName, email }).unwrap()
			dispatch(setCredentials({ ...res }))
		} catch (err) {
			toast.error(err)
		}
	}


	return (
		<header className='Header background-red'>
			<nav className="container">
				<a href='/' className="brand"><img src="/OCE-Shade.svg" alt="" /></a>
				{
					userInfo && < NavLinks links={ [ 'Courses', 'Dashboard', 'On Boarding' ] } />
				}
				<div className="account-container">
					{ userInfo ?
						(
							<>
								<div className="account" >
									<p onClick={ logoutUser } >Log Out</p>
									<div className="open-sidebar-nav" onClick={ sidebarHandler } >
										<p>Profile</p>< FaRegCircleUser size={ 20 } />
									</div>
								</div>
								<div className="account-details sidebar" ref={ sidebarRef }>
									<div className="close">< FaXmark size={ 20 } onClick={ sidebarHandler } /></div>
									<h3 className="welcome">Welcome Back, { userInfo.firstName }</h3>
									<div className="details">
										<ul className="details-course-completion-list">
											<h2 className='sidebar-heading'>Courses Completed</h2>
											<li><p>Course 1</p>< FaSquareCheck /></li>
											<li><p>Course 2</p>< FaSquareCheck /></li>
											<li><p>Course 3</p>< FaSquareCheck /></li>
											<li><p>Course 4</p>< FaSquareCheck /></li>
										</ul>
										<div className="user-info">
											<h2 className='sidebar-heading'>User Info</h2>
											<p>{ userInfo.name }</p>
											<p>{ userInfo.email }</p>
											<p>{ userInfo.role }</p>
										</div>
										<div className="change-details" >
											< Form method='PUT' action={ '/api/users/' + userInfo._id } className='form' ref={ formRef } onSubmit={ (e) => formHandler(e) } >
												<div className="form-input">
													<label htmlFor="firstName">First Name</label>
													<input type="text" id='firstName' name='firstName' value={ firstName } onChange={ (e) => firstNameChange(e) } />
												</div>
												<div className="form-input">
													<label htmlFor="lastName">Last Name</label>
													<input type="text" id='lastName' name='lastName' value={ lastName } onChange={ (e) => lastNameChange(e) } />
												</div>
												<div className="form-input">
													<label htmlFor="email">Email</label>
													<input type="email" id='email' name='email' value={ email } onChange={ (e) => emailChange(e) } />
												</div>
												<div className="btn-group">
													<a className='btn-form' onClick={ updateUserFormHandler } >Close</a>
													<button type='submit' className='btn-form' >Save Changes</button>
												</div>
											</Form>
											<a className="detailsBtn" onClick={ updateUserFormHandler }>
												<p>Change Account Details</p>
												< FaRegPenToSquare size={ 20 } />
											</a>
										</div>
									</div>
								</div>
							</>
						)
						:
						(
							<>
								< Link to='/login' ><p>Sign In</p>< FaArrowRightToBracket size={ 20 } /></Link>
							</>
						)
					}

				</div >
			</nav >
		</header >
	)
}

export { Header }