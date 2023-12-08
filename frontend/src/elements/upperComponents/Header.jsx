import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowRightToBracket, FaArrowRightFromBracket, FaRegCircleUser } from 'react-icons/fa6'
import { toast } from 'react-toastify'

import { useLogoutMutation } from '../../slices/usersApiSlice'
import { removeCredentials } from '../../slices/authSlice'

import '../css/Header.css'

const Header = () =>
{
	// initiate userInfo from state.auth
	const { userInfo } = useSelector((state) => state.auth)

	//set dispatch and navigate func()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	//initiate useLogoutMutation 
	const [ logout ] = useLogoutMutation()

	//logout handler func()
	const logoutHandler = async () =>
	{
		try
		{
			await logout().unwrap()
			dispatch(removeCredentials())
			navigate('/')
			toast.success('Logged Out Successfully')
		} catch (err)
		{
			toast.error(err)
		}
	}

	return (
		<header className='Header'>
			<nav>
				<div className='brand flex-start'>
					<Link to='/'>
						<img src="/OCE_Shade.svg" alt="OCE Logo" />
					</Link>
				</div>
				<div className="navlinks flex-center">
					<NavLink className='navlink' to='/'>Instructions</NavLink>
					<NavLink className='navlink' to='/dashboard'>Dashboard</NavLink>
					<NavLink className='navlink' to='/courses'>Courses</NavLink>
				</div>
				<div className="profile flex-end">
					{ userInfo ?
						<Link className='flex-end' onClick={ logoutHandler }>
							<p>Sign Out</p>
							<FaArrowRightFromBracket />
						</Link>
						:
						<Link className='flex-end' to='/login'>
							<p>Sign In</p>
							<FaArrowRightToBracket />
						</Link>
					}
				</div>
			</nav>
		</header>
	)
}

export { Header }
