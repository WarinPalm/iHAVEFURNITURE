import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const Navbar = ({ onCategoryClick, activeCategory}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault(); // ป้องกันการส่งแบบฟอร์ม
        if (searchTerm) {
            navigate(`/searchProduct?query=${searchTerm}`); // เปลี่ยน path ไปที่หน้า searchProduct
        }
    };
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = () => {
            axios.get("http://localhost:3000/api/category")
                .then(res => setCategories(res.data))
                .catch(error => console.error("Error fetching categories:", error));
        };
    
        fetchCategories();
        const intervalId = setInterval(fetchCategories, 1000); // Fetch ทุก 1 วิ
    
        return () => clearInterval(intervalId);
    }, []);
    return (
        
        <div style={{position: 'sticky', top: "0", zIndex: "100"}}>
            <nav className="my-nav">
                <div className="container nav-content">
                    <h1 className="h1-text m-0">iHAVEFurniture</h1>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="input-group w-25 ms-auto">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for products..."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)} // อัปเดตค่าเมื่อมีการพิมพ์
                        />
                        <button className="btn search-btn" type="submit">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </form>
                    

                    <span className="button-login">
                        <button style={{ marginRight: '10px', marginLeft: '20px' }} className="circle-button" data-bs-toggle="modal" data-bs-target="#user-login">
                            <span className="material-symbols-outlined pt-1">person</span>
                        </button>
                        <Link to='../cart'><button className="circle-button">
                            <span style={{ color: 'black' }} className="material-symbols-outlined pt-1">shopping_cart</span>
                        </button></Link>
                    </span>
                </div>
            </nav>

            
            

            <nav className="my-nav2">
                <div className="container nav-content">
                    <div>
                        <span className="material-symbols-outlined">storefront</span>
                    </div>
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="../">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${activeCategory ? 'active' : ''}`}
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Product
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {categories.map(category => (
                                    <Link
                                        to='../viewall'
                                        key={category.id}
                                        className={`dropdown-item ${activeCategory === category.id ? 'active' : ''}`} 
                                        onClick={() => onCategoryClick(category.id)}
                                    >
                                        <li>{category.name}</li>
                                    </Link>
                                ))}
                            </ul>

                        </li>
                        <li className="nav-item">
                            <Link to="/history" className="nav-link" href="#about">History</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/billOrder" className="nav-link" href="#about">Payment</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about">Q&A</a>
                        </li>
                        <li className="nav-item">
                        <Link to="/test" className="nav-link" href="#about">Test</Link>
                        </li>                     
                    </ul>
                </div>
            </nav>
        </div>
            
        
    );
};

export default Navbar;
