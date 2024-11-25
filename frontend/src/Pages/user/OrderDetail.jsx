import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OrderDetail = () => {
  const location = useLocation();
  const history = location.state?.history;

  // ฟังก์ชันสำหรับ render สินค้า
  const renderProductItem = (cartInOrder) => {
    return cartInOrder.map((item, index) => (
      <div className="row" key={index} >
        <div className="col-3">
          <img src={item.product?.fullPathImage} alt="img" className="img-fluid custom-cart-img" />
        </div>
        <div className="col-4 mt-4">
          <h5 className="card-title mt-3">{item.product?.name}</h5>

        </div>
        <div className="col-2 mt-4">
          <h5 className="card-title mt-3">{item.quantity}</h5>

        </div>
        <div className="col-3 mt-5 text-end">
          <h5 className="card-title">{(item.product?.price || 0) * item.quantity}฿</h5>
        </div>
        <hr />
      </div>
    )
    );
  };

  return (
    <>
      <div className="container">
        <h1 className="mt-5">ประวัติการสั่งซื้อ</h1>
        <div className="row">
          <div className="col-1"></div>

          <div className="col-10">
            <div className="card card-bill card-order mb-5 mt-5 ">
              <div className="card-body me-4">

                <h1 className="card-title mt-3 mb-5">ใบเสร็จ</h1>
                <h5 className="ms-4 mb-4">
                  ลูกค้า: {history.userBy?.fName} {history.userBy?.lName}
                </h5>
                <h5 className="ms-4 mb-4">ที่อยู่: {history.userBy?.address}</h5>
                <h5 className="ms-4 mb-4">เบอร์โทร: {history.userBy?.telNo}</h5>
                <h5 className="ms-4 mb-4">สถานะ: {history.status}</h5>

                {/* โซนแสดงสินค้า */}
                <div className="card card-bill mt-5">
                  <div className="card-body me-5">
                    {renderProductItem(history.cart)}
                  </div>
                </div>

                {/* โซนแสดงราคา */}
                <div className='d-flex justify-content-between ms-5 me-5 mt-5'>
                  <h5>รวมสุทธิ :</h5>
                  <h5 className='me-3'>{history.netPrice}฿</h5>
                </div>
              </div>
            </div>
            <hr className='mb-5' />
          </div>


          <div className="d-flex justify-content-center mb-5">
            <Link to="../history"><button className="btn btn-custom">ย้อนกลับ</button></Link>
          </div>
        </div>
      </div>

    </>
  );
}

export default OrderDetail;
