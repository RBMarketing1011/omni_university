import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//Router Config Files
import { router } from './routes/Router'
import { RouterProvider } from 'react-router-dom'

//Redux Store Config Files
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  < Provider store={ store } >
    <React.StrictMode>
      < RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
)
