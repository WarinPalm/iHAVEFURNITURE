import React from 'react';

const ProductModal = ({ currentImage }) => {
    const closeModal = () => {
        const modal = document.getElementById('product-detail');
        if (modal) {
            const modalInstance = new window.bootstrap.Modal(modal);
            modalInstance.hide();
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
                        <img src={currentImage} className="img-fluid custom-img" alt="Product Image" />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
