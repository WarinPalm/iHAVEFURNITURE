import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEcomStore from '../../store/ecom_store';
import { infoAboutMe } from '../../api/auth';

function UserInfo() {
    const [user, setUser] = useState(null); // Initialize user as null
    const token = useEcomStore((state) => state.token);

    const fetchAboutMe = async () => {
        try {
            const res = await infoAboutMe(token);
            setUser(res.data);
        } catch (err) {
            console.error('Error fetching user info:', err);
        }
    };

    useEffect(() => {
        fetchAboutMe();
    }, []);

    const renderUserInfo = () => {
        if (!user) {
            return <h4 className="text-danger">ยังไม่ได้กรอกข้อมูลส่วนตัว</h4>;
        }
        // ถ้ายังไม่ได้กรอกข้อมูลบางส่วน
        const checkProfile = !user.fName || !user.lName || !user.email || !user.telNo;
        if (checkProfile) {
            return (
                <>
                    <h5>
                        {user.fName || <span style={{ color: 'orange' }}>กรุณากรอกชื่อ</span>} {user.lName || <span style={{ color: 'orange' }}>กรุณากรอกนามสกุล</span>}
                    </h5>
                    <h4>อีเมล: {user.email || <span style={{ color: 'orange' }}>กรุณากรอกอีเมล</span>}</h4>
                    <h4>เบอร์โทร: {user.telNo || <span style={{ color: 'orange' }}>กรุณากรอกเบอร์โทร</span>}</h4>
                    <p style={{ color: 'red' }}>โปรดกรอกข้อมูลให้ครบถ้วน</p>
                </>
            );
        }

        return (
            <>
                <h2>
                    {user.fName} {user.lName}
                </h2>
                <h4>อีเมล: {user.email}</h4>
                <h4>เบอร์โทร: {user.telNo}</h4>
            </>
        );
    };

    return (
        <div>
            <div className="container">
                <h1 className="mt-5">ข้อมูลผู้ใช้</h1>
                <div className="card mt-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-2">
                                <div className="userprofile"></div>
                            </div>
                            <div className="col-8">
                                {renderUserInfo()}
                            </div>
                            <div className="col-2">
                                <Link to="../useredit">
                                    <button className="btn btn-custom w-100">แก้ไขข้อมูล</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
