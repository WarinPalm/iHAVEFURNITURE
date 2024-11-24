import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom_store";
import { createProduct, editProduct } from "../../api/Product";
import { toast } from "react-toastify";

const FormBanner = ({ currentEditProduct}) => {
    const productForm = { name: "", description: "", price: "", stock: "", categoryId: 7 }; //สร้างค่าในฟอร์ม
    const token = useEcomStore((state) => state.token); //เรียกใช้โทเคน
    const [form, setForm] = useState(productForm); //สร้างฟอร์มสำหรับส่งไปยัง backend
    const [pictureFile, setPictureFile] = useState(null); //ตัวแปรสำหรับเก็บภาพ
    
    useEffect(() => {
        if (currentEditProduct) {
            setForm({
                name: currentEditProduct.name,
                description: currentEditProduct.description,
                price: currentEditProduct.price,
                stock: currentEditProduct.stock,
                categoryId: currentEditProduct.categoryId,
            });
        } else {
            setForm(productForm);
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
            await createProduct(token, formData);
            toast.success(`เพิ่มแบนเนอร์สำเร็จ`);
            setForm(productForm);
            setPictureFile(null);
        } catch (err) {
            console.error(err);
            toast.error("ไม่สามารถเพิ่มแบนเนอร์ได้");
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
            toast.success(`แก้ไขสินค้า ${form.name} สำเร็จ`);
            setForm(initialState);
            setPictureFile(null);
        } catch (err) {
            console.error(err);
            toast.error("ไม่สามารถแก้ไขสินค้าได้");
        }
    };

    const renderForm = (isEdit = false) => (
        <form onSubmit={isEdit ? handleEditSubmit : handleCreateSubmit} encType="multipart/form-data">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">ชื่อแบนเนอร์</label>
                <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleOnChange} required />
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
            <div className="modal fade" id="formCreateBanner" tabIndex="-1" aria-labelledby="formProductModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="formProductModalLabel">เพิ่มแบนเนอร์ใหม่</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{renderForm()}</div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="formEditBanner" tabIndex="-1" aria-labelledby="formEditProductModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="formEditProductModalLabel">แก้ไขแบนเนอร์</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{renderForm(true)}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormBanner;
