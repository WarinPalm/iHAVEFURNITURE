import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import HeroImage from './HeroImage';
import Category from './Category';
import ProductModal from './Modal/ProductModal';
import axios from "axios";

const Home = () => {
    const [currentCategory, setCurrentCategory] = useState(1); // default category id
    const [products, setProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    //ส่งค่าไปให้ popup show product
    const [currentImage, setCurrentImage] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDetail, setCurrentDetail] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');

    // สุ่มสินค้าแนะนำ
    const getRandomProducts = (allProducts, count) => {
        const random = allProducts.sort(() => 0.5 - Math.random()); // สุ่มเรียงสินค้า
        return random.slice(0, count); // ดึงสินค้าจำนวนที่ต้องการ
    };

    useEffect(() => {
        const fetchProduct = () => {
            axios.get("http://localhost:3000/api/products")
                .then(res => {
                    setProducts(res.data);
                })
                .catch(error => console.error('Error Fetching Products' + error));
        };
        fetchProduct();
        const intervalId = setInterval(fetchProduct, 10000); // Fetch ทุก 10 วิ

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // สุ่มสินค้าแนะนำใหม่เมื่อหมวดหมู่เปลี่ยน
        const allProducts = products;
        const randomRecommendedItems = getRandomProducts(allProducts, 6); // สุ่มสินค้าแนะนำ 6 ชิ้น
        setRecommendedProducts(randomRecommendedItems);
    }, [products]); // เพิ่ม products ใน dependency array

    const handleCategoryClick = (id) => { 
        setCurrentCategory(id);
    };

    const renderProducts = () => {
        const filteredProducts = products.filter(product => product.categoryId === currentCategory);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);

        return filteredProducts.slice(startIndex, endIndex).map((product, index) => (
            <div className="col-4 mb-4" key={index}>
                <div
                    className="card card-hover"
                    data-bs-toggle="modal"
                    data-bs-target="#product-detail"
                    onClick={() => {
                        setCurrentImage(product.image);
                        setCurrentName(product.title);
                        setCurrentDetail(product.text);
                        setCurrentPrice(product.price);
                    }}
                >
                    <img src={product.image} className="card-img-top" alt={product.title} />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="mt-4 card-text text-muted">{product.description}</p>
                        <h5 className="mt-4 text-start" style={{ marginLeft: '-20px' }}>฿{product.price}</h5>
                    </div>
                </div>
            </div>
        ));
    };

    const renderRecommendedProducts = () => {
        return recommendedProducts.map((product, index) => (
            <div className="col-2 mb-4" key={index}>
                <div
                    className="card card-recom-hover"
                    data-bs-toggle="modal"
                    data-bs-target="#product-detail"
                    onClick={() => {
                        setCurrentImage(product.image);
                        setCurrentName(product.name);
                        setCurrentDetail(product.description);
                        setCurrentPrice(product.price);
                    }} 
                >
                    <img 
                        src={product.image} 
                        className="card-img-recom" 
                        alt={product.name} 
                    />
                    <div className="card-body">
                        <h5 className="mt-4 text-start">฿{product.price}</h5>
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
                    <div className="col-2 pt-5 mb-5">
                        <h1>Recommended</h1>
                    </div>
                    <div className="row recom-Product">
                        <div className="row">
                            {renderRecommendedProducts()}
                        </div>
                    </div>
                    
                    <div className="col-2 pt-5">
                        <h1>Category</h1>
                    </div>
                    <div className="row mt-2 pt-5">
                        <Category activeCategory={currentCategory} onCategoryClick={handleCategoryClick} />
                        <div className="col-1"></div>
                        <div className="col-9 row-gap-2">
                            <div className="row mb-4">
                                <div className="col-12 d-flex justify-content-end align-items-end mt-5">
                                    <Link to="viewall" className="btn btn-custom" id="seeall-btn">View All</Link>
                                </div>
                            </div>

                            <div className="row" id="show-product">
                                {renderProducts()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
