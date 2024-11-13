import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { myProduct } from './MyProduct';
import Navbar from './Navbar';
import LoginModal from './Modal/LoginModal';
import EditHeroImageModal from "./Modal/EditHeroImage";
import HeroImage from './HeroImage';
import ProductModal from './Modal/ProductModal';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Home = () => {
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
      fetchCustomer();
        const categoryItems = myProduct[currentCategory] || [];
        setProducts(categoryItems); // สำหรับนำไปคำนวณจำนวนสินค้า products.length

    }, [currentCategory]);

    const handleCategoryClick = (category) => { 
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
        setCurrentPage(1);
    };

    const fetchCustomer = async () => {
      // ฟังก์ชันสำหรับดึงข้อมูลที่ลูกค้าออเดอร์เข้ามา (CkeckStatus) API
      axios.get('http://localhost:3000/customer') // ส่งคำขอ GET ไปยัง API
        .then(res => {
          setCustomer(res.data); // ตั้งค่า state ที่ได้รับข้อมูลที่ลูกค้าออเดอร์เข้ามา
        })
        .catch(err => {
          console.error('Error fetching data: ', err); // แสดงข้อผิดพลาดถ้ามี
        });
    };

    const createCustomer = async () => {
      // ฟังก์ชันสำหรับสร้างผู้ใช้ใหม่
      try {
        await axios.post('http://localhost:3000/customer', form); // ส่งคำขอ POST พร้อมข้อมูลฟอร์ม
        await fetchCustomer(); // เรียกดูข้อมูลใหม่หลังจากสร้างนักเรียน
        setForm({ id:'', firstName: '', lastName: '', phoneNumber: '', dob: '', email: '', password: '', confirmPassword: '' }); // รีเซ็ตฟอร์ม
        $('#addCustomerModal').modal('hide'); // ปิด modal หลังจากสร้างเสร็จ
      } catch (error) {
        console.error('Error creating customer:', error); // แสดงข้อผิดพลาดถ้ามี
      }
    };
  
    const deleteCustomer = async (id) => {
      // ฟังก์ชันสำหรับลบนักเรียนตาม ID
      try {
        await axios.delete(`http://localhost:3000/customer/${id}`); // ส่งคำขอ DELETE ไปยัง API
        await fetchCustomer(); // เรียกดูข้อมูลใหม่หลังจากลบ
      } catch (error) {
        console.error('Error deleting customer:', error); // แสดงข้อผิดพลาดถ้ามี
      }
    };
  
    const handleEdit = (customer) => {
      // ฟังก์ชันสำหรับตั้งค่าฟอร์มเพื่อแก้ไขนักเรียน
      setForm({ id:customer.id, firstName: customer.firstName, lastName: customer.lastName, phoneNumber: customer.phoneNumber, date_of_birth:customer.dob, email:customer.email, password:customer.password, confirmPassword:customer.confirmPassword }); // ตั้งค่าฟอร์มด้วยข้อมูลนักเรียนที่เลือก
      setEditingId(customer.id); // ตั้งค่า ID สำหรับการแก้ไข
      $('#editCustomerModal').modal('show'); // แสดง modal เมื่อแก้ไข
    };
  
    const updateCustomer = async () => {
      // ฟังก์ชันสำหรับอัปเดตข้อมูลนักเรียน
      try {
        await axios.put(`http://localhost:3000/customer/${editingId}`, form); // ส่งคำขอ PUT พร้อมข้อมูลฟอร์ม
        await fetchCustomer(); // เรียกดูข้อมูลใหม่หลังจากอัปเดต
        setForm({ id:'', firstName: '', lastName: '', phoneNumber: '', dob: '', email: '', password: '', confirmPassword: '' }); // รีเซ็ตฟอร์ม
        setEditingId(null); // ตั้งค่า ID สำหรับการแก้ไขเป็น null
        $('#editCustomerModal').modal('hide'); // ปิด modal หลังจากอัปเดตเสร็จ
      } catch (error) {
        console.error('Error updating customer:', error); // แสดงข้อผิดพลาดถ้ามี
      }
    };

    return (
        <>
            <Navbar onCategoryClick={handleCategoryClick}/>            
            <LoginModal />
            <HeroImage />
            <EditHeroImageModal/>

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
                            
                            {customer.map((customer) => ( // ทำการวนลูปผ่านข้อมูลนักเรียน
                              <tr key={customer.id}> {/* ใช้ ID ของผู้ใช้เป็น key */}
                                <td>{customer.id}</td>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>
                                  <button className="btn btn-warning" onClick={() => handleEdit(customer)}>Edit</button> {/* ปุ่มแก้ไข */}
                                  <button className="btn btn-danger ms-2" onClick={() => deleteCustomer(customer.id)}>Delete</button> {/* ปุ่มลบ */}
                                </td>
                              </tr>
                            ))}

                          </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Home;
