import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import { getCartItems, updateCartStatus } from './CartItem';

const Cart = () => {

    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });
    
    const handleCategoryClick = (category) => { //เปลี่ยนสินค้าจากหมวดหมู่นึงไปอีกหมวดหมู่
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1);
    };


    const [cartItems, setCartItems] = useState(getCartItems());

    const handleBuy = () => {
        cartItems.forEach((item, index) => {
            updateCartStatus(index, 'รอชำระเงิน');
        });
        alert('Status updated to รอชำระเงิน');
    };

    // สำหรับเพิ่ม/ลดจำนวนสินค้าในตะกร้า
    const handleQuantityChange = (index, type) => {
        const updatedCartItems = [...cartItems];
        if (type === 'add') {
            updatedCartItems[index].quantity += 1;
        } else if (type === 'sub' && updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
        }
        setCartItems(updatedCartItems); // อัปเดต state
    };

    // สำหรับลบสินค้าออกจากตะกร้า
    const handleRemoveItem = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems); // อัปเดต state
    };

    const vat = 0.07; // 7% VAT
    const cartItemsStatusNull = cartItems.filter(item => item.status === null); // กรองเฉพาะสินค้าที่มีสถานะเป็น null

    const calTotal = () => {
        let totalPrice = 0;
        cartItemsStatusNull.forEach(item => {
            totalPrice += item.price * item.quantity; 
        });
        return totalPrice.toFixed(2);
    };

    const calNetTotal = () => {
        let totalPrice = 0;
        cartItemsStatusNull.forEach(item => {
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

    const calShipping = () => {
        let shippingPrice;
        if(cartItemsStatusNull.length === 0){
            shippingPrice = 0
        }
        else{
            shippingPrice = 250
        }
        return shippingPrice;
    };

    const calDiscount = () => {
        let discount = 10;
        return discount;
    };

    const renderCartItems = () => {
    
        if (cartItemsStatusNull.length === 0) {
            return <div className='col-12'>Your cart is empty</div>;
        } else {
            return cartItemsStatusNull.map((item, index) => (
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
                                        <button className="btn btn-custom me-2" onClick={() => handleQuantityChange(index, 'sub')}>-</button>
                                        <span className='m-2'>{item.quantity}</span>
                                        <button className="btn btn-custom ms-2" onClick={() => handleQuantityChange(index, 'add')}>+</button>
                                    </div>
                                    <div className="col-4 text-end me-4">
                                        <button className="btn btn-danger" onClick={() => handleRemoveItem(index)}>Remove</button>
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
            <Navbar onCategoryClick={handleCategoryClick} />
            <LoginModal />
            <div className="container">
                <h2 className='mt-5 mb-5'>Your Cart</h2>
                <div className="row">
                    <div className="col-8">
                        {renderCartItems()}
                    </div>
                    <div className="col-4">
                        <div className="card" style={{ position: 'sticky', top: '10px' }}>
                            <div className="card-body">
                                <h4 className='mb-4'>Order Summary</h4>
                                <div className="d-flex justify-content-between mb-4">
                                    <span>Product Price:</span>
                                    <span>฿{calProductPrice()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span>VAT 7%:</span>
                                    <span>฿{calVat()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span>Shipping cost:</span>
                                    <span>฿{calShipping()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Discount:</span>
                                    <span>{calDiscount()}%</span>
                                </div>  
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Total:</span>
                                    <span>฿{calTotal()}</span>
                                </div>  
                                <hr />
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Net Total:</span>
                                    <span>฿{calNetTotal()}</span>
                                </div>  
                                
                                <Link to="../billOrder">
                                    <button className="col-12 mt-3 btn btn-primary" onClick={handleBuy}>BUY</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
