import React from 'react'
import { Link } from 'react-router-dom'
function AdminInfo() {
  return (
    <div>
        <div className="container">
            <h1 className="mt-5">ข้อมูลผู้ใช้</h1>
            <div className="card mt-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-2">
                            <div className="adminprofile"></div>
                        </div>
                        <div className="col-8">
                            <h2>วฤณ พรหมวรานนท์</h2>
                            <h4>อีเมล : warinpalm@gmail.com</h4>
                            <h4>เบอร์โทร : 089-052-6911</h4>
                        </div>
                        <div className="col-2">
                            <Link to='../useredit'><button className="btn btn-custom w-100">แก้ไขข้อมูล</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>
    </div>
  )
}

export default AdminInfo;