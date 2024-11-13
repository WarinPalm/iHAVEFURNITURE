import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
    // Javascript code
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleOnChange = (event) => {
        // code
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรช
        if (form.password !== form.confirmPassword) {
            return alert("Confirm password is not match!!!");
        }
        console.log(form);
        // send to back
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
        <div>
            Register
            <form onSubmit={handleSubmit}>
                Email
                <input
                    className="border"
                    onChange={handleOnChange}
                    name="email"
                    type="email"
                />
                Password
                <input
                    className="border"
                    onChange={handleOnChange}
                    name="password"
                    type="text"
                />
                Confirm Password
                <input
                    className="border"
                    onChange={handleOnChange}
                    name="confirmPassword"
                    type="text"
                />
                <button className="bg-blue-500 rounded-md">Register</button>
            </form>
        </div>
    );
};

export default Register;
