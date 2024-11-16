import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
    const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });

    const handleOnChange = (event) => {
        setForm({...form,[event.target.name]: event.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();// ป้องกันการรีเฟรช
        if (form.password !== form.confirmPassword) {
            return alert("Confirm password does not match!");
        }
        console.log(form);

        try {
            // เมื่อมีเวลาติดต่อกับหลังบ้านจะต้องใช้ async await
            const res = await axios.post("http://localhost:3000/api/register", form);
            toast.success(res.data);
            console.log(res.data);
        } catch (err) {
            const errMsg = err.response?.data?.message;
            toast.error(errMsg);
            console.log(err);
        }
    };

    return (
            <div className="d-flex justify-content-center align-items-center bg-login" style={{ minHeight: '100vh' }}>
                <div className="card p-5 shadow-lg login-form w-50" style={{ minHeight: '500px' }}>
                <h3 className="card-title text-center mb-4">สมัครสมาชิก</h3>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">อีเมล</label>
                        <input
                            type="email"
                            className="form-control input-login"
                            id="email"
                            name="email"
                            placeholder="อีเมล"
                            onChange={handleOnChange}
                            value={form.email}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">รหัสผ่าน</label>
                        <input
                            type="password"
                            className="form-control input-login"
                            id="password"
                            name="password"
                            placeholder="รหัสผ่าน"
                            onChange={handleOnChange}
                            value={form.password}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm-password" className="form-label">ยืนยันรหัสผ่าน</label>
                        <input
                            type="password"
                            className="form-control input-login"
                            id="confirm-password"
                            name="confirmPassword"
                            placeholder="ยืนยันรหัสผ่าน"
                            onChange={handleOnChange}
                            value={form.confirmPassword}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-custom w-50">Register</button>
                    </div>
                </form>
                </div>
            </div>

    );
};

export default Register;
