import '../css/TextInputName.css'

const TextInputName = ({ handleFirstNameState, handleLastNameState, firstNameState, lastNameState }) =>
{
	return (
		<div className='TextInputName'>
			<input type="text" name='firstName' value={ firstNameState } placeholder='First Name' onChange={ handleFirstNameState } required />
			<input type="text" name='lastName' value={ lastNameState } placeholder='Last Name' onChange={ handleLastNameState } required />
		</div>
	)
}

export { TextInputName }