import '../css/Header.css'

import { NavLinks } from './NavLinks'
import { Link } from 'react-router-dom'

import { FaArrowRightToBracket } from "react-icons/fa6"


const Header = () =>
{
	return (
		<header className='Header background-red'>
			<div className="container">
				<a href='/' className="brand"><img src="/OCE-Shade.svg" alt="" /></a>
				< NavLinks links={ [ 'Courses', 'Dashboard', 'On Boarding' ] } />
				< Link to='/login' >< FaArrowRightToBracket size={ 25 } /></Link>
			</div>
		</header>
	)
}

export { Header }