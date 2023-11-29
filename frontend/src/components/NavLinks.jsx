import '../css/NavLinks.css'

import { v4 as uuid } from 'uuid'
import { NavLink } from 'react-router-dom'

const NavLinks = ({ links }) =>
{
	return (
		<nav className='NavLinks'>
			{
				links.map(el =>
				{
					return < NavLink key={ uuid() } to={ el } >{ el }</NavLink>
				})
			}
		</nav>
	)
}

export { NavLinks }