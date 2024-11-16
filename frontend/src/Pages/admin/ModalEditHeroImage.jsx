import React from 'react';
import { Link } from "react-router-dom"

const ModalEditHeroImage = () => {
    
    const closeModal = () => {
        const modal = document.getElementById('Edit-Hero-Image');
        if (modal) {
            const modalInstance = new window.bootstrap.Modal(modal);
            modalInstance.hide();
        }
    };
    return (
        // <div className="modal fade" id="Edit-Hero-Image" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        //     <div className="modal-dialog">
        //         <div className="modal-content">
        //             <div className="modal-header">
        //                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        //             </div>
        //             <div className="modal-body">
        //                 <div>
        //                     <span>hero_image1.jpg</span>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // <!-- Button trigger modal -->
        <div>
<div class="modal fade" id="Edit-Hero-Image" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Hero Image</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className="contrainer">
            <div className="row">
                <div className="col-6">
                    <span>hero_image1.jpg</span>
                </div>
                <div className="col">
                    <span>remove</span>
                </div>
                <div className="col">
                    <span>edit</span>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">add</button>
        
      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default ModalEditHeroImage;
