import React from 'react';
import { Link } from "react-router-dom"

const LoginModal = () => {
    
    const closeModal = () => {
        const modal = document.getElementById('user-login');
        if (modal) {
            const modalInstance = new window.bootstrap.Modal(modal);
            modalInstance.hide();
        }
    };
    return (
        <div class="modal fade" tabindex="-1" id="product-detail">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="/image/Sofa/sofa1.avif" class="img-fluid custom-img" alt="Sofa Image" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default LoginModal;
