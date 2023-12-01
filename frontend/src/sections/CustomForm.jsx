import '../css/CustomForm.css'

// Import Dependencies from React
import { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Import Slices from files
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

// Import Components from Folders
import { EmailInput } from '../components/EmailInput'
import { PasswordInput } from '../components/PasswordInput'

// React Toastify Flash Messages
import { toast } from 'react-toastify'

const CustomForm = ({ heading, subheading, action, method }) =>
{
	// Set State
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')

	// Handle State Changes
	const emailChange = (e) =>
	{
		setEmail(e.target.value)
	}

	const passwordChange = (e) =>
	{
		setPassword(e.target.value)
	}

	// Setting Navigate and Dispatch Func() to a variable for ease of use
	const navigate = useNavigate()
	const dispatch = useDispatch()

	// Call Slices for Our Routes and Handle Loading State
	const [ login, { isLoading } ] = useLoginMutation()

	// Set UserInfo (we created in authSlice file) to our State in Redux
	const { userInfo } = useSelector((state) => state.auth)

	// Function to Navigate to Home if User Info found
	useEffect(() =>
	{
		if (userInfo) {
			navigate('/')
		}
	}, [ navigate, userInfo ])
	// Handle Form Submission
	const submitForm = async (e) =>
	{
		e.preventDefault()
		try {
			const res = await login({ email, password }).unwrap()
			dispatch(setCredentials({ ...res }))
			navigate('/')
		} catch (err) {
			toast.error(err?.data?.message || err.message)
			console.log(err.data.stack)
		}
	}

	//Return Whats Shown On Screen
	return (
		<section className='CustomForm'>
			<div className="heading-container">
				<h4>{ subheading }</h4>
				<h1>{ heading }</h1>
			</div>

			<Form method={ method } action={ action } onSubmit={ submitForm } >
				<div className="form-container">
					< EmailInput handleState={ (e) => emailChange(e) } state={ email } />
					< PasswordInput handleState={ (e) => passwordChange(e) } state={ password } />
				</div>

				<button type='submit' className='background-red btn-primary' >Sign In</button>

			</Form>
		</section>
	)
}

export { CustomForm }