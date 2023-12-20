import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Components/Routes/Router.jsx'
import UserProviders from './Providers/UserProviders.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProviders>
      <RouterProvider router={router} />
    </UserProviders>
  </React.StrictMode>,
)
