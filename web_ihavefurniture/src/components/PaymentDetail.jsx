import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'


const PaymentDetail =() =>{
  const [currentCategory, setCurrentCategory] = useState(() => {
      const savedCategory = localStorage.getItem('currentCategory');
      return savedCategory ? savedCategory : 'sofa';
  });

  const handleCategoryClick = (category) => { //เปลี่ยนสินค้าจากหมวดหมู่นึงไปอีกหมวดหมู่
      setCurrentCategory(category);
      localStorage.setItem('currentCategory', category);
      setCurrentPage(1);
  };
  const navigate = useNavigate();
    const goToHistory = () =>{
        navigate(`/history`);
    }
  return (
    <>
        <Navbar/>
        <div className="container">
            <div className="row">
                
                <div className="card card-bill card-order mb-3 mt-5">
                  <div className="card-body">
                      <h5 className="card-title mt-3">Order#s5554545454545</h5>
                      <h1 className="card-title mt-3">Your order is in the process of being shipped</h1>
                      <h5 className="card-title mt-5">Payment Status: อนุมัติคำสั่งซื้อ</h5>
                      <h5 className="card-title mt-3">Order Status: Currently Shipping</h5>
                      <h5 className="card-title mt-3">Ordered date: Jul. 5 2024</h5>
                      <h5 className="card-title mt-3">Address: 88/2 Banglang Gorkai Bangkokk 77159</h5>

                      {/* โซนแสดงสินค้า */}
                      <div className="card card-bill mt-5">
                          <div className="card-body">

                            <div className="row">
                              <div className="col-3">
                                <img src="/image/Kitchen/kitchen21.png" className="img-fluid custom-cart-img"/>
                              </div>
                              <div className="col-3 mt-5">
                                <h5 className='card-title'>Kitchen21 x1</h5>
                                <h6 className='card-title'>SN:122122221212</h6>
                              </div>
                              <div className="col-5 mt-5 text-end">
                                <h6 className='card-title'>1111฿</h6>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-3">
                                <img src="/image/Kitchen/kitchen21.png" className="img-fluid custom-cart-img"/>
                              </div>
                              <div className="col-3 mt-5">
                                <h5 className='card-title'>Kitchen21 x1</h5>
                                <h6 className='card-title'>SN:122122221212</h6>
                              </div>
                              <div className="col-5 mt-5 text-end">
                                <h6 className='card-title'>1111฿</h6>
                              </div>
                            </div>
                           
                          </div>
                      </div>
                      {/* โซนแสดงราคา */}
                      <div className="card card-bill mt-5">
                          <div className="card-body">

                            <div className="row">
                              <div className="col-6">
                                  <h5 className="card-title">Product Price:</h5>   
                              </div>
                              <div className="col-1"></div>
                              <div className="col-4 text-end">
                                  <h5 className="card-title">฿11111</h5> 
                              </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <h5 className="card-title">VAT 7%:</h5>   
                                </div>
                                <div className="col-1"></div>
                                <div className="col-4 text-end">
                                    <h5 className="card-title">฿11111</h5> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <h5 className="card-title">Shipping cost:</h5>   
                                </div>
                                <div className="col-1"></div>
                                <div className="col-4 text-end">
                                    <h5 className="card-title">฿11111</h5> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <h5 className="card-title">Total:</h5>   
                                </div>
                                <div className="col-1"></div>
                                <div className="col-4 text-end">
                                    <h5 className="card-title">฿11111</h5> 
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <h5 className="card-title">Discount:</h5>   
                                </div>
                                <div className="col-1"></div>
                                <div className="col-4 text-end">
                                    <h5 className="card-title">11%</h5> 
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
                                    <h5 className="card-title">11111฿</h5> 
                                </div>
                            </div>
                            
                          </div>
                      </div>
                      <div className="d-flex justify-content-end mt-5">
                        <button className="btn btn-danger" onClick={goToHistory}>BACK</button>
                      </div>


                  </div>
                </div>    
            </div>
        </div>
    </>
  )
}

export default PaymentDetail