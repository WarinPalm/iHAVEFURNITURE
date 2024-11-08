import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { myProduct } from './MyProduct';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import EditHeroImageModal from "./Modal/EditHeroImage";
import HeroImage from './HeroImage';
import ProductModal from './Modal/ProductModal';

const AdminUserData = () => {
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

            <section className="list-product">
                <div className="container">
                    {/* สำหรับเขียนหน้าตา _html */}
                    <br />
                    <h2>User data</h2>
                    <div>
                    <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col"></th>
                              <th scope="col">Phone number</th>
                              <th scope="col">Email</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">Jomprach</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>081-xxx-xxxx</td> {/*Phone number*/}
                              <td>xxx@gmail.com</td> {/*Email*/}
                            </tr>
                            <tr>
                            <th scope="row">Jomprach</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>081-xxx-xxxx</td> {/*Phone number*/}
                              <td>xxx@gmail.com</td> {/*Email*/}
                            </tr>
                            <tr>
                            <th scope="row">Jomprach</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>081-xxx-xxxx</td> {/*Phone number*/}
                              <td>xxx@gmail.com</td> {/*Email*/}
                            </tr>
                            <tr>
                              <th scope="row">Jomprach</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>081-xxx-xxxx</td> {/*Phone number*/}
                              <td>xxx@gmail.com</td> {/*Email*/}
                            </tr>
                          </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AdminUserData;
