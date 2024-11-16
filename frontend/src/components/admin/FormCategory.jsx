import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createCategory, removeCategory} from '../../api/category';
import useEcomStore from '../../store/ecom_store';
import { toast } from 'react-toastify';

const FormCategory = () => {
    const token = useEcomStore((state) => state.token);
    const [categories, setCategories] = useState([]); // เก็บข้อมูลหมวดหมู่ทั้งหมด
    const [name, setName] = useState(''); // เก็บชื่อหมวดหมู่ใหม่

    // ดึงข้อมูลหมวดหมู่
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/categories");
            setCategories(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('ไม่สามารถดึงข้อมูลหมวดหมู่ได้');
        }
    };

    useEffect(() => {
        
        fetchCategories(); 
    }, []);

    // เพิ่มหมวดหมู่ใหม่
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            return toast.warning('Please fill data');
        }
        try {
            await createCategory(token, { name });
            toast.success(`เพิ่มหมวดหมู่สำเร็จ`);
            setName('');
            fetchCategories(); // อัปเดตข้อมูลหมวดหมู่
        } catch (err) {
            toast.error('เพิ่มหมวดหมู่ไม่สำเร็จ');
        }
    };

    // ลบหมวดหมู่
    const handleRemove = async(id)=>{
        console.log(id)
        try{
            await removeCategory(token,id)
            fetchCategories();
            toast.success('ลบหมวดหมู่สำเร็จ')
        }catch(err){
            toast.error('ลบหมวดหมู่ไม่สำเร็จ');
        }
    }

    return (
        <div className="modal fade" id="formCategoryModal" tabIndex="-1" aria-labelledby="formCategoryModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="formCategoryModalLabel">จัดการหมวดหมู่</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* ฟอร์มเพิ่มหมวดหมู่ใหม่ */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="categoryName" className="form-label">ชื่อหมวดหมู่ใหม่</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="categoryName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mb-3">บันทึก</button>
                        </form>

                        {/* แสดงหมวดหมู่ที่มีอยู่ */}
                        <h6>หมวดหมู่ที่มีอยู่</h6>
                        <ul className="list-group">
                            {categories.map((category) => (
                                <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {category.name}
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleRemove(category.id)}
                                    >
                                        ลบ
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormCategory;
