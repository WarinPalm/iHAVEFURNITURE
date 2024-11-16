import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import useEcomStore from '../../store/ecom_store';

const NavbarAdmin = ({ activeCategory }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    
    const [categories, setCategories] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm) {
            navigate(`../user/searchProduct?query=${searchTerm}`);
            setSearchTerm('');
        }
    };
    const Logout = useEcomStore((state) => state.actionLogout);

    const handleLogout = () => {
        Logout();
        navigate('/');
    };

    useEffect(() => {
        const fetchCategories = () => {
            axios.get("http://localhost:3000/api/categories")
                .then(res => setCategories(res.data))
                .catch(error => console.error("Error fetching categories:", error));
        };

        fetchCategories();
        const intervalId = setInterval(fetchCategories, 1000);
        return () => clearInterval(intervalId);
    }, []);
    const categoryNotBanner = categories.filter(category => category.name != 'Banner')

    return (
        <div style={{ position: 'sticky', top: "0", zIndex: "100"}}>
            <nav className="my-nav" style={{height:"6vh"}}>
            <div className="container nav-content">
                <h1 className="h1-text m-0">iHAVEFurniture</h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="input-group w-25 ms-auto">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="ค้นหาสินค้า..."
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

                    <div className="dropdown">
                        <button
                            className="circle-button-admin me-3 dropdown-toggle"
                            id="profileDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                          
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                            <li><Link className="dropdown-item" to="../user/history">ประวัติการสั่งซื้อ</Link></li>
                            <li><Link className="dropdown-item" to="../user/userinfo">ข้อมูลผู้ใช้</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={handleLogout}>ออกจากระบบ</button></li>                        </ul>
                    </div>
                    
                </div>
            </div>

            </nav>

            <nav className="my-nav2" style={{height:"5vh"}}>
                <div className="container nav-content">
                    <div>
                        <span className="material-symbols-outlined">storefront</span>
                    </div>
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="../user">หน้าของลูกค้า</Link>
                        </li>
                        <li className="nav-item">   
                            <Link className="nav-link active" aria-current="page" to="../admin">หน้าแรก</Link>
                        </li>
                        
                        
                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${activeCategory ? 'active' : ''}`}
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                สินค้า
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {categoryNotBanner.map(category => (
                                    <Link
                                        to='../admin/adminproduct'
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
                            <Link to="../user/q&a" className="nav-link">คำถามที่พบบ่อย</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="../user/aboutus" className="nav-link">เกี่ยวกับเรา</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavbarAdmin;
