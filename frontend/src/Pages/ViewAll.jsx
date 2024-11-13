import React, { useState, useEffect } from "react";
import ProductModal from './ProductModal';
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewAll = () => {
    const location = useLocation();
    const categoryNow = location.state?.categoryId || 2;
    const [currentCategory, setCurrentCategory] = useState(categoryNow)// default category id == sofa
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    
    // ส่งค่าไปให้ popup show product
    const [currentImage, setCurrentImage] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDetail, setCurrentDetail] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');

    useEffect(()=>{
        const fetchProduct = ()=>{
            axios.get("http://localhost:3000/api/products")
                .then(res => setProducts(res.data))
                .catch(error => console.error('Error Fetching Products' + error));
        }
        fetchProduct();
        const intervalId = setInterval(fetchProduct, 10000); // Fetch ทุก 10 วิ
    
        return () => clearInterval(intervalId);
    },[])
    useEffect(() => {
        // อัปเดต currentCategory เมื่อ categoryNow เปลี่ยนแปลง
        setCurrentCategory(categoryNow);
        setCurrentPage(1); 
    }, [categoryNow]);

    useEffect(() => {
        // คำนวณจำนวนหน้าทั้งหมดตามสินค้าที่กรองแล้ว
        const filterProducts = products.filter(product => product.categoryId === currentCategory);
        const pages = Math.ceil(filterProducts.length / itemsPerPage);
        setTotalPages(pages);
    }, [products, currentCategory, itemsPerPage]);
    

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
        // กรองสินค้าตามหมวดหมู่ที่เลือก
        const filteredProducts = products.filter(product => product.categoryId === currentCategory);
    
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
    
        return filteredProducts.slice(startIndex, endIndex).map((product, index) => (
            <div className="col-3 mb-4" key={index}>
                <div
                    className="card card-hover"
                    data-bs-toggle="modal"
                    data-bs-target="#product-detail"
                    onClick={() => {
                        setCurrentImage(product.image);
                        setCurrentName(product.name);
                        setCurrentDetail(product.description);
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
            <ProductModal currentImage={currentImage} currentName={currentName} currentDetail={currentDetail} currentPrice={currentPrice} /> 

            <section className="list-product">
                <div className="container text-center">
                    <div className="col-3 pt-5">
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
                                        ก่อนหน้า
                                    </button>

                                    {renderPageNumbers()}

                                    {/* ปุ่ม Next จะไม่มีผลเมื่ออยู่หน้าสุดท้าย */}
                                    <button className="btn btn-custom mx-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                        ถัดไป
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
