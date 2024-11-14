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

const Home = () => {
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
            <HeroImage />
            <EditHeroImageModal/>

            <section className="list-product">
                <div className="container">
                    {/* สำหรับเขียนหน้าตา _html */}
                    <a href="#" data-bs-toggle="modal" data-bs-target="#Edit-Hero-Image" value=""><h2 className="text-center">Edit Hero Image</h2></a>
                    {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Edit-Hero-Image">
                    Edit Hero Image
                    </button> */}
                    <br />
                    <h2>Orders</h2>
                    <div>
                    <table class="table text-center table-bordered">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Order ID</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody> {/* เนื้อหาของตาราง */}
                            
                            
                          </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Home;