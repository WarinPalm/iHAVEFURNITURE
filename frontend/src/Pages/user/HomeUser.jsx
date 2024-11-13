import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroImage from "../HeroImage";
import Category from "../Category"
// import ProductModal from '../ProductModal';
import axios from "axios";

const HomeUser = () => {
    const [currentCategory, setCurrentCategory] = useState(2); // default category id
    const [products, setProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    //ส่งค่าไปให้ popup show product
    const [currentImage, setCurrentImage] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDetail, setCurrentDetail] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');


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


    const handleCategoryClick = (id) => { 
        setCurrentCategory(id);
    };

    const renderProducts = () => {
        const filterProducts = products.filter(product => product.categoryId === currentCategory);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filterProducts.length);

        return filterProducts.slice(startIndex, endIndex).map((product, index) => (
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
        const recommendProducts = products.slice().reverse().slice(0, 4);
        return recommendProducts.map((product, index) => (
            <div className="col-3 mb-4" key={index}>
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
         
            {/* <ProductModal currentImage={currentImage} currentName={currentName} currentDetail={currentDetail} currentPrice={currentPrice} />  */}
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
                                <Link to="../user/viewall" className="btn btn-custom" id="seeall-btn" state={{ categoryId: currentCategory }}>
                                    View All
                                </Link>

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

export default HomeUser;