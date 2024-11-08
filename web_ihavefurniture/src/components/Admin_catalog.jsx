import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { myProduct } from './MyProduct';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import EditHeroImageModal from "./Modal/EditHeroImage";
import HeroImage from './HeroImage';
import ProductModal from './Modal/ProductModal';

const AdminCatalog = () => {
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
                    <h2>CATALOG admin</h2>
                    
                    <div>
                    {/* Sofa */}
                    <table class="table">
                          <thead>
                            <tr>
                              <th scope="col-6">Sofa</th>
                              <th scope="col-2"></th>
                              <th scope="col-2"></th>
                              <th scope="col-2">Price(Baht)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">sofa1.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                              <th scope="row">sofa2.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">sofa3.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">sofa4.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                          </tbody>
                        </table>

                        {/* Chair */}
                    <table class="table">
                          <thead>
                            <tr>
                              <th scope="col-6">Chair</th>
                              <th scope="col-2"></th>
                              <th scope="col-2"></th>
                              <th scope="col-2"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">chair1.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                              <th scope="row">chair2.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">chair3.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">chair4.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                          </tbody>
                        </table>

                        {/* Desk & Table */}
                    <table class="table">
                          <thead>
                            <tr>
                              <th scope="col-6">Desk & Table</th>
                              <th scope="col-2"></th>
                              <th scope="col-2"></th>
                              <th scope="col-2"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">Desk1.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                              <th scope="row">Desk2.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">Table1.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">Table2.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                          </tbody>
                        </table>

                        {/* Lamp */}
                    <table class="table">
                          <thead>
                            <tr>
                              <th scope="col-6">Lamp</th>
                              <th scope="col-2"></th>
                              <th scope="col-2"></th>
                              <th scope="col-2"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">Lamp1.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                              <th scope="row">Lamp2.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">Lamp3.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">Lamp4.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                          </tbody>
                        </table>

                        {/* Bed */}
                    <table class="table">
                          <thead>
                            <tr>
                              <th scope="col-6">Bed</th>
                              <th scope="col-2"></th>
                              <th scope="col-2"></th>
                              <th scope="col-2"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">bed1.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                              <th scope="row">bed2.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">bed3.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">bed4.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                          </tbody>
                        </table>

                        {/* Kitchenware */}
                    <table class="table">
                          <thead>
                            <tr>
                              <th scope="col-6">Kitchenware</th>
                              <th scope="col-2"></th>
                              <th scope="col-2"></th>
                              <th scope="col-2"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">kit1.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                              <th scope="row">kit2.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">kit3.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                            <tr>
                            <th scope="row">kit4.jpg</th> {/*Name*/}
                              <td>remove</td> {/*remove*/}
                              <td>edit</td> {/*edit*/}
                              <td>3,900</td> {/*Price(Baht)*/}
                            </tr>
                          </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AdminCatalog;
