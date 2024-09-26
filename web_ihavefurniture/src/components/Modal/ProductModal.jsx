import React, { useState, useEffect } from 'react';

const ProductModal = ({ currentImage, currentName, currentDetail, currentPrice }) => {
    const [quantity, setQuantity] = useState(1); 

    useEffect(() => {
        const modal = document.getElementById('product-detail');
        modal.addEventListener('shown.bs.modal', () => {
            setQuantity(1);
        });

        return () => {
            modal.removeEventListener('shown.bs.modal', () => {}); // ทำความสะอาด event listener เมื่อ component unmount
        };
    }, []);

    const handleAddToCart = () => {
        const product = {
            image: currentImage,
            name: currentName,
            detail: currentDetail,
            price: currentPrice,
            quantity: quantity
        };
    
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        // ตรวจสอบว่าสินค้านั้นมีในตะกร้าอยู่แล้วมั้ย
        const existProduct = cartItems.findIndex(item => item.name === product.name);
    
        if (existProduct !== -1) {
            // ถ้ามีสินค้าอยู่แล้ว ให้เพิ่มจำนวนสินค้า
            cartItems[existProduct].quantity += quantity;
        } 
        else {
            // ถ้าไม่มี ให้เพิ่มสินค้าใหม่เข้าไปในตะกร้า
            cartItems.push(product);
        }
    
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // รีเซ็ตค่า quantity หลังจากเพิ่มสินค้าแล้ว
        setQuantity(1);
        alert('Add to cart success!');

    };
    

    const handleQuantityChange = (type) => {
        if (type === 'add') {
            setQuantity(quantity + 1);
        } else if (type === 'sub' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="modal fade" tabIndex="-1" id="product-detail">
            <div className="modal-dialog modal-dialog-centered custom-modal-dialog">
                <div className="modal-content custom-modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-4">
                                <img src={currentImage} className="img-fluid custom-modal-img mt-5 mb-5" alt="Product Image" />
                            </div>
                            <div className="col-1"></div>
                            <div className="col-6 d-flex flex-column">
                                <div style={{ fontSize: '40px', fontWeight: '500' }} className="col-12 mb-4 mt-2">{currentName}</div>
                                <div style={{ fontSize: '15px' }} className="col-12 mb-5">{currentDetail}</div>
                                <div style={{ fontSize: '30px', fontWeight: '500' }} className="col-12 mb-5">฿{currentPrice}</div>
                                
                                <div className="mt-5 pb-5 row align-items-center">
                                    <div className="col-3 d-flex justify-content-start align-items-center">
                                        <button 
                                            className="btn btn-custom me-2"
                                            onClick={() => handleQuantityChange('sub')}
                                        >-</button>
                                        <span style={{ width: '40px', textAlign: 'center' }}>{quantity}</span>
                                        <button 
                                            className="btn btn-custom ms-2"
                                            onClick={() => handleQuantityChange('add')}
                                        >+</button>
                                    </div>

                                    <div className="col-3">
                                        <button type="button" className="btn btn-custom w-100" onClick={handleAddToCart} data-bs-dismiss="modal">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
