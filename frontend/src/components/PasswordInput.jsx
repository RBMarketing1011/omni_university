import '../css/PasswordInput.css'

const PasswordInput = ({ handleState }) =>
{

	return (
		<div className='PasswordInput'>
			<input type="password" value={ handleState.password } name='password' placeholder='Password' required onChange={ handleState } />
		</div>
	)
}

export { PasswordInput }