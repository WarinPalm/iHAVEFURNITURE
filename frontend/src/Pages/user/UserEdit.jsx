import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEcomStore from '../../store/ecom_store';
import { infoAboutMe } from '../../api/auth';

function UserEdit() {
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
  return (
    <div>
        <div className="container">
            <h1 className='mt-5'>แก้ไขข้อมูลผู้ใช้</h1>
            <div className="card mt-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-2 ms-5">
                            <div className="userprofile"></div>
                        </div>
                        <div className="col-9 row ms-3">
                            <div className="col-6">
                                <label htmlFor='username' className='mb-2'>ชื่อจริง</label>
                                <input type="text" className='form-control' id='username' placeholder='วฤณ'/>

                                <label htmlFor='contact'className='mt-4 mb-2'>เบอร์โทร</label>
                                <input type="text" className='form-control' id='contact' placeholder='089-052-6911'/>
                                

                            </div>
                            <div className="col-6">
                                <label htmlFor='surname' className='mb-2'>นามสกุล</label>
                                <input type="text" className='form-control' id='surname' placeholder='พรหมวรานนท์'/>
                                
                            </div>
                            <div className="col-12">
                                <label htmlFor="addr" className='mt-3'>ที่อยู่</label><br />
                                <textarea type="text" id="addr"className='form-control mt-3'style={{ resize: 'none',height:"150px"}}/>
                            </div>

                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-10"></div>
                <div className="col-1 text-end">
                    <Link to='../userinfo'><button className="btn btn-custom w-100">ยกเลิก</button></Link>
                </div>
                <div className="col-1 text-end">
                   <Link to='../userinfo'><button className="btn btn-custom w-100">ยืนยัน</button></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserEdit