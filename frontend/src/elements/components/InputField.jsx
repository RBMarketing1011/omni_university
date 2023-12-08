import '../css/InputField.css'

const InputField = ( { placeholder, type, state, onChangeHandler } ) =>
{
  return (
    <div className='InputField'>
      <input placeholder={ placeholder } type={ type } name={ type } value={ state } onChange={ onChangeHandler } required />
    </div>
  )
}

export { InputField }