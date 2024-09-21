import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import { myProduct } from './MyProduct';
import LoginModal from "./Modal/LoginModal";
import ProductModal from './Modal/ProductModal';
import { useLocation } from 'react-router-dom';

const SearchProduct = () => {
    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });
    
    const handleCategoryClick = (category) => { //เปลี่ยนสินค้าจากหมวดหมู่นึงไปอีกหมวดหมู่
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1);
    };

    const [products, setProducts] = useState([]);

    // ส่งค่าไปให้ popup show product
    const [currentImage, setCurrentImage] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDetail, setCurrentDetail] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');

    // ตั้งค่าการค้นหา 
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [totalPages, setTotalPages] = useState(0);

    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('query') || '';
        setSearchTerm(query);

        // คัดตัว product ที่สามารถเอามาใกล้เคียงกับคำค้นหา
        const allProducts = Object.values(myProduct).flat();
        const filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
        setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
        setCurrentPage(1);
    }, [location.search, itemsPerPage]);

    const renderProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, products.length);
        return products.slice(startIndex, endIndex).map((product, index) => (
            <div className="col-3 mb-4" key={index}>
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
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text text-muted">{product.text}</p>
                        <h5 className="mt-4 text-start" style={{ marginLeft: '-20px' }}>฿{product.price}</h5>
                    </div>              
                </div>
            </div>
        ));
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button key={i} className={`btn ${i === currentPage ? 'btn-custom2' : 'btn-custom'} mx-1`} 
                onClick={() => setCurrentPage(i)}>
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage += 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage -= 1);
        }
    };

    return (
        <>
            <Navbar onCategoryClick={handleCategoryClick}/>
            <LoginModal />
            <ProductModal currentImage={currentImage} currentName={currentName} currentDetail={currentDetail} currentPrice={currentPrice} /> 

            <section className="list-product">
                <div className="container text-center">
                    <div className="col-5 pt-5">
                        <h1>Search Results for "{searchTerm}"</h1>
                    </div>
                    <div className="row mt-3 pt-5">
                        <div className="col-12 row-gap-2">
                            <div className="row" id="show-product">
                                {renderProducts()}
                            </div>
                        </div>
                    </div>
                    <div id="pagination" className="mt-4">
                        <div className="d-flex justify-content-end">
                            {totalPages > 1 && (
                                <>
                                    {currentPage > 1 && (
                                        <button className="btn btn-custom mx-2" onClick={handlePrevPage}>Previous Page</button>
                                    )}
                                    {renderPageNumbers()}
                                    {currentPage < totalPages && (
                                        <button className="btn btn-custom mx-2" onClick={handleNextPage}>Next Page</button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SearchProduct;
