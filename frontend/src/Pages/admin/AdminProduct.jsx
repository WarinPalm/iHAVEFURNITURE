import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
function AdminProduct() {
  const location = useLocation();
  const categoryNow = location.state?.categoryId || 2;

  const [currentCategory, setCurrentCategory] = useState(categoryNow); // default category id == sofa

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(10); // จำนวนสินค้าต่อหน้า
  const [categories, setCategories] = useState([]); // เพิ่ม state สำหรับเก็บข้อมูลหมวดหมู่

  // ดึงข้อมูลสินค้า
  useEffect(()=>{
    const fetchProduct = ()=>{
        axios.get("http://localhost:3000/api/products")
            .then(res => setProducts(res.data.products))
            .catch(error => console.error('Error Fetching Products' + error));
    }
    fetchProduct();
    const intervalId = setInterval(fetchProduct, 10000); // Fetch ทุก 10 วิ

    return () => clearInterval(intervalId);
},[])

// ดึงข้อมูลหมวดหมู่
useEffect(() => {
    const fetchCategories = () => {
        axios.get("http://localhost:3000/api/category")
            .then(res => setCategories(res.data))
            .catch(error => console.error('Error Fetching Categories' + error));
    };
    fetchCategories();
}, []);
useEffect(() => {
  // คำนวณจำนวนหน้าทั้งหมดตามสินค้าที่กรองแล้ว
  const filterProducts = products.filter(product => product.categoryId === currentCategory);
  const pages = Math.ceil(filterProducts.length / itemsPerPage);
  setTotalPages(pages);
}, [products, currentCategory, itemsPerPage]);

  // หาชื่อหมวดหมู่จาก currentCategory
  const currentCategoryName = categories.find(category => category.id === currentCategory)?.name || '';

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

    if (filteredProducts.length === 0) {
        return (
            <tr>
                <td colSpan="7" className="text-center">
                    ไม่พบสินค้าในหมวดหมู่ "{currentCategoryName}"
                </td>
            </tr>
        );
    }

    return filteredProducts.slice(startIndex, endIndex).map((product, index) => (
        <tr key={index}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>฿{product.price}</td>
            <td>
                <img
                    src={product.fullpath}
                    alt={product.name}
                    style={{ width: '50px', height: 'auto', objectFit: 'cover' }}
                />
            </td>
            <td className="text-center">{product.stock}</td>
            <td>
                <button className="btn btn-link text-primary">แก้ไข</button>
            </td>
            <td>
                <button className="btn btn-link text-danger">ลบ</button>
            </td>
        </tr>
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
    <div>
      <div className="container mt-5">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">สินค้า | Sofa</h1>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by product ID or name"
          />
        </div>

        <div className="d-flex justify-content-start mb-3">
          <a href="#" className="nav-link me-3">Catalog Filter</a>
          <a href="#" className="nav-link me-3">Add new product</a>
          <a href="#" className="nav-link me-3">View all</a>
        </div>

        <table className="table table-bordered">
    <thead>
        <tr>
            <th>รหัสสินค้า</th>
            <th>ชื่อสินค้า</th>
            <th>ราคา (บาท)</th>
            <th>รูปภาพ</th>
            <th>จำนวนสินค้าในร้าน</th>
            <th>แก้</th>
            <th>ลบ</th>
        </tr>
    </thead>
    <tbody>
        {renderProducts()}
    </tbody>
</table>


        {/* Pagination */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-custom"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            ก่อนหน้า
          </button>
          <div>{renderPageNumbers()}</div>
          <button
            className="btn btn-custom"
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
