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
    useEffect(() => {
        // ดึงข้อมูลสินค้าจาก localStorage เมื่อ category เปลี่ยน
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setBillItems(items);
    }, []);

    const renderBillItems = () => {
        if (billItems.length === 0) {
            return <div className='col-12'>Your Bill is empty</div>;
        } else {
            return billItems.map((item, index) => (
                <div key={index} className="mb-3 mt-5">
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
                    <hr/>
                </div>
                
            ));
        }
    };
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
                                <h1>Receipt</h1>
                                
                                <h5 className="mt-4 ms-5">{renderBillItems()}</h5>
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