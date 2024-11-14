import React from 'react'
import { Link } from 'react-router-dom'
function UserEdit() {
  return (
    <div>
        <div className="container">
            <h1 className='mt-5'>แก้ไขข้อมูลผู้ใข้</h1>
            <div className="card mt-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-2 ms-5">
                            <div className="userprofile"></div>
                        </div>
                        <div className="col-4 ms-4">
                            <label htmlFor='username' className='mb-2'>ชื่อจริง</label>
                            <input type="text" className='form-control' id='username' placeholder='วฤณ'/>

                            <label htmlFor='contact'className='mt-4 mb-2'>เบอร์โทร</label>
                            <input type="text" className='form-control' id='contact' placeholder='089-052-6911'/>

                        </div>
                        <div className="col-4">
                            <label htmlFor='surname' className='mb-2'>นามสกุล</label>
                            <input type="text" className='form-control' id='surname' placeholder='พรหมวรานนท์'/>
                            
                            <label htmlFor='dateofbirth' className='mt-4 mb-2'>วัน/เดือน/ปี/เกิด</label>
                            <input type="text" className='form-control' id='dateofbirth'placeholder='10-05-2004'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-10"></div>
                <div className="col-1 text-end">
                    <button className="btn btn-custom w-100">ยกเลิก</button>
                </div>
                <div className="col-1 text-end">
                    <button className="btn btn-custom w-100">ยืนยัน</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserEdit