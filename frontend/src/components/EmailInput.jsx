import '../css/EmailInput.css'

const EmailInput = ({ handleState }) =>
{
	return (
		<div className='EmailInput'>
			<input type="email" value={ handleState.email } name='email' placeholder='Email' required onChange={ handleState } />
		</div>
	)
}

export { EmailInput }