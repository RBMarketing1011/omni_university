import
{
	createBrowserRouter,
	createRoutesFromElements,
	Route
} from 'react-router-dom'

import { HomeScreen } from '../elements/screens/HomeScreen'
import { LoginScreen } from '../elements/screens/LoginScreen'
import { DashboardScreen } from '../elements/screens/DashboardScreen'
import { CoursesScreen } from '../elements/screens/CoursesScreen'
import { ProfileScreen } from '../elements/screens/ProfileScreen'
import { EditProfileScreen } from '../elements/screens/EditProfileScreen'
import { AdminUsersScreen } from '../elements/screens/AdminUsersScreen'
import { AdminCoursesScreen } from '../elements/screens/AdminCoursesScreen'

import { PrivateRoutes } from '../elements/upperComponents/PrivateRoutes'
import { AdminRoutes } from '../elements/upperComponents/AdminRoutes'

import App from '../App'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={ <App /> }>
			<Route index={ true } path='/' element={ <HomeScreen /> } />
			<Route path='login' element={ <LoginScreen /> } />

			<Route path='' element={ <PrivateRoutes /> }>
				<Route path='dashboard' element={ <DashboardScreen /> } />
				<Route path='courses' element={ <CoursesScreen /> } />

				<Route path='profile'>
					<Route path='view' element={ <ProfileScreen /> } />
					<Route path='edit' element={ <EditProfileScreen /> } />
				</Route>

				<Route path='' element={ <AdminRoutes /> }>
					<Route path='admin' >
						<Route path='users' element={ <AdminUsersScreen /> } />
						<Route path='courses' element={ <AdminCoursesScreen /> } />
					</Route>
				</Route>
			</Route>
		</Route>
	)
)

export { router }