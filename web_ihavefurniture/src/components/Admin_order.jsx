import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { myProduct } from './MyProduct';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import EditHeroImageModal from "./Modal/EditHeroImage";
import HeroImage from './HeroImage';
import ProductModal from './Modal/ProductModal';

const AdminOrder = () => {
    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });

    const [products, setProducts] = useState([]);

    //ส่งค่าไปให้ popup show product
    const [currentImage, setCurrentImage] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDetail, setCurrentDetail] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');

    useEffect(() => { 
        const categoryItems = myProduct[currentCategory] || [];
        setProducts(categoryItems); // สำหรับนำไปคำนวณจำนวนสินค้า products.length

    }, [currentCategory]);

    const handleCategoryClick = (category) => { 
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1);
    };


    return (
        <>
            <Navbar onCategoryClick={handleCategoryClick}/>            
            <LoginModal />

            <section className="list-product">
                <div className="container">
                    {/* สำหรับเขียนหน้าตา _html */}
                    <br />
                    <h2>Order #W835749801</h2>
                    <hr />
                    <div>
                        <h2>Username: Jomprach</h2>
                        <h2>Email: xxx@gmail.com</h2>
                        <h2>Products & Prices:</h2>
                        <br />
                        <br />
                        <h2>Address:</h2>
                        <h2>88/2 Banglang Gorkai Bangkok 77159</h2>
                        <h2>Proof of payment :</h2>
                        <br />
                        <br />
                        <div align = "center">
                            <button type="button" class="btn btn-primary">Verify</button>
                            <span class = "m-4"></span>
                            <button type="button" class="btn btn-danger">Reject</button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AdminOrder;
