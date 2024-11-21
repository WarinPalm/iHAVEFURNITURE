import React, { useState, useEffect } from 'react';
import { fetchAllUser } from '../../api/Admin';
import useEcomStore from '../../store/ecom_store';
import { Link, useLocation } from 'react-router-dom';

function UserData() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = useEcomStore((state)=>state.token);


  const customerInfo = async () => {
      try {
          const res = await fetchAllUser(token);
          console.log(res.data)
          setCustomers(res.data);
      } catch (err) {
          console.error('Error fetching user info:', err);
      }
  };
  useEffect(() => {
    customerInfo();
  }, []);
  
  // ค้นหา
  const filteredCustomer = customers.filter(customer =>
    `${customer.id}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="fw-bold">ข้อมูลลูกค้า</h1>

      {/* ช่องค้นหา */}
      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="ค้นหารหัสลูกค้า..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ตาราง */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>รหัสลูกค้า</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เบอร์โทร</th>
            <th>อีเมล</th>
            <th>ที่อยู่</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomer.length > 0 ? (
            filteredCustomer.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.fName}</td>
                <td>{customer.lName}</td>
                <td>{customer.telNo}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">ไม่พบลูกค้าในระบบ</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserData;
