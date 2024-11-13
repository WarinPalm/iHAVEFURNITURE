import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
    const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });

    const handleOnChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
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
        <section className="register">
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3">
                        <h1 className="text-center">Register</h1>
                        <form className="forgot-password-form mt-4 offset-md-3" onSubmit={handleSubmit}>
                            <div className="mb-3 col-md-8">
                                <label htmlFor="email" className="form-label">อีเมล</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="อีเมล"
                                    onChange={handleOnChange}
                                    value={form.email}
                                />
                            </div>
                            <div className="mb-3 col-md-8">
                                <label htmlFor="password" className="form-label">รหัสผ่าน</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="รหัสผ่าน"
                                    onChange={handleOnChange}
                                    value={form.password}
                                />
                            </div>
                            <div className="mb-3 col-md-8">
                                <label htmlFor="confirm-password" className="form-label">ยืนยันรหัสผ่าน</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirm-password"
                                    name="confirmPassword"
                                    placeholder="ยืนยันรหัสผ่าน"
                                    onChange={handleOnChange}
                                    value={form.confirmPassword}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
