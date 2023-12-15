import '../css/SelectField.css'

const SelectField = ({ disabled, options, stateHandler }) =>
{
  return (
    <div className='SelectField'>
      <select required onChange={ stateHandler }>
        <option value="">{ disabled }</option>
        {
          options.map((opt, index) => (
            <option key={ index } value={ opt }>{ opt }</option>
          ))
        }
      </select>
    </div >
  )
}

export { SelectField }