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

const Adminproduct = () => {
    const [currentCategory, setCurrentCategory] = useState('');

    const [products, setProducts] = useState([]);

    //ส่งค่าไปให้ popup show product
    const [currentImage, setCurrentImage] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentDetail, setCurrentDetail] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');

    const [categories, setCategory] = useState([]); // สร้าง state สำหรับเก็บข้อมูล หมวดหมู่สินค้า
    const [form, setForm] = useState({ name: '', orderid: '', status: '' }); // สร้าง state สำหรับฟอร์มเพิ่ม/แก้ไข หมวดหมู่สินค้า
    const [editingId, setEditingId] = useState(null); // สร้าง state สำหรับเก็บ ID ของ หมวดหมู่สินค้า ที่กำลังแก้ไข

    

  

    useEffect(()=>{
      const fetchCategory = async () => {
        // ฟังก์ชันสำหรับดึงข้อมูลหมวดหมู่สินค้าเข้ามา (API)
        axios.get('http://localhost:3000/api/category') // ส่งคำขอ GET ไปยัง API
          .then(res => {
            setCategory(res.data); // ตั้งค่า state ที่ได้รับข้อมูลที่ลูกค้าออเดอร์เข้ามา
          })
          .catch(err => {
            console.error('Error fetching data: ', err); // แสดงข้อผิดพลาดถ้ามี
          });
      };
      fetchCategory();
    },[])
    

    return (
        <>
            <Navbar/>            
            <LoginModal />

            {/* วนลูปข้อมูลหมวดหมู่สินค้า */}
            <div className="container">
              {categories.map(category=>(
                <div key={category.id}>
                  <div className="d-flex justify-content-between">
                    <h2>{category.name}</h2>
                    <h2>Price (Bath)</h2>
                  </div>

                  <div className="row">
                    <div className="col-7">{category.name}</div>
                    <div className="col-1 ms-5 me-3">remove</div>
                    <div className="col-1 me-3">edit</div>
                    <div className="col-2">
                      <button className="btn btn-primary">{category.price}</button>
                    </div>
                  </div>

                </div>  
              ))}
            </div>

        </>
    );
};

export default Adminproduct;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// import { myProduct } from './MyProduct';
// import Navbar from './Navbar';
// import LoginModal from './Modal/LoginModal';
// import EditHeroImageModal from "./Modal/EditHeroImage";
// import HeroImage from './HeroImage';
// import ProductModal from './Modal/ProductModal';

// const Adminproduct = () => {
//     const [currentCategory, setCurrentCategory] = useState(() => {
//         const savedCategory = localStorage.getItem('currentCategory');
//         return savedCategory ? savedCategory : 'sofa';
//     });

//     const [products, setProducts] = useState([]);

//     //ส่งค่าไปให้ popup show product
//     const [currentImage, setCurrentImage] = useState('');
//     const [currentName, setCurrentName] = useState('');
//     const [currentDetail, setCurrentDetail] = useState('');
//     const [currentPrice, setCurrentPrice] = useState('');

//     useEffect(() => { 
//         const categoryItems = myProduct[currentCategory] || [];
//         setProducts(categoryItems); // สำหรับนำไปคำนวณจำนวนสินค้า products.length

//     }, [currentCategory]);

//     const handleCategoryClick = (category) => { 
//         setCurrentCategory(category);
//         localStorage.setItem('currentCategory', category);
//         setCurrentPage(1);
//     };


//     return (
//         <>
//             <Navbar onCategoryClick={handleCategoryClick}/>            
//             <LoginModal />

//             <section className="list-product">
//                 <div className="container">
//                     {/* สำหรับเขียนหน้าตา _html */}
//                     <br />
//                     <h2>Product | Sofa admin</h2>
//                     <div>
//                     <table class="table">
//                           <thead>
//                             <tr>
//                               <th scope="col">Name</th>
//                               <th scope="col"></th>
//                               <th scope="col">Phone number</th>
//                               <th scope="col">Email</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             <tr>
//                               <th scope="row">Jomprach</th> {/*Name*/}
//                               <td>remove</td> {/*remove*/}
//                               <td>081-xxx-xxxx</td> {/*Phone number*/}
//                               <td>xxx@gmail.com</td> {/*Email*/}
//                             </tr>
//                             <tr>
//                             <th scope="row">Jomprach</th> {/*Name*/}
//                               <td>remove</td> {/*remove*/}
//                               <td>081-xxx-xxxx</td> {/*Phone number*/}
//                               <td>xxx@gmail.com</td> {/*Email*/}
//                             </tr>
//                             <tr>
//                             <th scope="row">Jomprach</th> {/*Name*/}
//                               <td>remove</td> {/*remove*/}
//                               <td>081-xxx-xxxx</td> {/*Phone number*/}
//                               <td>xxx@gmail.com</td> {/*Email*/}
//                             </tr>
//                             <tr>
//                               <th scope="row">Jomprach</th> {/*Name*/}
//                               <td>remove</td> {/*remove*/}
//                               <td>081-xxx-xxxx</td> {/*Phone number*/}
//                               <td>xxx@gmail.com</td> {/*Email*/}
//                             </tr>
//                           </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </section>

//         </>
//     );
// };

// export default Adminproduct;
