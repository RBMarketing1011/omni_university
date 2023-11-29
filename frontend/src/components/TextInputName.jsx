import '../css/TextInputName.css'

import { useState } from 'react'

const TextInputName = () =>
{
	const [ input, setInput ] = useState({ firstName: '', lastName: '' })
	const inputChange = (e) =>
	{
		setInput(
			{ ...input, [ e.target.name ]: e.target.value })
	}
	return (
		<div className='TextInputName'>
			<input type="text" name='firstName' value={ input.firstName } placeholder='First Name' onChange={ (e) => inputChange(e) } />
			<input type="text" name='lastName' value={ input.lastName } placeholder='Last Name' onChange={ (e) => inputChange(e) } />
		</div>
	)
}

export { TextInputName }