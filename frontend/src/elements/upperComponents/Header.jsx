import { useState, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowRightToBracket, FaArrowRightFromBracket, FaBarsStaggered, FaBars } from 'react-icons/fa6'
import { toast } from 'react-toastify'

import { useLogoutMutation } from '../../slices/usersApiSlice'
import { removeCredentials } from '../../slices/authSlice'

import '../css/Header.css'

const Header = () =>
{
	// initiate userInfo from state.auth
	const { userInfo } = useSelector((state) => state.auth)

	//state and ref for mobile menu 
	const [ menu, setMenu ] = useState(false)
	const navRef = useRef(null)
	const profileRef = useRef(null)

	const menuHandler = () =>
	{
		if (!menu)
		{
			navRef.current.style.left = '0'
			profileRef.current.style.left = '0'
			setMenu(!menu)
		} else
		{
			navRef.current.style.left = '110%'
			profileRef.current.style.left = '110%'
			setMenu(!menu)
		}
	}

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
					<div className="menu">
						<FaBarsStaggered onClick={ menuHandler } />
					</div>
				</div>
				<div className="navlinks flex-center" ref={ navRef }>
					<NavLink className='navlink' to='/' onClick={ menuHandler }>Instructions</NavLink>
					<NavLink className='navlink' to='/dashboard' onClick={ menuHandler }>Dashboard</NavLink>
					<NavLink className='navlink' to='/courses' onClick={ menuHandler }>Courses</NavLink>
				</div>
				<div className="profile flex-end" ref={ profileRef }>
					{ userInfo ?
						<Link className='flex-end' onClick={ () => { logoutHandler(), menuHandler() } }>
							<p>Sign Out</p>
							<FaArrowRightFromBracket />
						</Link>
						:
						<Link className='flex-end' to='/login' onClick={ menuHandler }>
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
