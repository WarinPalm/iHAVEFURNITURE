import React, { useState, useEffect } from "react";

import Navbar from './Navbar';
import Category from './Category';
import { myProduct } from './MyProduct'; 


const ViewAll = () => {
    const [currentCategory, setCurrentCategory] = useState(localStorage.getItem('currentCategory') || 'sofa');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const categoryItems = myProduct[currentCategory] || [];
        setProducts(categoryItems);
        setTotalPages(Math.ceil(categoryItems.length / itemsPerPage));
    }, [currentCategory, itemsPerPage]);

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1); 
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const renderProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, products.length);

        return products.slice(startIndex, endIndex).map((product, index) => (
            <div className="col-4 mb-3" key={index}>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={product.image} className="card-img-top" alt={product.title} />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.text}</p>
                        <div className="colored_button_div">
                            <a href={product.link} className="colored_button">Add to cart</a>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };
    return (
        <>
        <Navbar onCategoryClick={handleCategoryClick} />
        <section className="list-product">
                <div className="container text-center">
                <div className="col-2">
                        <h1 style={{ paddingTop: '30px' }} className="fs-2">Category</h1>
                    </div>
                    <div className="col-10">
                    </div>

                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-9 row-gap-2">
                            <div className="row" id="show-product">
                                {renderProducts()}
                            </div>
                        </div>
                    </div>
                    <div id="pagination">
                        {currentPage > 1 && <button onClick={handlePrevPage}>Previous Page</button>}
                        {currentPage < totalPages && <button onClick={handleNextPage}>Next Page</button>}
                    </div>
                </div>
            </section>
        </>
        
    );
};

export default ViewAll;
