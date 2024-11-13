import React from 'react';
import { Link } from 'react-router-dom';

import { updateCartStatus } from '../../components/CartItem';
import { usePriceCalculate } from './PriceCalculate';

const Cart = () => {
    const { calNetTotal, calProductPrice, cartItems, updateCartItems } = usePriceCalculate();
    const handleCategoryClick = (id) => { 
        setCurrentCategory(id);
    };
    const handleBuy = () => {
        cartItems.forEach((item, index) => {
            updateCartStatus(index, 'รอชำระเงิน');
        });
    };

    const handleQuantityChange = (index, type) => {
        const updatedCartItems = [...cartItems];
        if (type === 'add') {
            updatedCartItems[index].quantity += 1;
        } else if (type === 'sub' && updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
        }
        updateCartItems(updatedCartItems);
    };

    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        updateCartItems(updatedCartItems);
    };

    const cartItemsStatusNull = cartItems.filter(item => item.status === 'สั่งซื้อ');

    const renderCartItems = () => {
        if (cartItemsStatusNull.length === 0) {
            return <div className='col-12'>Your cart is empty</div>;
        } else {
            return cartItemsStatusNull.map((item, index) => (
                <div key={index} className="card mb-3">
                    <div className="row">
                        <div className="col-4">
                            <img src={item.image} className="img-fluid custom-cart-img" alt={item.name} />
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

    // คำนวณราคาเฉพาะสินค้าที่มีสถานะ 'สั่งซื้อ'
    const netTotal = calNetTotal('สั่งซื้อ'); 
    const productPrice = calProductPrice('สั่งซื้อ'); 


    return (
        <>
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
                                    <span>฿{productPrice}</span>
                                </div>

                                <hr />
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Net Total:</span>
                                    <span>฿{netTotal}</span>
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
