import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import { getCartItems } from './CartItem'; 

const BillOrder = () => {
    const [billItems, setBillItems] = useState([]);
    const vat = 0.07; // 7% VAT

    useEffect(() => {
        // ดึงข้อมูลจาก CartItem
        const items = getCartItems(); // ฟังก์ชันนี้ควรจะคืนค่าอาเรย์ของ cartItems
        setBillItems(items);
    }, []);

    const calTotal = () => {
        let totalPrice = 0;
        billItems.forEach(item => {
            totalPrice += item.price * item.quantity; 
        });
        return totalPrice.toFixed(2);
    };

    const calNetTotal = () => {
        let totalPrice = calTotal(); 
        return totalPrice; // แสดงผลรวมราคาสุทธิ
    };

    const calVat = () => {
        let totalPrice = calTotal(); 
        let vatPrice = totalPrice * vat;
        return vatPrice.toFixed(2); 
    };

    const calProductPrice = () => {
        let totalPrice = calTotal(); 
        let productPrice = totalPrice - (totalPrice * vat);
        return productPrice.toFixed(2); 
    };

    const calShipping = () => {
        return billItems.length === 0 ? 0 : 250; // ค่าจัดส่ง
    };

    const calDiscount = () => {
        return 10; // ส่วนลด
    };

    const renderBillItems = () => {
        if (billItems.length === 0) {
            return <div className='col-12'>Your Bill is empty</div>;
        } else {
            return billItems.map((item, index) => (
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
        return (
            <div className="mb-3 mt-5">
                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">Product Price:</h5>   
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">฿{calProductPrice()}</h5> 
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">VAT 7%:</h5>   
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">฿{calVat()}</h5> 
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">Shipping cost:</h5>   
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">฿{calShipping()}</h5> 
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">Total:</h5>   
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">฿{calTotal()}</h5> 
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">Discount:</h5>   
                    </div>
                    <div className="col-1"></div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">{calDiscount()}%</h5> 
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
                        <h5 className="card-title">฿{calNetTotal()}</h5> 
                    </div>
                </div>
            </div>
        )
    }

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
                        <div className="col-12">
                            <div className="card card-bill">
                                <div className="card-body">
                                    <h1 className='mb-5'>Receipt</h1>
                                    
                                    <div className="mt-4 ms-5">{renderBillItems()}</div>
                                    <div className="mt-4 ms-5">
                                        {renderPrice()}
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BillOrder;
