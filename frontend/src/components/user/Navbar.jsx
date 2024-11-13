import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar = ({ onCategoryClick, activeCategory }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm) {
            navigate(`../user/searchProduct?query=${searchTerm}`);
            setSearchTerm('');
        }
    };

    useEffect(() => {
        const fetchCategories = () => {
            axios.get("http://localhost:3000/api/category")
                .then(res => setCategories(res.data))
                .catch(error => console.error("Error fetching categories:", error));
        };

        fetchCategories();
        const intervalId = setInterval(fetchCategories, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{ position: 'sticky', top: "0", zIndex: "100" }}>
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
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <button className="btn search-btn" type="submit">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                </form>

                {/* Profile and Cart Buttons */}
                <div className="d-flex align-items-center ms-3">
                    <button className="circle-button2 me-3">
                        
                    </button>
                    <Link to="../user/cart">
                        <button className="circle-button">
                            <span className="material-symbols-outlined">shopping_cart</span>
                        </button>
                    </Link>
                </div>
            </div>

            </nav>

            <nav className="my-nav2">
                <div className="container nav-content">
                    <div>
                        <span className="material-symbols-outlined">storefront</span>
                    </div>
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="../user">Home</Link>
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
                                        to={{
                                            pathname: '../user/viewall'
                                        }}
                                        key={category.id}
                                        className={`dropdown-item ${activeCategory === category.id ? 'active' : ''}`}
                                        state={{ categoryId: category.id }}
                                    >
                                        <li>{category.name}</li>
                                    </Link>
                                ))}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="../user/history" className="nav-link">History</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="../user/billOrder" className="nav-link">Payment</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="../user/q&a" className="nav-link">Q&A</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="../user/aboutus" className="nav-link">About Us</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
