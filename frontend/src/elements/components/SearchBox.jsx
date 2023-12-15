import { FaMagnifyingGlass } from 'react-icons/fa6'

import '../css/SearchBox.css'

const SearchBox = ({ state, stateHandler, placeholder }) =>
{
  return (
    <div className='SearchBox'>
      <p className="search-btn"><FaMagnifyingGlass /></p>
      <input className='search' type="text" placeholder={ placeholder } name='search' value={ state } onChange={ stateHandler } />
    </div>
  )
}

export { SearchBox }