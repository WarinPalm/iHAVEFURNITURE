import React from 'react';

const Register = () => {

    return (
        <section className="register">
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3">
                        <h1 className="text-center">Register</h1>

                        <form className="forgot-password-form mt-4 offset-md-3">
                            <div className="row">
                                <div className="mb-3 col-md-4">
                                    <label htmlFor="firstname-Input" className="form-label">Firstname</label>
                                    <input type="text" className="form-control" id="firstname-Input" placeholder="Firstname" required />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label htmlFor="lastname-Input" className="form-label">Lastname</label>
                                    <input type="text" className="form-control" id="lastname-Input" placeholder="Lastname" required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3 col-md-4">
                                    <label htmlFor="phone-number-Input" className="form-label">Phonenumber</label>
                                    <input type="number" className="form-control" id="phone-number-Input" placeholder="Phone number" required />
                                </div>
                                <div className="mb-3 col-md-4">
                                    <label htmlFor="dateofbirth-Input" className="form-label">Date of birth</label>
                                    <input type="text" className="form-control" id="dateofbirth-Input" placeholder="Date of birth" required />
                                </div>
                            </div>

                            <div className="mb-3 col-md-8">
                                <label htmlFor="user-Input" className="form-label">Email</label>
                                <input type="text" className="form-control" id="user-Input" placeholder="Email" required />
                            </div>
                            <div className="mb-3 col-md-8">
                                <label htmlFor="password-Input" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password-Input" placeholder="Password" required />
                            </div>
                            <div className="mb-3 col-md-8">
                                <label htmlFor="confirm-password-Input" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="confirm-password-Input" placeholder="Confirm Password" required />
                            </div>

                            <div className="mb-3 col-md-8" id="question">
                                <label htmlFor="question" className="form-label">Security Question</label>
                                <select className="form-select" required>
                                    <option value="" selected>--กรุณาเลือกคำถาม--</option>
                                    <option value="fav-dog">หมาที่ชอบ</option>
                                    <option value="fav-song">เพลงที่ชอบ</option>
                                    <option value="fav-person">บุคคลที่ชอบ</option>
                                    <option value="hobby">งานอดิเรกชอบทำอะไร</option>
                                </select>
                            </div>
                           
                        </form>

                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
