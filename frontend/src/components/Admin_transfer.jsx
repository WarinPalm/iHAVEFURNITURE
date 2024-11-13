import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { myProduct } from './MyProduct';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import EditHeroImageModal from "./Modal/EditHeroImage";
import HeroImage from './HeroImage';
import ProductModal from './Modal/ProductModal';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AdminTransfer = () => {
    const [currentCategory, setCurrentCategory] = useState(() => {
        const savedCategory = localStorage.getItem('currentCategory');
        return savedCategory ? savedCategory : 'sofa';
    });

    const [products, setProducts] = useState([]);

    //ส่งค่าไปให้ popup show product
    const [currentImage, setCurrentImage] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDetail, setCurrentDetail] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');

    const [customer, setCustomer] = useState([]); // สร้าง state สำหรับเก็บข้อมูล user
    const [form, setForm] = useState({ name: '', orderid: '', status: '' }); // สร้าง state สำหรับฟอร์มเพิ่ม/แก้ไข user
    const [editingId, setEditingId] = useState(null); // สร้าง state สำหรับเก็บ ID ของ user ที่กำลังแก้ไข

    useEffect(() => { 
        const categoryItems = myProduct[currentCategory] || [];
        setProducts(categoryItems); // สำหรับนำไปคำนวณจำนวนสินค้า products.length

    }, [currentCategory]);

    const handleCategoryClick = (category) => { 
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1);
    };

    return (
        <>
            <Navbar onCategoryClick={handleCategoryClick}/>            
            <LoginModal />

            <section className="list-product">
                <div className="container">
                    {/* สำหรับเขียนหน้าตา _html */}
                    <br />
                    <h2>Tansfer notification</h2>
                    <div>
                    <table class="table text-center table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Order ID</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">Jomprach</th> {/*Name*/}
                              <td>#W835749801</td> {/*Order ID*/}
                              <td class="text-warning">รอการอนุมัติ</td> {/*Status*/}
                            </tr>
                            <tr>
                              <th scope="row">Jomprach</th> {/*Name*/}
                              <td>#W835749801</td> {/*Order ID*/}
                              <td class="text-success">อนุมัติคำสั่งซื้อ</td> {/*Status*/}
                            </tr>
                            <tr>
                              <th scope="row">Jomprach</th> {/*Name*/}
                              <td>#W835749801</td> {/*Order ID*/}
                              <td class="text-danger">รอการส่งหลักฐาน</td> {/*Status*/}
                            </tr>
                            <tr>
                              <th scope="row">Jomprach</th> {/*Name*/}
                              <td>#W835749801</td> {/*Order ID*/}
                              <td class="text-danger">รอการส่งหลักฐาน</td> {/*Status*/}
                            </tr>
                          </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AdminTransfer;
