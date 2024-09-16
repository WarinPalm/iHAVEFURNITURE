import{createBrowserRouter, RouterProvider, Route, Link} from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './CSS/header.css'
import './CSS/hero-image.css'
import './CSS/style.css'
import './CSS/loginModal.css'

import Home from './components/home.jsx'
import ViewAll from './components/viewall.jsx'
import Register from './components/register.jsx';
import Cart from './components/Cart.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "viewall",
    element:<ViewAll/>
  },
  {
    path: "register",
    element:<Register/>
  },
  {
    path: "cart",
    element:<Cart/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
  