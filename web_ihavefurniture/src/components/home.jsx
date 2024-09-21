import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { myProduct } from './MyProduct';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import HeroImage from './HeroImage';
import Category from './Category';
import ProductModal from './Modal/ProductModal';

const Home = () => {
    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [products, setProducts] = useState([]);

    //ส่งค่าไปให้ popup show product
    const [currentImage, setCurrentImage] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDetail, setCurrentDetail] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');

    useEffect(() => { //เข้าถึงสินค้า จาก array ผ่านเข้ามาเป็น หมวดหมู่สินค้า
        const categoryItems = myProduct[currentCategory] || [];
        setProducts(categoryItems); //สำหรับนำไปคำนวณจำนวนสินค้า products.length
    }, [currentCategory]);

    const handleCategoryClick = (category) => { //เปลี่ยนสินค้าจากหมวดหมู่นึงไปอีกหมวดหมู่
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1);
    };

    const renderProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, products.length);

        return products.slice(startIndex, endIndex).map((product, index) => (
            <div className="col-4 mb-4" key={index}>
                <div
                    className="card card-hover"
                    data-bs-toggle="modal"
                    data-bs-target="#product-detail"
                    onClick={() => {
                    setCurrentImage(product.image),
                    setCurrentName(product.title),
                    setCurrentDetail(product.text),
                    setCurrentPrice(product.price)
                    }} 
                >
                    <img 
                    src={product.image} 
                    className="card-img-top" 
                    alt={product.title} 
                    />
                    <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="mt-4 card-text text-muted">{product.text}</p>
                    <h5 className="mt-4 text-start" style={{ marginLeft: '-20px' }}>฿{product.price}</h5>
                    </div>
                </div>
            </div>

        ));
    };

    return (
        <>
            <Navbar onCategoryClick={handleCategoryClick}/>            
            <LoginModal />
            <ProductModal currentImage={currentImage} currentName={currentName} currentDetail={currentDetail} currentPrice={currentPrice} /> 
            <HeroImage />

            <section className="list-product">
                <div className="container text-center">
                    <div className="col-2 pt-5">
                        <h1 className="fs-2">Category</h1>
                    </div>
                    <div className="row mt-2 pt-5">
                        <Category activeCategory={currentCategory} onCategoryClick={handleCategoryClick} />
                        <div className="col-1"></div>
                        <div className="col-9 row-gap-2">
                            <div className="row" id="show-product">
                                {renderProducts()}
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        <Link to="viewall" className="btn btn-custom" id="seeall-btn">viewall</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;