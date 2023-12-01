import '../css/EmailInput.css'

const EmailInput = ({ handleState, emailState }) =>
{
	return (
		<div className='EmailInput'>
			<input type="email" value={ emailState } name='email' placeholder='Email' required onChange={ handleState } />
		</div>
	)
}

export { EmailInput }