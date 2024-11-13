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
import SearchProduct from './components/SearchProduct.jsx';
import New from './components/New.jsx';
import AdminUserData from './components/admin_user_data.jsx';
import AdminCatalog from './components/Admin_catalog.jsx';
import AdminTransfer from './components/Admin_transfer.jsx';
import AdminOrder from './components/Admin_order.jsx';
import Adminproduct from './components/Admin_product.jsx';

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
    path: "searchProduct",
    element:<SearchProduct/>
  },
  
  {
    path: "smokeweed",
    element:<New/>
  },

  {
    path: "userData",
    element:<AdminUserData/>
  },

  {
    path: "catalog",
    element:<AdminCatalog/>
  },

  {
    path: "transfer",
    element:<AdminTransfer/>
  },

  {
    path: "order",
    element:<AdminOrder/>
  },

  {
    path: "product",
    element:<Adminproduct/>
  }
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
  