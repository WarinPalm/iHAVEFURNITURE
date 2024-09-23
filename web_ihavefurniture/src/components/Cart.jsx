import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';

const Cart = ({ currentCategory }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // ดึงข้อมูลสินค้าจาก localStorage เมื่อ category เปลี่ยน
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, [currentCategory]);

    // ฟังก์ชันสำหรับเพิ่ม/ลดจำนวนสินค้าในตะกร้า
    const handleQuantityChange = (index, type) => {
        const updatedCartItems = [...cartItems];
        if (type === 'increment') {
            updatedCartItems[index].quantity += 1;
        } else if (type === 'decrement' && updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
        }
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // อัปเดต localStorage
    };

    // ฟังก์ชันสำหรับลบสินค้าออกจากตะกร้า
    const handleRemoveItem = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const vat = 0.07; // 7% VAT
    let totalPrice = 0;

    const calTotal = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity; 
        });
        return totalPrice.toFixed(2);
    };
    
    const calVat = () => {
        let totalPrice = calTotal(); 
        let vatPrice = totalPrice * vat;
        return vatPrice.toFixed(2); 
    };
    
    const calProductPrice = () => {
        let totalPrice = calTotal(); 
        let productPrice = totalPrice - (totalPrice * vat);
        return productPrice.toFixed(2); 
    };
    

    const renderCartItems = () => {
        if (cartItems.length === 0) {
            return <div className='col-12'>Your cart is empty</div>;
        } else {
            return cartItems.map((item, index) => (
                <div key={index} className="card mb-3">
                    <div className="row">
                        <div className="col-4">
                            <img src={item.image} className="img-fluid custom-cart-img rounded-start" alt={item.name} />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.detail}</p>
                                <p className="card-text text-muted">฿{item.price}</p>

                                <div className="d-flex align-items-center mb-3 justify-content-between">
                                    <div className="col-6 d-flex align-items-center">
                                        <button 
                                            className="btn btn-custom me-2" 
                                            onClick={() => handleQuantityChange(index, 'decrement')}
                                        >-</button>
                                        <span className='m-2'>{item.quantity}</span>
                                        <button 
                                            className="btn btn-custom ms-2" 
                                            onClick={() => handleQuantityChange(index, 'increment')}
                                        >+</button>
                                    </div>
                                    <div className="col-4 text-end me-4">
                                        <button onClick={() => handleRemoveItem(index)} className="btn btn-danger">
                                            Remove
                                        </button>
                                    </div>
                                </div>


                                
                            </div>
                        </div>
                    </div>
                </div>
            ));
        }
    };

    return (
        <>
            <Navbar /> {/* ไม่จำเป็นต้องใช้ onCategoryClick ถ้าไม่ได้ส่งลงมาจาก App */}
            <LoginModal />

            <div className="container">
                <h2 className='mt-5 mb-5'>Your Cart</h2>
                <div className="row">

                    <div className="col-8">
                        {renderCartItems()}
                    </div>

                    <div className="col-4">
                        <div className="card" style={{ position: 'sticky', top: '10px' }}>
                            <div className="card-body m">
                                <h4 className='mb-4'>Order Summary</h4>
                                <div className="d-flex justify-content-between mb-4">
                                    <span>Product Price:</span>
                                    <span>฿{calProductPrice()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span>VAT 7%:</span>
                                    <span>฿{calVat()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>NET:</span>
                                    <span>฿{calTotal()}</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => handleRemoveItem(index)} className="col-12 mt-3 btn btn-primary">
                            BUY
                         </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Cart;
