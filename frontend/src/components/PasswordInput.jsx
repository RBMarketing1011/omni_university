import '../css/PasswordInput.css'

const PasswordInput = ({ handleState, passwordState }) =>
{

	return (
		<div className='PasswordInput'>
			<input type="password" value={ passwordState } name='password' placeholder='Password' required onChange={ handleState } />
		</div>
	)
}

export { PasswordInput }