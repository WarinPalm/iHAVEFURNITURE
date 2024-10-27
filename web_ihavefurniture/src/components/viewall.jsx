import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import { myProduct } from './MyProduct';
import LoginModal from "./Modal/LoginModal";
import ProductModal from './Modal/ProductModal';

const ViewAll = () => {
    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    
    // ส่งค่าไปให้ popup show product
    const [currentImage, setCurrentImage] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDetail, setCurrentDetail] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');

    useEffect(() => { // เข้าถึงสินค้า จาก array ผ่านเข้ามาเป็นหมวดหมู่สินค้า และคำนวณจำนวนหน้า
        const categoryItems = myProduct[currentCategory] || [];
        setProducts(categoryItems);
        setTotalPages(Math.ceil(categoryItems.length / itemsPerPage));
    }, [currentCategory, itemsPerPage]);

    const handleCategoryClick = (category) => { // เปลี่ยนสินค้าจากหมวดหมู่นึงไปอีกหมวดหมู่
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, products.length);
        
        return products.slice(startIndex, endIndex).map((product, index) => (
            <div className="col-3 mb-4" key={index}>
                <div className="card card-hover" data-bs-toggle="modal" data-bs-target="#product-detail"
                    onClick={() => {
                        setCurrentImage(product.image),
                        setCurrentName(product.title),
                        setCurrentDetail(product.text),
                        setCurrentPrice(product.price)}}>
                            
                    <img src={product.image} className="card-img-top" alt={product.title}/>
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
        let startPage = Math.max(1, currentPage - 1); // เริ่มที่หน้าปัจจุบัน - 1
        let endPage = Math.min(totalPages, currentPage + 1); // สิ้นสุดที่หน้าปัจจุบัน + 1
    
        if (currentPage === 1) { // กรณีอยู่หน้าแรก
            endPage = Math.min(totalPages, 3); // แสดง 1, 2, 3
        } else if (currentPage === totalPages) { // กรณีอยู่หน้าสุดท้าย
            startPage = Math.max(1, totalPages - 2); // แสดง totalPages - 2, totalPages - 1, totalPages
        }
    
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button key={i} className={`btn ${i === currentPage ? 'btn-custom2' : 'btn-custom'} mx-1`} 
                onClick={() => handlePageClick(i)}>
                    {i}
                </button>
            );
        }
    
        return pageNumbers;
    };
    

    return (
        <>
            <Navbar onCategoryClick={handleCategoryClick} activeCategory={currentCategory}/>
            <LoginModal/>
            <ProductModal currentImage={currentImage} currentName={currentName} currentDetail={currentDetail} currentPrice={currentPrice} /> 

            <section className="list-product">
                <div className="container text-center">
                    <div className="col-4 pt-5">
                        <h1>Category : {currentCategory}</h1>
                    </div>
                    <div className="row mt-3 pt-5">
                        <div className="col-12 row-gap-2">
                            <div className="row" id="show-product">
                                {renderProducts()}
                            </div>
                        </div>
                    </div>
                    <div id="pagination" className="mt-4 mb-4">
                        <div className="d-flex justify-content-end">
                            {totalPages > 1 && (
                                <>
                                    {/* ปุ่ม Previous จะไม่มีผลเมื่ออยู่หน้าแรก */}
                                    <button className="btn btn-custom mx-2" onClick={handlePrevPage} disabled={currentPage === 1}>
                                        Previous Page
                                    </button>

                                    {renderPageNumbers()}

                                    {/* ปุ่ม Next จะไม่มีผลเมื่ออยู่หน้าสุดท้าย */}
                                    <button className="btn btn-custom mx-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                        Next Page
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default ViewAll;
