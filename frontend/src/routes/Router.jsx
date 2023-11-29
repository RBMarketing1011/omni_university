//Main App
import App from '../App.jsx'

//Route Pages
import { HomePage } from '../pages/HomePage.jsx'
import { LoginPage } from '../pages/LoginPage.jsx'

import
{
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={ < App /> } >
			< Route index={ true } path='/' element={ < HomePage /> } />
			< Route path='/login' element={ < LoginPage /> } />
		</Route>
	)
)

export { router }