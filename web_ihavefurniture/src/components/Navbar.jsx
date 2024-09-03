

import React from 'react';

const Navbar = () => {
    return (
        <>
        <nav className="my-nav">
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
                    <a className="nav-link active" aria-current="page" href="#home">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#product">Product</a>
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