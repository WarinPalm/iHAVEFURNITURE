import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OrderDetail = () => {

  // ฟังก์ชันสำหรับ render สินค้า
  const renderProductItem = () => {
    
    return approvedItems.map((item, index)=>(
      <div className="row" key={index}>
        <div className="col-3">
          <img src={item.image} alt={item.name} className="img-fluid custom-cart-img" />
        </div>
        <div className="col-3 mt-5">
          <h5 className="card-title">{item.name} x{item.quantity}</h5>
          <h6 className="card-title">SN:{item.serialNumber}</h6>
        </div>
        <div className="col-5 mt-5 text-end">
          <h6 className="card-title">{item.price}฿</h6>
        </div>
      </div>
    ));
  };
  const renderPrice = ()=>{
    const productPriceForApprove = calProductPrice('รอคำอนุมัติ');
    const netTotalForApprove = calNetTotal('รอคำอนุมัติ');
    return(
      <>
        <div className="row">
          <div className="col-6">
            <h5 className="card-title">Product Price:</h5>   
          </div>
          <div className="col-1"></div>
          <div className="col-4 text-end">
            <h5 className="card-title">฿{productPriceForApprove}</h5> 
          </div>
        </div>



        <div className="row">
          <div className="col-11"><hr/></div>
        </div>

        <div className="row">
          <div className="col-6">
            <h5 className="card-title">Net Total:</h5>   
          </div>
          <div className="col-1"></div>
          <div className="col-4 text-end">
            <h5 className="card-title">฿{netTotalForApprove}</h5> 
          </div>
        </div>
      </>
    )
  };
  
  return (
    <>
      
      <div className="container">
        <h1 className="mt-5">หมายเลขคำสั่งซื้อ : 1234567</h1>
        <div className="row">
          <div className="col-1"></div>

          <div className="col-10">
            <div className="card card-bill card-order mb-3 mt-5">
              <div className="card-body">
                
                <h1 className="card-title mt-3">ใบเสร็จ</h1>
                <p className="card-title mt-3">ลูกค้า : วฤณ พรหมวรานนท์</p>
                <h5 className="card-title mt-3">ที่อยู่ : เลขที่ 83 หมู่ 2</h5>
                <h5 className="card-title mt-3">วันที่: 14-11-2024</h5>
                <h5 className="card-title mt-3">หมายเลขคำสั่งซื้อ : 123456789</h5>

                {/* โซนแสดงสินค้า */}
                <div className="card card-bill mt-5">
                  <div className="card-body">
                    {renderProductItem()}
                  </div>
                </div>

                {/* โซนแสดงราคา */}
                <div className="card card-bill mt-5">
                  <div className="card-body">
                    {renderPrice()}
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-5">
                  <Link to="../history"><button className="btn btn-danger">BACK</button></Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-1"></div>
        </div>
      </div>

    </>
  );
}

export default OrderDetail;
