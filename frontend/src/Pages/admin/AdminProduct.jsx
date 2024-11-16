import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

function AdminProduct() {
  const location = useLocation();
  const categoryNow = location.state?.categoryId || 2;

  const [currentCategory, setCurrentCategory] = useState(categoryNow); // default category id == sofa

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // สินค้าที่ผ่านการค้นหา
  const [searchTerm, setSearchTerm] = useState(''); // คำค้นหา

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(10); // จำนวนสินค้าต่อหน้า
  const [categories, setCategories] = useState([]); // เพิ่ม state สำหรับเก็บข้อมูลหมวดหมู่
  const currentCategoryName = categories.find(category => category.id === currentCategory)?.name || ''
  // ดึงข้อมูลสินค้า
  useEffect(() => {
    const fetchProduct = () => {
      axios.get("http://localhost:3000/api/products")
        .then(res => {
          setProducts(res.data.products);
          setFilteredProducts(res.data.products.filter(product => product.categoryId === currentCategory));
        })
        .catch(error => console.error('Error Fetching Products' + error));
    }
    fetchProduct();
  }, [currentCategory]);

  // ดึงข้อมูลหมวดหมู่
  useEffect(() => {
    const fetchCategories = () => {
      axios.get("http://localhost:3000/api/categories")
        .then(res => setCategories(res.data))
        .catch(error => console.error('Error Fetching Categories' + error));
    };
    fetchCategories();
  }, []);

  //ดึงค่าของ category ปัจจุบันมา
  useEffect(() => {
    setCurrentCategory(categoryNow);
    setCurrentPage(1);
  }, [categoryNow]);
  
  // ฟิลเตอร์สินค้าตามคำค้นหา
  useEffect(() => {
    const filtered = products.filter(product =>
      product.categoryId === currentCategory &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // รีเซ็ตหน้ากลับไปหน้าแรก
  }, [searchTerm, products, currentCategory, itemsPerPage]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // อัปเดตคำค้นหา
  };

  //method สำหรับลบข้อมูล
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/product-del/${id}`);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  const renderProducts = () => {
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

    return filteredProducts.slice(startIndex, endIndex).map(product => (
      <tr key={product.id}>
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
          <button className="btn btn-link text-danger" onClick={() => deleteProduct(product.id)}>ลบ</button>
        </td>
      </tr>
    ));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} className={`btn ${i === currentPage ? 'btn-custom' : 'btn-custom2'} mx-1`}
          onClick={() => setCurrentPage(i)}>
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
          <h1 className="fw-bold">สินค้า | {currentCategoryName}</h1>
          <input
            type="text"
            className="form-control w-25"
            placeholder="ค้นหาสินค้า..."
            value={searchTerm}
            onChange={handleSearchChange}
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

        <div className="d-flex justify-content-between mt-4 mb-4">
          <button
            className="btn btn-custom"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ก่อนหน้า
          </button>
          <div>{renderPageNumbers()}</div>
          <button
            className="btn btn-custom"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
