import React from 'react';

const ForgotPasswordModal = () => {
    return (
        <div className="modal fade" id="forgot-password-modal" tabIndex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Forgot Password</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalButton"></button>
                    </div>
                    <div className="modal-body">
                        <form className="forgotpass-form">
                            <p>Enter your username to reset your password.</p>
                            <div className="mb-3">
                                <label htmlFor="usernameInput" className="form-label">Username</label>
                                <input type="text" name="username" className="form-control" id="usernameInput" placeholder="Enter your username" required />
                            </div>
                            <div className="mb-3" id="question" style={{ display: 'none' }}>
                                <label htmlFor="question-select" className="form-label">Security Question</label>
                                <select className="form-select" id="question-select" required>
                                    <option value="" selected>--กรุณาเลือกคำถาม--</option>
                                    <option value="fav-dog">หมาที่ชอบ</option>
                                    <option value="fav-song">เพลงที่ชอบ</option>
                                    <option value="fav-person">บุคคลที่ชอบ</option>
                                    <option value="hobby">งานอดิเรกชอบทำอะไร</option>
                                </select>
                            </div>
                            <div id="answer-container" style={{ display: 'none' }}>
                                <div className="mb-3">
                                    <label htmlFor="answer" className="form-label">Your Answer</label>
                                    <input type="text" name="answer" className="form-control" id="answer" placeholder="Enter your answer" required />
                                </div>
                            </div>
                        </form>

                        <form className="resetpass-form" style={{ display: 'none' }}>
                            <p>Enter new password.</p>
                            <br />
                            <input type="password" name="new-password" className="form-control" placeholder="Enter your new password" required />
                            <br />
                            <p>Confirm password.</p>
                            <br />
                            <input type="password" name="confirm-new-password" className="form-control" placeholder="Confirm your new password" required />
                            <br />
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModalButton">Close</button>
                        <button type="submit" className="btn btn-primary" id="submit-button">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
