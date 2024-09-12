import React from 'react';
import { Link } from "react-router-dom";

const Navbar = ({ onCategoryClick, activeCategory }) => {
    return (
        
        <div style={{position: 'sticky', top: "0", zIndex: "100"}}>
            <nav className="my-nav">
                <div className="container nav-content">
                    <h1 className="h1-text">iHAVEFurniture</h1>
                    <span className="button-login">
                        <button style={{ marginRight: '10px' }} className="circle-button" data-bs-toggle="modal"
                            data-bs-target="#user-login">
                            <span className="material-symbols-outlined pt-1">person</span>
                        </button>
                        <button className="circle-button">
                            <Link to='../cart'><span className="material-symbols-outlined pt-1">shopping_cart</span></Link>
                        </button>
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
                                <Link to='../viewall' className={`dropdown-item ${activeCategory === 'sofa' ? 'active' : ''}`} 
                                    onClick={() => onCategoryClick('sofa')}>
                                    <li>Sofa</li>
                                </Link>

                                <Link to='../viewall' className={`dropdown-item ${activeCategory === 'bed' ? 'active' : ''}`} 
                                    onClick={() => onCategoryClick('bed')}>
                                    <li>Bed</li>
                                </Link>

                                <Link to='../viewall' className={`dropdown-item ${activeCategory === 'chair' ? 'active' : ''}`} 
                                    onClick={() => onCategoryClick('chair')}>
                                    <li>Chair</li>
                                </Link>

                                <Link to='../viewall' className={`dropdown-item ${activeCategory === 'table' ? 'active' : ''}`} 
                                    onClick={() => onCategoryClick('table')}>
                                    <li>Table</li>
                                </Link>
                                
                                <Link to='../viewall' className={`dropdown-item ${activeCategory === 'lamp' ? 'active' : ''}`} 
                                    onClick={() => onCategoryClick('lamp')}>
                                    <li>Lamp</li>
                                </Link>
                                
                                <Link to='../viewall' className={`dropdown-item ${activeCategory === 'kitchen' ? 'active' : ''}`} 
                                    onClick={() => onCategoryClick('kitchen')}>
                                    <li>Kitchen</li>
                                </Link>
                            </ul>

                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">My Profile</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
            
        
    );
};

export default Navbar;
