import React, { useState, useEffect } from 'react';

const ProductModal = ({ currentImage, currentName, currentDetail, currentPrice }) => {
    const [quantity, setQuantity] = useState(1); // จัดการ state สำหรับจำนวนสินค้า

    useEffect(() => {
        const modal = document.getElementById('product-detail');
        modal.addEventListener('shown.bs.modal', () => {
            setQuantity(1);
        });

        return () => {
            modal.removeEventListener('shown.bs.modal', () => {}); // ทำความสะอาด event listener เมื่อ component unmount
        };
    }, []);

    const closeModal = () => {
        const modal = document.getElementById('product-detail');
        if (modal) {
            const modalInstance = new window.bootstrap.Modal(modal);
            modalInstance.hide();
        }
    };

    const handleAddToCart = () => {
        const product = {
            image: currentImage,
            name: currentName,
            detail: currentDetail,
            price: currentPrice,
            quantity: quantity
        };
        
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Add to cart success!');
    };

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(prevQuantity => prevQuantity + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
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
                                            onClick={() => handleQuantityChange('decrement')}
                                        >-</button>
                                        <span style={{ width: '40px', textAlign: 'center' }}>{quantity}</span>
                                        <button 
                                            className="btn btn-custom ms-2"
                                            onClick={() => handleQuantityChange('increment')}
                                        >+</button>
                                    </div>

                                    <div className="col-3">
                                        <button type="button" className="btn btn-custom w-100" onClick={handleAddToCart}>Add to cart</button>
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
