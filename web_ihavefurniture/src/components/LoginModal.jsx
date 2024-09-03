
import React from 'react';

const LoginModal = () => {
    return (
        <div className="modal fade" id="user-login" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="my-form">
                            <h2>LOGIN</h2>
                            <div className="mb-3">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" id="exampleInputPassword1" required />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id="forgot-password-btn">
                                    Forgot password
                                </button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                                <a href="register.jsx" id="register-btn">Register</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
