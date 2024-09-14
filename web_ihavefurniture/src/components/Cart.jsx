import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import { myProduct } from './MyProduct';


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);

    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });
    
    useEffect(() => { //เข้าถึงสินค้า จาก array ผ่านเข้ามาเป็น หมวดหมู่สินค้า
        const categoryItems = myProduct[currentCategory] || [];
        setProducts(categoryItems); //สำหรับนำไปคำนวณจำนวนสินค้า products.length
    }, [currentCategory]);

    useEffect(() => {
        // ดึงข้อมูลสินค้าจาก localStorage
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items);
    }, []);

    const handleCategoryClick = (category) => { //เปลี่ยนสินค้าจากหมวดหมู่นึงไปอีกหมวดหมู่
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1);
    };

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
            return <div className='col-12'>Your cart is empty</div>;
        } else {
            return cartItems.map((item, index) => (
                <div key={index} className="card mb-3">
                    <div className="row">
                        <div className="col-4">
                            <img 
                                src={item.image} 
                                className="img-fluid rounded-start" 
                                alt={item.name} 
                                style={{ height: '100%', objectFit: 'cover' }} 
                            />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.detail}</p>
                                <p className="card-text text-muted">{item.price}</p>
                                <button 
                                    onClick={() => handleRemoveItem(index)} 
                                    className="btn btn-danger"
                                >
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
            <Navbar onCategoryClick={handleCategoryClick}/>            
            <LoginModal />
            <div className="container">
                <h2 className='mt-5 mb-5'>Your Cart</h2>
                <div className="row">
                    {/* Left section: Render Cart Items */}
                    <div className="col-8">
                        {renderCartItems()}
                    </div>
    
                    {/* Right section: Fixed Card */}
                    <div className="col-4">
                        <div className="card" style={{ position: 'sticky', top: '10px' }}>
                            {/* Content of the fixed card */}
                            <h4>Order Summary</h4>
                            <p>Total: $XXX.XX</p>
                            {/* Add additional summary or checkout button here */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
};

export default Cart;
