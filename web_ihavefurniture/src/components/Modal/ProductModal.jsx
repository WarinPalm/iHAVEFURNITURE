import React from 'react';

const ProductModal = ({ currentImage, currentName, currentDetail, currentPrice }) => {
    const closeModal = () => {
        const modal = document.getElementById('product-detail');
        if (modal) {
            const modalInstance = new window.bootstrap.Modal(modal);
            modalInstance.hide();
        }
    };

    return (
        <div className="modal fade" tabIndex="-1" id="product-detail">
            <div className="modal-dialog modal-dialog-centered custom-modal-dialog ">
                <div className="modal-content custom-modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-4"> 
                                <img src={currentImage} className="img-fluid custom-img mt-5 mb-5" alt="Product Image" />
                            </div>
                            <div className="col-1"></div>
                            <div className="col-6">
                                <div className="col-12 mb-5">{currentName}</div>
                                <div className="col-12">{currentDetail}</div>
                                <div className="col-12">{currentPrice}</div>
                                <div className="row mt-5">
                                    <div className="col-3"></div>
                                    <div className="col-9">
                                        <button type="button" className="btn btn-primary">Add to cart</button>
                                    </div>
                                </div>
                                <button type="button" className="col-8 btn btn-primary mt-5" onClick={closeModal} data-bs-dismiss="modal">BUY NOW</button>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
