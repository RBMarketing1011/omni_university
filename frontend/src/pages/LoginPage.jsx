import '../css/LoginPage.css'

import { CustomForm } from '../components/CustomForm'



const LoginPage = () =>
{
	return (
		< CustomForm heading='Login To Omni University' subheading='Ready To Learn' action='/api/users/login' method='post' />
	)
}

export { LoginPage }