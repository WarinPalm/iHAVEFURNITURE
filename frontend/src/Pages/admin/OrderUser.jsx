import React, { useState, useEffect } from 'react';
import { fetchCustomerOrder } from '../../api/Admin';
import useEcomStore from '../../store/ecom_store';
import { Link, useLocation } from 'react-router-dom';
import Category from '../Category';

function OrderUser() {
  const [orders, setOrders] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const token = useEcomStore((state)=>state.token);

  const location = useLocation();
  const orderStatus = location.state?.orderStatus;

  const customerOrder = async () => {
    try {
        const res = await fetchCustomerOrder(token);
        setOrders(res.data.orders);
    } catch (err) {
        console.error('Error fetching user info:', err);
    }
};
  useEffect(() => {
    customerOrder();
  }, []);

  // ค้นหา
  const filteredOrders = orders.filter(order =>
    `${order.id}`.toLowerCase().includes(searchTerm.toLowerCase()) && order.status === orderStatus
  );

  return (
    <div className="container mt-5">
      <h1 className="fw-bold">คำสั่งซื้อ | {orderStatus}</h1>

      {/* ช่องค้นหา */}
      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="ค้นหารหัสคำสั่งซื้อ..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ตาราง */}
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>หมายเลขคำสั่งซื้อ</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>สถานะ</th>
            <th>ตรวจสอบคำสั่งซื้อ</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userBy?.fName}</td>
                <td>{order.userBy?.lName}</td>
                <td>{order.status}</td>
                <td>
                  <Link to='../orderdetails' state={ order }><button className="btn btn-primary">ดูเพิ่มเติม</button></Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">ไม่พบคำสั่งซื้อ</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderUser;
