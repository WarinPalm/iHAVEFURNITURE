import React, { useState, useEffect } from 'react';

function OrderUser() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setOrders([
      { id: 1, firstName: 'จอมปราชญ์', lastName: 'รักษ์โลก', orderId: '123456789', status: 'รอการส่งหลักฐาน' },
    ]);
  }, []);

  // ค้นหา
  const filteredOrders = orders.filter(order =>
    `${order.firstName} ${order.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderId.includes(searchTerm)
  );

  return (
    <div className="container mt-5">
      <h1 className="fw-bold">คำสั่งซื้อ | รอชำระ</h1>

      {/* ช่องค้นหา */}
      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="ค้นหาสินค้า..."
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
            <th>หมายเลขคำสั่งซื้อ</th>
            <th>สถานะ</th>
            <th>ตรวจสอบคำสั่งซื้อ</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.firstName}</td>
                <td>{order.lastName}</td>
                <td>{order.orderId}</td>
                <td>{order.status}</td>
                <td>
                  <button className="btn btn-primary">เลือก</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">ไม่พบคำสั่งซื้อ</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderUser;
