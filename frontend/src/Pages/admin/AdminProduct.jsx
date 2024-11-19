import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import FormCategory from '../../components/admin/FormCategory';
import { deleteProduct } from '../../api/Product';
import useEcomStore from '../../store/ecom_store';
import FormProduct from '../../components/admin/FormProduct';

function AdminProduct() {
  const token = useEcomStore((state) => state.token);

  const location = useLocation();
  const categoryNow = location.state?.categoryId || 0;

  const [currentCategory, setCurrentCategory] = useState(categoryNow);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(10);
  const [categories, setCategories] = useState([]);

  const [editProduct, setEditProduct] = useState(null);
  const currentCategoryName = categories.find(category => category.id === currentCategory)?.name || '';

  // ดึงข้อมูลสินค้า
  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data.products.filter(product => product.categoryId !== 7));
      setFilteredProducts(res.data.products.filter(product => product.categoryId === currentCategory));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  // ดึงข้อมูลหมวดหมู่
  const fetchCategories = () => {
    axios.get("http://localhost:3000/api/categories")
      .then(res => setCategories(res.data))
      .catch(error => console.error('Error Fetching Categories:', error));
  };

  
  useEffect(() => {
      fetchCategories();
      fetchProduct();
  }, [ ]);

  // อัปเดต currentCategory เมื่อ categoryNow เปลี่ยน
  useEffect(() => {
    setCurrentCategory(categoryNow);
    setCurrentPage(1);
  }, [categoryNow]);

  // ฟิลเตอร์สินค้าตามคำค้นหา
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = currentCategory === 0 || product.categoryId === currentCategory;
  
      // รวมเงื่อนไขการค้นหาและหมวดหมู่
      return matchesSearch && matchesCategory;
    });
  
    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  }, [searchTerm, products, currentCategory, itemsPerPage]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // ลบสินค้า
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(token, id);
      toast.success("ลบสินค้าเรียบร้อยแล้ว");
      fetchProduct();
    } catch (err) {
      toast.error(err)
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
    if(currentCategory==0){
      return products.slice(startIndex, endIndex).map(product => (
        <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
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
            <button className="btn btn-link text-primary w-100" data-bs-toggle="modal" 
            data-bs-target="#formEditProductModal"
            onClick={()=>setEditProduct(product)}><i className="bi bi-pencil-square"></i></button>
          </td>
          <td>
            <button className="btn btn-link text-danger w-100" onClick={() => handleDeleteProduct(product.id)}><i className="bi bi-trash"></i></button>
          </td>
        </tr>
      ));
    }
    return filteredProducts.slice(startIndex, endIndex).map(product => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
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
          <button className="btn btn-link text-primary w-100" data-bs-toggle="modal" 
          data-bs-target="#formEditProductModal"
          onClick={()=>setEditProduct(product)}><i className="bi bi-pencil-square"></i></button>
        </td>
        <td>
          <button className="btn btn-link text-danger w-100" onClick={() => handleDeleteProduct(product.id)}><i className="bi bi-trash"></i></button>
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
          {currentCategory === 0 ? <h1 className="fw-bold">สินค้า | สินค้าทั้งหมด </h1>:
          <h1 className="fw-bold">สินค้า | {currentCategoryName}</h1>}
          <input
            type="text"
            className="form-control w-25"
            placeholder="ค้นหาชื่อสินค้า..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="d-flex justify-content-start mb-3">

          <button
            className="btn btn-custom"
            data-bs-toggle="modal"
            data-bs-target="#formShowCategoriesModal">
            จัดการหมวดหมู่สินค้า
          </button>
          <button
            className='btn btn-custom ms-3'
            data-bs-toggle="modal"
            data-bs-target="#formCreateCategoryModal">
            เพิ่มหมวดหมู่
          </button>
          <button
            className='btn btn-custom ms-3'
            data-bs-toggle="modal"
            data-bs-target="#formCreateProductModal">
            เพิ่มสินค้า
          </button>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>รหัสสินค้า</th>
              <th>ชื่อสินค้า</th>
              <th>รายละเอียด</th>
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

      <FormCategory />
      <FormProduct currentEditProduct={editProduct} fetchProduct={fetchProduct} />

    </div>
  );
}

export default AdminProduct;
