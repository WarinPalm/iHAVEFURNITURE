import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './CSS/header.css';
import './CSS/hero-image.css';
import './CSS/style.css';
import './CSS/loginModal.css';
import './CSS/footer.css';

import { PriceProvider } from './components/PriceCalculate.jsx';

import Home from './components/home.jsx';
import ViewAll from './components/viewall.jsx';
import Register from './components/register.jsx';
import Cart from './components/Cart.jsx';
import SearchProduct from './components/SearchProduct.jsx';
import BillOrder from './components/BillOrder.jsx';
import History from './components/History.jsx';
import PaymentDetail from './components/PaymentDetail.jsx';
import OrderDetail from './components/OrderDetail.jsx';
import Footer from './components/Footer';
import Test from './components/test.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "viewall",
    element: <ViewAll />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "cart",
    element: <Cart />
  },
  {
    path: "searchProduct",
    element: <SearchProduct />
  },
  {
    path: "billOrder",
    element: <BillOrder />
  },
  {
    path: "history",
    element: <History />
  }
  ,
  {
    path: "paymentDetail",
    element: <PaymentDetail />
  },
  {
    path:"orderDetail",
    element:<OrderDetail/>
  },
  {
    path:"test",
    element:<Test/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PriceProvider>
      <div className="app-container">
        <div className="main-content">
          <RouterProvider router={router} />
        </div>
        <Footer />
      </div>
    </PriceProvider>
  </StrictMode>,
);


