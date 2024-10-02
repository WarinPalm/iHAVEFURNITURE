import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';


const BillOrder = () => {

    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });
    
    const handleCategoryClick = (category) => { //เปลี่ยนสินค้าจากหมวดหมู่นึงไปอีกหมวดหมู่
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1);
    };

    const [billItems, setBillItems] = useState([]);
    const vat = 0.07; // 7% VAT

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
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
        let totalPrice = 0;
        billItems.forEach(item => {
            totalPrice += item.price * item.quantity; 
        });
        return totalPrice.toFixed(2);
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
        let shippingPrice;
        if(billItems.length === 0){
            shippingPrice = 0
        }
        else{
            shippingPrice = 250
        }
        return shippingPrice;
    };

    const calDiscount = () => {
        let discount = 10;
        
        return discount;
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
                            <h5 className="card-title">฿{item.price}</h5> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-11"><hr/></div>
                    </div>

                </div>
            ));
        }
    };
    const renderPrice =() =>{
        return(
            <div className="mb-3 mt-5">
                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">Product Price:</h5>   
                    </div>
                    <div className="col-1"> 
                    </div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">฿{calProductPrice()}</h5> 
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">VAT 7%:</h5>   
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">฿{calVat()}</h5> 
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">Shipping cost:</h5>   
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">฿{calShipping()}</h5> 
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">Total:</h5>   
                    </div>
                    <div className="col-1">
                    </div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">฿{calTotal()}</h5> 
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <h5 className="card-title">Discount:</h5>   
                    </div>
                    <div className="col-1">
                    </div>
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
                    <div className="col-1">
                    </div>
                    <div className="col-4 text-end">
                        <h5 className="card-title">฿{calNetTotal()}</h5> 
                    </div>
                </div>
            </div>
            
        )
    }
    return (
        <>
        <Navbar onCategoryClick={handleCategoryClick} />
        <LoginModal />
        
        <section className='bill-order mt-5'>
            <div className="container">
                <div className="row">
                    <div className="col-4 mb-3">
                        <h1>Purchase Summary</h1>
                    </div>
                </div>
                <div className="row">
                    <dic className="col-12">
                        <div className="card card-bill">
                        
                            <div className="card-body">
                                <h1 className='mb-5'>Receipt</h1>
                                
                                <div className="mt-4 ms-5">{renderBillItems()}</div>
                                <div className="mt-4 ms-5">
                                    {renderPrice()}
                                </div>
                                
                                
                            </div>  
                        </div>
                    </dic>
                </div>
            </div>

        </section>
        </>
    )
}

export default BillOrder