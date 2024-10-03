import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
const History = () =>{
    const navigate = useNavigate();
    const goToPaymentDetail = () =>{
        navigate(`/paymentDetail`);
    }
  return (
    <>
        <Navbar/>

        <div className="container">
            <div className="row">
                <h1>Order</h1>
                <div className="card mb-3 card-bill card-hover" onClick={goToPaymentDetail}>
                    <div className="row">
                        <div className="col-3">
                            <img src="/image/Kitchen/kitchen21.png"className="img-fluid custom-cart-img rounded-start" />
                        </div>
                        <div className="col-4">
                            <div className="card-body">
                                <h5 className="card-title">Kitchn</h5>
                                <p className="card-title">sasasas</p>
                                <p className="card-title">฿1111</p>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="card-body">
                                <h5 className="card-title">Address</h5>
                                <p className="card-title">sasasasasasasasas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default History