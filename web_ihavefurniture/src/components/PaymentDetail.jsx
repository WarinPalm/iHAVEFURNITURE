import React, { useEffect, useState} from 'react';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import { updateCartStatus } from './CartItem';
import { usePriceCalculate } from './PriceCalculate';


const PaymentDetail = () => {
    const { calNetTotal, calProductPrice, cartItems } = usePriceCalculate();

    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });
    
    const handleCategoryClick = (category) => { //เปลี่ยนสินค้าจากหมวดหมู่นึงไปอีกหมวดหมู่
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1);
    };
    const confirmOrder = () =>{
        cartItems.forEach((item,index)=>{
            updateCartStatus(index, 'รอคำอนุมัติ');
        });
    }
    const renderBillItems = () => {
        // กรองเฉพาะสินค้าใน cart ที่มีสถานะเป็น 'รอชำระเงิน'
        const cartItemsForPayment = cartItems.filter(item => item.status === 'รอชำระเงิน');
    
        if (cartItemsForPayment.length === 0) {
            return <div className='col-12'>Your Bill is empty</div>;
        } else {
            return cartItemsForPayment.map((item, index) => (
                <div key={index} className="mb-3 mt-2">
                    <div className="row">
                        <div className="col-6">
                            <h5 className="card-title">{item.name}</h5>   
                        </div>
                        <div className="col-1">
                            <h5 className="card-title">{item.quantity}</h5> 
                        </div>
                        <div className="col-4 text-end">
                            <h5 className="card-title">฿{(item.price * item.quantity).toFixed(2)}</h5> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-11"><hr/></div>
                    </div>
                </div>
            ));
        }
    };
    

    const renderPrice = () => {
        // คำนวณราคาเฉพาะสินค้าที่มีสถานะ 'รอชำระเงิน'
        const netTotalForPayment = calNetTotal('รอชำระเงิน');
        const productPriceForPayment = calProductPrice('รอชำระเงิน');

        return (
            <div className="mb-3 mt-5">
                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">Product Price:</h5>   
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">฿{productPriceForPayment}</h5> 
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
                        <h5 className="card-title">฿{netTotalForPayment}</h5> 
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <LoginModal />
            
            <section className='bill-order mt-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-4 mb-3">
                            <h1>Purchase Summary</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <div className="card card-bill">
                                <div className="card-body">
                                    <h1 className='mb-5 mt-4'>Receipt</h1>
                                    
                                    <div className="mt-4 ms-5 bill-items">{renderBillItems()}</div>

                                    <div className="ms-5">
                                        {renderPrice()}
                                    </div>
                                </div>  
                            </div>

                            <div className="card card-bill mt-5">
                                <div className="card-body">
                                    <div className="mb-3 mt-2">
                                        <div className="row">
                                            <div className="col-1"></div>
                                            <div className="col-2">
                                                <h5 className="card-title">วันที่แจ้งโอน</h5>   
                                            </div>
                                            <div className="col-1">
                                                <h5 className="card-title">:</h5> 
                                            </div>
                                            <div className="col-1">
                                                <input type="date"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-2">
                                        <div className="row">
                                            <div className="col-1"></div>
                                            <div className="col-2">
                                                <h5 className="card-title">วันที่โอน</h5>   
                                            </div>
                                            <div className="col-1">
                                                <h5 className="card-title">:</h5> 
                                            </div>
                                            <div className="col-1">
                                                <input type="date"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 mt-2">
                                        <div className="row">
                                            <div className="col-1"></div>
                                            <div className="col-2">
                                                <h5 className="card-title">แนบสลิป</h5>   
                                            </div>
                                            <div className="col-1">
                                                <h5 className="card-title">:</h5> 
                                            </div>
                                            <div className="col-1">
                                                <input type="file"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className='btn btn-custom mt-5' onClick={confirmOrder}>Confirm Order</button>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </section>
        </>
    );
}

export default PaymentDetail;
