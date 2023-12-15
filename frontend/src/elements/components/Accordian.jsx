import { useRef } from 'react'
import { useSelector } from 'react-redux'

import { FaPlus, FaCircleXmark, FaCheck } from 'react-icons/fa6'

import '../css/Accordian.css'

const Accordian = ({ name, content, func }) =>
{
  //=================== INITIATE USERINFO SO I CAN CHECK VIDEO AND COURSE COMPLETE=====================
  const { userInfo } = useSelector(state => state.auth)

  // ======================== USEREF TO TOGGLE DROPDOWN ACCORDIAN ===================================
  const contentRef = useRef(null)

  const accordianHandler = () =>
  {
    contentRef.current.classList.toggle('active')
  }

  return (
    <div className='Accordian'>
      <div className="group-title" onClick={ (e) => { accordianHandler(e) } }>
        <h2>{ name }</h2>
        <FaPlus />
      </div>

      <div className="group-content" ref={ contentRef }>

        {
          content.map(content => (
            <div key={ content._id } className="vid" onClick={ () => func(content, name) }>
              <h4>{ content.title }</h4>

              {
                userInfo.omniUProgress.videosComplete.includes(content._id) ?
                  <FaCheck style={ { color: 'green' } } />
                  :
                  <FaCircleXmark style={ { color: 'var(--main-red)' } } />
              }

            </div>
          ))
        }

      </div>

    </div>
  )
}

export { Accordian }