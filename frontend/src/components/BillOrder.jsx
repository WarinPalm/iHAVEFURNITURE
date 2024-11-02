import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { cartItems } from './CartItem';


const BillOrder = () => {

    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });

    const handleCategoryClick = (category) => { 
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
    };

    const navigate = useNavigate();
    const goToPaymentDetail = () => {
        navigate(`/paymentDetail`);
    };

    // Filter status 'รอคำอนุมัติ'
    const cartItemsForPayment = cartItems.filter(item => item.status === 'รอชำระเงิน');

    return (
        <>
            <Navbar />

            <div className="container">
                <div className="row">
                    <h1 className="mt-5 mb-5">Payment</h1>
                    {cartItemsForPayment.length > 0 && (
                        <div className="card mb-3 card-bill card-hover" onClick={goToPaymentDetail}>
                            <div className="row">
                                <div className="col-3">
                                    {/* ดึงรูปภาพจาก approvedItems ชิ้นแรก */}
                                    <img 
                                        src={cartItemsForPayment[0].image} 
                                        className="img-fluid custom-cart-img rounded-start" 
                                        alt={cartItemsForPayment[0].name} 
                                    />
                                </div>
                                <div className="col-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Order#sdsdsdsdsdsdsds</h5>
                                        <p className="card-title">Status: {cartItemsForPayment[0].status}</p>
                                        <p className="card-title">Order Status: dsdsdsdsdsd</p>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="card-body">
                                        <h5 className="card-title">Address</h5>
                                        <p className="card-title">66/666644dsss sdsdds</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {cartItemsForPayment.length === 0 && (
                        <p>No orders waiting for approval.</p>
                    )}
                </div>
            </div>

        </>
    );
};

export default BillOrder;