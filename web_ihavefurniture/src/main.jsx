import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import{createBrowserRouter, RouterProvider, Route, Link} from 'react-router-dom'

import Home from './components/home.jsx'
import ViewAll from './components/viewall.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "viewall",
    element:<ViewAll/>
  }
]);


import './CSS/header.css'
import './CSS/hero-image.css'
import './CSS/style.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
  