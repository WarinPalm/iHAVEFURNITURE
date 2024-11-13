import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom_store";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const navigate = useNavigate();
    const actionLogin = useEcomStore((state) => state.actionLogin);
    const user = useEcomStore((state) => state.user);
    console.log('user from zustand', user);

    const [form, setForm] = useState({ email: "", password: "" });

    const handleOnChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await actionLogin(form);
            const role = res.data.payload.role;
            roleRedirect(role);
            toast.success('Welcome User');
        } catch (err) {
            console.log(err);
            const errMsg = err.response?.data?.message;
            toast.error(errMsg);
        }
    };

    const roleRedirect = (role) => {
        if (role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/user');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f0f0f5' }}>
            <div className="card p-5 shadow-lg" style={{ width: "500px", borderRadius: "10px", backgroundColor: '#ffffff', color: 'white' }}>
                <h3 className="card-title text-center mb-4" style={{ color: '#BAA495' }}>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label" style={{ color: '#BAA495' }}>Email</label>
                        <input
                            className="form-control"
                            id="email"
                            onChange={handleOnChange}
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            style={{borderColor: 'black' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label" style={{ color: '#BAA495' }}>Password</label>
                        <input
                            className="form-control"
                            id="password"
                            onChange={handleOnChange}
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            style={{borderColor: 'black' }}
                        />
                    </div>
                    <button type="submit" className="btn w-100" style={{ backgroundColor: '#C8C6C2', color: '#3a3f58' }}>Login</button>
                </form>
                <div className="text-center mt-4">
                    <Link to="../register" className="text-decoration-none" style={{ color: '#ffc107' }}>Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
