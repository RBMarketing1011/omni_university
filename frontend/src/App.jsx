import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Header } from './elements/upperComponents/Header'
import { Sidebar } from './elements/upperComponents/Sidebar'

import './App.css'

function App ()
{
  return (
    <div className="flex-between-start">
      <Sidebar />
      <div className="flex-center">
        <div className="flex-center-column">
          <Header />
          <ToastContainer />
          <div className="flex-center">
            <div className="page-container">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
