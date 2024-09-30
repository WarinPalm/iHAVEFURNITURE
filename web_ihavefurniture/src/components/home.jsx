import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { myProduct } from './MyProduct';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import HeroImage from './HeroImage';
import ProductModal from './Modal/ProductModal';

const Home = () => {
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
            <ProductModal currentImage={currentImage} currentName={currentName} currentDetail={currentDetail} currentPrice={currentPrice} /> 
            <HeroImage />

            <section className="list-product">
                <div className="container text-center">
                    
                    {/* สำหรับตารางยืนยันการสั่งซื้อ */}
                    
                </div>
            </section>

        </>
    );
};

export default Home;
