import '../css/CustomForm.css'

import { Form } from 'react-router-dom'
import { useState } from 'react'

import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'

const CustomForm = ({ heading, subheading, action, method }) =>
{
	const [ input, setInput ] = useState({ email: '', password: '' })
	const stateChange = (e) =>
	{
		setInput({ ...input, [ e.target.name ]: e.target.value })
	}

	const submitForm = async (e) =>
	{
		e.preventDefault()
		console.log('submitted')
	}
	return (
		<div className='CustomForm'>
			<div className="heading-container">
				<h4>{ subheading }</h4>
				<h1>{ heading }</h1>
			</div>

			< Form method={ method } action={ action } onSubmit={ submitForm } >
				<div className="form-container">
					< EmailInput handleState={ (e) => stateChange(e) } />
					< PasswordInput handleState={ (e) => stateChange(e) } />
				</div>

				<button type='submit' className='background-red btn-primary' >Sign In</button>

			</Form>
		</div >
	)
}

export { CustomForm }