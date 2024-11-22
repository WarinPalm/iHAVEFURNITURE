import React, { useState, useEffect } from "react";
import ProductModal from '../components/user/ProductModal';
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategory } from "../api/category";
import { getAllProducts } from "../api/Product";
const ViewAll = () => {
    const location = useLocation();
    const categoryNow = location.state?.categoryId || 1; //ดึงค่าหมวดหมู่ล่าสุดที่มาจาก home

    const [currentCategory, setCurrentCategory] = useState(categoryNow); // default category id == sofa
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [categories, setCategories] = useState([]);
    
    // ส่งค่าไปให้ popup show product
    const [currentImage, setCurrentImage] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDetail, setCurrentDetail] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [currentAmount, setCurrentAmount] = useState('');
    
    
    // ดึงข้อมูลสินค้า
    const fetchProducts = async ()=>{
        try{
            const res = await getAllProducts();
            setProducts(res.data.products);
        }catch(err){
            console.error(err)
        }
    }
     //ดึงหมวดหมู่
     const fetchCategories = async () => {
        try{
            const res = await getAllCategory();
            setCategories(res.data);
        }catch(err){
            console.error(err)
        }
    };
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);
    // อัปเดต currentCategory เมื่อ categoryNow เปลี่ยนแปลง
    useEffect(() => {
        setCurrentCategory(categoryNow);
        setCurrentPage(1); 
    }, [categoryNow]);

    useEffect(() => {
        // คำนวณจำนวนหน้าทั้งหมดตามสินค้าที่กรองแล้ว
        const filterProducts = products.filter(product => product.categoryId === currentCategory);
        const pages = Math.ceil(filterProducts.length / itemsPerPage);
        setTotalPages(pages);
    }, [products, currentCategory, itemsPerPage]);

    const renderProducts = () => {
        // กรองสินค้าตามหมวดหมู่ที่เลือก
        const filteredProducts = products.filter(product => product.categoryId === currentCategory);
    
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
        
        if(filteredProducts.length===0){
            return(
                <h1>.....ไม่มีสินค้าในหมวดหมู่นี้.....</h1>
            )
        }
        return filteredProducts.slice(startIndex, endIndex).map((product, index) => (
            <div className="col-3 mb-4 text-center" key={product.id}>
                {product.stock === 0 ? (
                    <div
                        className="card card-hover"
                        onClick={() => { toast.error('สินค้าหมด'); }}
                    >
                        <div className="image-soldout">
                            <img
                                src={product.fullpath}
                                className="product-image card-img-top"
                                alt={product.name}
                            />
                            <img
                                src="/image/Other/soldout.png"
                                className="sold-out-image"
                                alt="Sold Out"
                            />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="mt-4 card-text text-muted">{product.description}</p>
                            <h5 className="mt-4 text-start" style={{ marginLeft: '-20px' }}>฿{product.price}</h5>
                        </div>
                    </div>
                ) : (
                    <div
                        className="card card-hover"
                        data-bs-toggle="modal"
                        data-bs-target="#product-detail"
                        onClick={() => {
                            setCurrentImage(product.fullpath);
                            setCurrentName(product.name);
                            setCurrentDetail(product.description);
                            setCurrentPrice(product.price);
                            setCurrentId(product.id);
                            setCurrentAmount(product.stock);
                        }}
                    >
                        <img src={product.fullpath} className="card-img-top" alt={product.name} />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="mt-4 card-text text-muted">{product.description}</p>
                            <h5 className="mt-4 text-start" style={{ marginLeft: '-20px' }}>฿{product.price}</h5>
                        </div>
                    </div>
                )}
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
                onClick={() => setCurrentPage(i)}>
                    {i}
                </button>
            );
        }
    
        return pageNumbers;
    };
    

    return (
        <>
            <ProductModal currentImage={currentImage} currentName={currentName} currentDetail={currentDetail} currentPrice={currentPrice} 
            currentId={currentId} currentAmount={currentAmount}/> 

            <section className="list-product">
                <div className="container text-center">
                    <h1 className="text-start mt-5">หมวดหมู่: {categories.find(category => category.id === currentCategory)?.name || ''}</h1>
                    <hr className="mt-5 mb-5"/>
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
                                    <button className="btn btn-custom mx-2" 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}>
                                        ก่อนหน้า
                                    </button>

                                    {renderPageNumbers()}

                                    {/* ปุ่ม Next จะไม่มีผลเมื่ออยู่หน้าสุดท้าย */}
                                    <button className="btn btn-custom mx-2" 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                     disabled={currentPage === totalPages}>
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
