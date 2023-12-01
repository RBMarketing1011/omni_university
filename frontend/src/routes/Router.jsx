//Main App
import App from '../App.jsx'

//Route Pages
import { HomePage } from '../pages/HomePage.jsx'
import { LoginPage } from '../pages/LoginPage.jsx'
import { Dashboard } from '../pages/Dashboard.jsx'

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
			< Route path='/dashboard' element={ < Dashboard /> } />
		</Route>
	)
)

export { router }