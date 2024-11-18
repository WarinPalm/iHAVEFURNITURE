import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createCategory, editCategory, removeCategory } from '../../api/category';
import useEcomStore from '../../store/ecom_store';
import { toast } from 'react-toastify';

const FormCategory = () => {
    const token = useEcomStore((state) => state.token);
    const [categories, setCategories] = useState([]); // เก็บข้อมูลหมวดหมู่ทั้งหมด
    const [name, setName] = useState(''); // สำหรับเพิ่มหมวดหมู่ใหม่
    const [currentEditCategory, setCurrentEditCategory] = useState(null); // เก็บข้อมูลหมวดหมู่ที่แก้ไข
    const categoriesNotBanner = categories.filter(category => category.name !== 'banner');
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
            return toast.warning('กรุณากรอกชื่อหมวดหมู่');
        }
        try {
            await createCategory(token, { name });
            toast.success('เพิ่มหมวดหมู่สำเร็จ');
            setName('');
            fetchCategories();
        } catch (err) {
            toast.error('เพิ่มหมวดหมู่ไม่สำเร็จ');
        }
    };

    // ลบหมวดหมู่
    const handleRemove = async (id) => {
        try {
            await removeCategory(token, id);
            fetchCategories();
            toast.success('ลบหมวดหมู่สำเร็จ');
        } catch (err) {
            toast.error('ลบหมวดหมู่ไม่สำเร็จ');
        }
    };

    // แก้ไขหมวดหมู่
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!currentEditCategory) return;
        try {
            await editCategory(token, currentEditCategory.id, { name: currentEditCategory.name });
            fetchCategories();
            toast.success('แก้ไขหมวดหมู่สำเร็จ');
            setCurrentEditCategory(null); 

    
        } catch (err) {
            console.error('Error editing category:', err);
            toast.error('แก้ไขหมวดหมู่ไม่สำเร็จ');
        }
    };
    

    return (
        <>
            {/* Modal สำหรับแสดงหมวดหมู่ */}
            <div className="modal fade" id="formShowCategoriesModal" tabIndex="-1" aria-labelledby="formShowCategoriesModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">หมวดหมู่ที่มีอยู่</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                {categoriesNotBanner.map((category) => (
                                    <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span>{category.name}</span>
                                        <div>
                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#formEditCategoryModal"
                                                onClick={() => setCurrentEditCategory(category)}
                                            >
                                                แก้ไข
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleRemove(category.id)}
                                            >
                                                ลบ
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal สำหรับเพิ่มหมวดหมู่ */}
            <div className="modal fade" id="formCreateCategoryModal" tabIndex="-1" aria-labelledby="formCreateCategoryModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">เพิ่มหมวดหมู่</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="categoryName" className="form-label">ชื่อหมวดหมู่</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="categoryName"
                                        placeholder="เพิ่มชื่อหมวดหมู่"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">เพิ่มหมวดหมู่</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            

            {/* Modal สำหรับแก้ไขหมวดหมู่ */}
            <div className="modal fade" id="formEditCategoryModal" tabIndex="-1" aria-labelledby="formEditCategoryModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">แก้ไขหมวดหมู่</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {currentEditCategory && (
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="editCategoryName" className="form-label">ชื่อหมวดหมู่</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editCategoryName"
                                            value={currentEditCategory.name}
                                            onChange={(e) =>
                                                setCurrentEditCategory({ ...currentEditCategory, name: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">บันทึกการเปลี่ยนแปลง</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    );
};

export default FormCategory;
