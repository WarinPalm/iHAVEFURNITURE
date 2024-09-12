import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // ดึงข้อมูลสินค้าจาก localStorage
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, []);

    // สำหรับลบสินค้า
    const handleRemoveItem = (index) => {
        const updatedCartItems = [...cartItems]; // สำเนาข้อมูลสินค้า
        updatedCartItems.splice(index, 1); // ลบสินค้าตามตำแหน่งที่กำหนด
        setCartItems(updatedCartItems); // อัปเดต state
        
        // อัปเดต localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const renderCartItems = () => {
        if (cartItems.length === 0) {
            return <div className='col-8'>Your cart is empty</div>;
        } else {
            return cartItems.map((item, index) => (
                <div key={index} className="card mb-3 col-8">
                    <div className="row">
                        <div className="col-4">
                            <img src={item.image} className="img-fluid rounded-start" alt={item.name} style={{ height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.detail}</p>
                                <p className="card-text text-muted">{item.price}</p>
                                <button onClick={() => handleRemoveItem(index)} className="btn btn-danger">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        }
    };

    return (
        <>
            <Navbar />
            <LoginModal />
            <div className="container">
                <h2 className='mt-5 mb-5'>Your Cart</h2>
                <div className="row">
                    {renderCartItems()}

                    <div className="card col-4"></div>
                </div>
                
            </div>
        </>
    );
};

export default Cart;
