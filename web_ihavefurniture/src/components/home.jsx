import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import ForgotPasswordModal from './Modal/ForgotPasswordModal';
import HeroImage from './HeroImage';
import Category from './Category';
import { myProduct } from './MyProduct';

const Home = () => {
    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const categoryItems = myProduct[currentCategory] || [];
        setProducts(categoryItems);
    }, [currentCategory]);

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1);
    };

    const renderProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, products.length);

        return products.slice(startIndex, endIndex).map((product, index) => (
            <div className="col-4 mb-4" key={index}>
                <div className="card card-hover">
                    <img src={product.image} className="card-img-top" alt={product.title} style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="mt-4 card-text text-muted">{product.text}</p>
                        {/* <div className="colored_button_div d-flex justify-content-center">
                            <a href={product.link} className="btn colored_button">Add to cart</a>
                            
                        </div> */}
                        <h5 className="mt-4 text-start" style={{ marginLeft: '-20px' }}>฿{product.price}</h5>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <>
            <Navbar onCategoryClick={handleCategoryClick} />
            <LoginModal />
            <ForgotPasswordModal />
            <HeroImage />

            <section className="list-product">
                <div className="container text-center">
                    <div className="col-2 pt-5">
                        <h1 className="fs-2">Category</h1>
                    </div>
                    <div className="row mt-2 pt-5">
                        <Category onCategoryClick={handleCategoryClick} />
                        <div className="col-1"></div>
                        <div className="col-9 row-gap-2">
                            <div className="row" id="show-product">
                                {renderProducts()}
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        <Link to="viewall" className="d-flex justify-content-end" id="seeall-btn">viewall</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
