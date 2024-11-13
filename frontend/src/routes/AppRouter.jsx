import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// สำหรับ User ที่ยังไม่ได้ล็อคอิน
import Layout from '../Layouts/Layout'
import Home from '../Pages/Home'
import Register from '../Pages/auth/register'
import Login from '../Pages/auth/Login'
import ViewAll from '../Pages/ViewAll'
import QandA from '../Pages/QandA'
import AboutUs from '../Pages/AboutUs'
import SearchProduct from '../Pages/SearchProduct'

// สำหรับ USER
import ProtectRouteUser from './ProtectRouteUser'
import UserLayout from '../Layouts/UserLayout'
import HomeUser from '../Pages/user/HomeUser'
import Cart from '../Pages/user/Cart'
import BillOrder from '../Pages/user/BillOrder'
import OrderDetail from '../Pages/user/OrderDetail'
import PaymentDetail from '../Pages/user/PaymentDetail'
import History from '../Pages/user/History' // เพิ่มการนำเข้า History

// Define the routes
const router = createBrowserRouter([
    {  
        path: '/', 
        element: <Layout />, 
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <Login />},
            { path: 'register', element: <Register />},
            { path: 'viewall', element: <ViewAll />},
            { path: 'q&a', element: <QandA />},
            { path: 'aboutus', element: <AboutUs />},
            { path: 'searchProduct', element: <SearchProduct />}
        ] 
    },
    {
        path: '/user',
        element: <ProtectRouteUser element={<UserLayout />} />,
        children: [
            { index: true, element: <HomeUser /> },
            { path: 'viewall', element: <ViewAll />},
            { path: 'billorder', element: <BillOrder />},
            { path: 'cart', element: <Cart />},
            { path: 'history', element: <History />}, // เพิ่ม History เข้าไปที่นี่
            { path: 'orderdetail', element: <OrderDetail />},
            { path: 'paymentdetail', element: <PaymentDetail />},
            { path: 'q&a', element: <QandA />},
            { path: 'aboutus', element: <AboutUs />},
            { path: 'searchProduct', element: <SearchProduct />}
        ]
    },
])

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes
