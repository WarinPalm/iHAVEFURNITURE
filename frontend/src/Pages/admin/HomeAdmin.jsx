import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import HeroImage from "../HeroImage";
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ModalEditHeroImage from "./ModalEditHeroImage";

const HomeAdmin = () => {


    return (
        <>
               
            <HeroImage />
            <ModalEditHeroImage/>

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

export default HomeAdmin;
