import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

import Navbar from '../Navbar/Navbar';
import LoginModal from '../Modal/LoginModal';
import ForgotPasswordModal from '../Modal/ForgotPasswordModal';
import HeroImage from '../HeroImage';
import Category from '../Aside/Category';
import Register from './register';

const Home = () =>{
    return(
        <>
      <Navbar />
      <LoginModal />
      <ForgotPasswordModal />
      <HeroImage />

        <section className="list-product">

            <div className="container text-center">
                <div className="col-2">
                    <h1 style={{ paddingTop: '30px' }} className="fs-2">Category</h1>
                </div>
                <div className="col-10 btn-seeall">
                    <a className="d-flex justify-content-end" id="seeall-btn" href="seeall.html">see all</a>
                </div>
                <div className="row">
                    <Category />
                    <div className="col-1 "></div>
                    <main className="row col-9 row-gap-3" id="show-product">
                        {/* Product display area */}
                    </main>
                </div>
            </div>
            <Register />
        </section>

  </>
    );
};

export default Home;