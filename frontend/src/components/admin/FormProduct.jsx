import React, { useState, useEffect } from "react";
import axios from "axios";
import useEcomStore from "../../store/ecom_store";
import { createProduct, editProduct } from "../../api/Product";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  description: "",
  price: "",
  stock: "",
  categoryId: "",
};

const FormProduct = ({ currentEditProduct, onSuccess }) => {
  const token = useEcomStore((state) => state.token);
  const [form, setForm] = useState(initialState);
  const [pictureFile, setPictureFile] = useState(null); // จัดการไฟล์รูปภาพ
  const [categories, setCategories] = useState([]); // เก็บข้อมูลหมวดหมู่ทั้งหมด

  // ดึงข้อมูลหมวดหมู่
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("ไม่สามารถดึงข้อมูลหมวดหมู่ได้");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
      setForm(initialState);
      setPictureFile(null);
    }
  }, [currentEditProduct]);

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPictureFile(e.target.files[0]);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("picture", pictureFile);
    formData.append("stock", form.stock);
    formData.append("categoryId", form.categoryId);

    try {
      const res = await createProduct(token, formData);
      toast.success(`เพิ่มสินค้า ${res.data.name} สำเร็จ`);
      setForm(initialState);
      setPictureFile(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("ไม่สามารถเพิ่มสินค้าได้");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!currentEditProduct) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    if (pictureFile) formData.append("picture", pictureFile); // อัปเดตรูปภาพใหม่ถ้ามี
    formData.append("stock", form.stock);
    formData.append("categoryId", form.categoryId);

    try {
      await editProduct(token, currentEditProduct.id, formData);
      toast.success(`แก้ไขสินค้า ${form.name} สำเร็จ`);
      setForm(initialState);
      setPictureFile(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("ไม่สามารถแก้ไขสินค้าได้");
    }
  };

  return (
    <>
      {/* Modal สำหรับเพิ่มสินค้า */}
      <div
        className="modal fade"
        id="formCreateProductModal"
        tabIndex="-1"
        aria-labelledby="formProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="formProductModalLabel">
                เพิ่มสินค้าใหม่
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleCreateSubmit} encType="multipart/form-data">
                {/* Form Fields */}
                {renderFormFields(form, categories, handleOnChange, handleFileChange, pictureFile)}
                <button type="submit" className="btn btn-primary">
                  บันทึก
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal สำหรับแก้ไขสินค้า */}
      <div
        className="modal fade"
        id="formEditProductModal"
        tabIndex="-1"
        aria-labelledby="formEditProductModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="formEditProductModalLabel">
                แก้ไขสินค้า
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditSubmit} encType="multipart/form-data">
                {/* Form Fields */}
                {renderFormFields(form, categories, handleOnChange, handleFileChange, pictureFile)}
                <button type="submit" className="btn btn-primary">
                  บันทึกการเปลี่ยนแปลง
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const renderFormFields = (form, categories, handleOnChange, handleFileChange, pictureFile) => (
  <>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        ชื่อสินค้า
      </label>
      <input
        type="text"
        className="form-control"
        id="name"
        name="name"
        value={form.name}
        onChange={handleOnChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">
        รายละเอียด
      </label>
      <textarea
        className="form-control"
        id="description"
        name="description"
        value={form.description}
        onChange={handleOnChange}
        rows="3"
        required
      ></textarea>
    </div>
    <div className="mb-3">
      <label htmlFor="price" className="form-label">
        ราคา
      </label>
      <input
        type="number"
        className="form-control"
        id="price"
        name="price"
        value={form.price}
        onChange={handleOnChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="stock" className="form-label">
        จำนวนสินค้าในสต็อก
      </label>
      <input
        type="number"
        className="form-control"
        id="stock"
        name="stock"
        value={form.stock}
        onChange={handleOnChange}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="categoryId" className="form-label">
        หมวดหมู่
      </label>
      <select
        className="form-select"
        id="categoryId"
        name="categoryId"
        value={form.categoryId}
        onChange={handleOnChange}
        required
      >
        <option value="" disabled>
          เลือกหมวดหมู่
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-3">
      <label htmlFor="picture" className="form-label">
        รูปภาพ
      </label>
      <input
        type="file"
        className="form-control"
        id="picture"
        onChange={handleFileChange}
      />
      {pictureFile && <small className="text-muted">อัปโหลดไฟล์ใหม่เพื่อเปลี่ยนรูปภาพ</small>}
    </div>
  </>
);

export default FormProduct;
