import React, { useState, useEffect } from "react";
import axios from "axios";
import useEcomStore from "../../store/ecom_store";
import { createProduct, editProduct } from "../../api/Product";
import { toast } from "react-toastify";

const initialState = { name: "", description: "", price: "", stock: "", categoryId: "" };

const FormProduct = ({ currentEditProduct}) => {
    const token = useEcomStore((state) => state.token);
    const [form, setForm] = useState(initialState);
    const [pictureFile, setPictureFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const categoriesNotBanner = categories.filter(category => category.name !== 'banner');
    const fetchCategories = ()=>{
        axios.get("http://localhost:3000/api/categories")
            .then(res => setCategories(res.data))
            .catch(err => { console.error("Error fetching categories:", err);});}

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (currentEditProduct) { //ตอนคลิ้ก edit ให้มีข้อมูลก่อนหน้า
            setForm({
                name: currentEditProduct.name,
                description: currentEditProduct.description,
                price: currentEditProduct.price,
                stock: currentEditProduct.stock,
                categoryId: currentEditProduct.categoryId,
            });
        } else {
            setForm(initialState);
            setPictureFile(null);
        }
    }, [currentEditProduct]);

    const handleOnChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleFileChange = e => setPictureFile(e.target.files[0]);

    const handleCreateSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach(key => formData.append(key, form[key]));
        if (pictureFile) formData.append("picture", pictureFile);
        try {
            const res = await createProduct(token, formData);
            toast.success(`เพิ่มสินค้าสำเร็จ`);
            setForm(initialState);
            setPictureFile(null);
        } catch (err) {
            console.error(err);
            toast.error("ไม่สามารถเพิ่มสินค้าได้");
        }
    };

    const handleEditSubmit = async e => {
        e.preventDefault();
        if (!currentEditProduct) return;
        const formData = new FormData();
        Object.keys(form).forEach(key => formData.append(key, form[key]));
        if (pictureFile) formData.append("picture", pictureFile);

        try {
            await editProduct(token, currentEditProduct.id, formData);
            toast.success(`แก้ไขแบนเนอร์สำเร็จ`);
            setForm(initialState);
            setPictureFile(null);
        } catch (err) {
            console.error(err);
            toast.error("ไม่สามารถแก้ไขแบนเนอร์ได้");
        }
    };

    const renderForm = (isEdit = false) => (
        <form onSubmit={isEdit ? handleEditSubmit : handleCreateSubmit} encType="multipart/form-data">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">ชื่อสินค้า</label>
                <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleOnChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">รายละเอียด</label>
                <textarea className="form-control" id="description" name="description" value={form.description} onChange={handleOnChange} rows="3" required></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">ราคา</label>
                <input type="number" className="form-control" id="price" name="price" value={form.price} onChange={handleOnChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="stock" className="form-label">จำนวนสินค้าในสต็อก</label>
                <input type="number" className="form-control" id="stock" name="stock" value={form.stock} onChange={handleOnChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="categoryId" className="form-label">หมวดหมู่</label>
                <select className="form-select" id="categoryId" name="categoryId" value={form.categoryId} onChange={handleOnChange} required>
                    <option value="" disabled>เลือกหมวดหมู่</option>
                    {categoriesNotBanner.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="picture" className="form-label">รูปภาพ</label>
                <input type="file" className="form-control" id="picture" onChange={handleFileChange} />
                {pictureFile && <small className="text-muted">อัปโหลดไฟล์ใหม่เพื่อเปลี่ยนรูปภาพ</small>}
            </div>
            <button type="submit" className="btn btn-primary">{isEdit ? "บันทึกการเปลี่ยนแปลง" : "บันทึก"}</button>
        </form>
    );

    return (
        <>
            <div className="modal fade" id="formCreateProductModal" tabIndex="-1" aria-labelledby="formProductModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="formProductModalLabel">เพิ่มสินค้าใหม่</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{renderForm()}</div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="formEditProductModal" tabIndex="-1" aria-labelledby="formEditProductModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="formEditProductModalLabel">แก้ไขสินค้า</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{renderForm(true)}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormProduct;
