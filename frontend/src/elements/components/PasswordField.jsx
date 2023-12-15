import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { useState } from 'react'

import '../css/PasswordField.css'

const PasswordField = ({ placeholder, state, onChangeHandler }) =>
{
  const [ viewPassword, setViewPassword ] = useState(false)
  const [ inputType, setInputType ] = useState('password')
  const changeInputType = () =>
  {
    if (viewPassword)
    {
      setInputType('password')
      setViewPassword(!viewPassword)
    } else
    {
      setInputType('text')
      setViewPassword(!viewPassword)
    }
  }

  return (
    <div className='PasswordField'>
      <input placeholder={ placeholder } type={ inputType } name='password' value={ state } onChange={ onChangeHandler } required />
      {
        viewPassword ?
          <FaEyeSlash size={ 25 } onClick={ changeInputType } />
          :
          <FaEye size={ 25 } onClick={ changeInputType } />
      }
    </div>
  )
}

export { PasswordField }