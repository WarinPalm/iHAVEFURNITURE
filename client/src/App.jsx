import React from 'react'
import AppRoutes from './routes/AppRoutes'

// ให้วางไว้ที่ทุกๆ component เข้าถึง
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // Javascripy code here


  return (
    <>
      <div>
        <ToastContainer />
        <AppRoutes />
      </div>
    </>
  )
}

export default App
