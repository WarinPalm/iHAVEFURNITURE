import React from 'react';
import { Link } from "react-router-dom"
const Navbar = ({ onCategoryClick }) => {
    return (
        <>
        <nav style={{position:'sticky',top:"0", zIndex:"100"}} className="my-nav">
            <div className="container nav-content">
                <h1 className="h1-text">iHAVEFurniture</h1>
                <span className="button-login">
                    <button style={{ marginRight: '10px' }} className="circle-button" data-bs-toggle="modal"
                        data-bs-target="#user-login">
                        <span className="material-symbols-outlined pt-1">person</span>
                    </button>
                    <button className="circle-button">
                        <span className="material-symbols-outlined pt-1">shopping_cart</span>
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
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Product
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li className="dropdown-item" onClick={() => onCategoryClick('sofa')}>Sofa</li>
                            <li className="dropdown-item" onClick={() => onCategoryClick('bed')}>Bed</li>
                            <li className="dropdown-item" onClick={() => onCategoryClick('chair')}>Chair</li>
                            <li className="dropdown-item" onClick={() => onCategoryClick('table')}>Table</li>
                            <li className="dropdown-item" onClick={() => onCategoryClick('lamp')}>Lamp</li>
                            <li className="dropdown-item" onClick={() => onCategoryClick('kitchen')}>Kitchen</li>
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
    </>
        
    );
};

export default Navbar;