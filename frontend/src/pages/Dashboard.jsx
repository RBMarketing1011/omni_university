import '../css/Dashboard.css'

import { useSelector, useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { FaPlus, FaXmark, FaFloppyDisk, FaRegEye, FaRegTrashCan } from 'react-icons/fa6'


import { TextInputName } from '../components/TextInputName'
import { EmailInput } from '../components/EmailInput'
import { PasswordInput } from '../components/PasswordInput'
import { Spinner } from '../components/Spinner'

import { useRegisterMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'

const Dashboard = () =>
{
	const { userInfo } = useSelector((state) => state.auth)
	// Setting Navigate and Dispatch Func() to a variable for ease of use
	const navigate = useNavigate()
	const dispatch = useDispatch()

	// Call Slices for Our Routes and Handle Loading State
	const [ register, { isLoading } ] = useRegisterMutation()

	// Handle Form Submission
	const submitAddUserForm = async (e) =>
	{
		e.preventDefault()
		alert('click')
		// try {
		// 	const res = await login({ email, password }).unwrap()
		// 	dispatch(setCredentials({ ...res }))
		// 	navigate('/')
		// } catch (err) {
		// 	toast.error(err?.data?.message || err.message)
		// 	console.log(err.data.stack)
		// }
	}

	//Users Dialog DOM manipulation
	const usersDialogRef = useRef(null)
	const [ open, setOpen ] = useState(false)

	const openDialog = () =>
	{
		if (open) {
			usersDialogRef.current.close()
			setOpen(!open)
		} else {
			usersDialogRef.current.show()
			setOpen(!open)
		}
	}

	//Add Users Dialog DOM manipulation
	const addUsersDialogRef = useRef(null)
	const [ addUsersOpen, setAddUsersOpen ] = useState(false)

	const addUsersHandler = () =>
	{
		if (addUsersOpen) {
			addUsersDialogRef.current.close()
			setAddUsersOpen(!addUsersOpen)
		} else {
			addUsersDialogRef.current.show()
			setAddUsersOpen(!addUsersOpen)
		}
	}

	//Add Users State Management
	const [ firstName, setFirstName ] = useState('')
	const [ lastName, setLastName ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')

	const firstNameHandler = (e) =>
	{
		setFirstName(e.target.value)
	}

	const lastNameHandler = (e) =>
	{
		setLastName(e.target.value)
	}

	const emailHandler = (e) =>
	{
		setEmail(e.target.value)
	}

	const passwordHandler = (e) =>
	{
		setPassword(e.target.value)
	}


	return (
		<div className='Dashboard'>
			<nav className="dashboard-nav">
				<h4 className='nav-header'>{ userInfo.role } Dashboard</h4>
				<div className="nav-content">
					<div className="nav-links">
						{ userInfo.role.includes('admin') &&
							<>
								<li><a href='#' onClick={ openDialog }>Users</a></li>
								<li><a href="#">Courses</a></li>
								<li><a href="#">Videos</a></li>
								<li><a href="#"></a></li>
								<li><a href="#"></a></li>
								<li><a href="#"></a></li>
							</>
						}
					</div>
				</div>
			</nav>

			{/*Dialog Boxes For Secondary nav*/ }
			<dialog className="users" ref={ usersDialogRef }>
				<div className="users-content">
					<div className="users-header">
						<div className="close"><a href='#' className='close-icon' onClick={ openDialog }>< FaXmark size={ 20 } /></a></div>
						<h1 className="heading">Users</h1>
					</div>
					<div className="users-body">
						<ul className="body-list">
							<li className="list-item">
								<p className="list-content">Anthony Reynolds</p>
								<div className="list-icons">
									< FaRegEye />
									< FaRegTrashCan />
								</div>
							</li>
							<li className="list-item">
								<p className="list-content">Chris Floyd</p>
								<div className="list-icons">
									< FaRegEye />
									< FaRegTrashCan />
								</div>
							</li>
							<li className="list-item">
								<p className="list-content">Art Tobon</p>
								<div className="list-icons">
									< FaRegEye />
									< FaRegTrashCan />
								</div>
							</li>
							<li className="list-item">
								<p className="list-content">Josh Norman</p>
								<div className="list-icons">
									< FaRegEye />
									< FaRegTrashCan />
								</div>
							</li>
							<li className="list-item">
								<p className="list-content">Greg Walker</p>
								<div className="list-icons">
									< FaRegEye />
									< FaRegTrashCan />
								</div>
							</li>
							<li className="list-item">
								<p className="list-content">Sophia White</p>
								<div className="list-icons">
									< FaRegEye />
									< FaRegTrashCan />
								</div>
							</li>
						</ul>
					</div>
					<div className="users-footer">
						<div className="icons">
							<div className="icon btn-form" onClick={ addUsersHandler }>
								<p>Add User</p>
								< FaPlus />
							</div>
						</div>
					</div>
				</div>
			</dialog>

			{/* Add Users Dialog Box */ }
			<dialog className='addUser' ref={ addUsersDialogRef }>
				<div className="users-content">
					<div className="users-header">
						<div className="close"><a href='#' className='close-icon' onClick={ addUsersHandler }>< FaXmark size={ 20 } /></a></div>
						<h1 className="heading">Add User</h1>
					</div>
					< Form className='addUserForm' action='/api/users/register' method='POST' onSubmit={ submitAddUserForm } >
						<div className="form-content">
							<div className="form-item">
								< TextInputName handleFirstNameState={ (e) => firstNameHandler(e) } handleLastNameState={ (e) => lastNameHandler(e) } firstNameState={ firstName } lastNameState={ lastName } />
							</div>
							<div className="form-item">
								< EmailInput handleState={ emailHandler } emailState={ email } />
							</div>
							<div className="form-item">
								< PasswordInput handleState={ passwordHandler } passwordState={ password } />
							</div>
							<div className="form-item">
								<div class="control">
									<h3>Role:</h3>
									<div className="control-item">
										<input id='employee' type="radio" name="foobar" />
										<label class="radio" htmlFor='employee'>
											Employee
										</label>
									</div>
									<div className="control-item">
										<input id='lead' type="radio" name="foobar" />
										<label htmlFor='lead' class="radio">
											Lead
										</label>
									</div>
									<div className="control-item">
										<input id='manager' type="radio" name="foobar" />
										<label htmlFor='manager' class="radio">
											Manager
										</label>
									</div>
									<div className="control-item">
										<input id='admin' type="radio" name="foobar" />
										<label htmlFor='admin' class="radio">
											Admin
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="users-footer">
							<div className="icons">
								<div className="icon btn-form" onClick={ addUsersHandler }>
									<p>Close</p>
									< FaXmark />
								</div>
								<div className="icon btn-form">
									<button type='submit' className="btn-form">
										<p>Save</p>
										< FaFloppyDisk />
									</button>
								</div>
							</div>
						</div>

					</Form>
				</div>
			</dialog>
		</div>
	)
}

export { Dashboard }