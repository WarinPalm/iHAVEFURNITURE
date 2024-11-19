import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEcomStore from '../../store/ecom_store';
import { fetchOrders } from '../../api/Order';

const BillOrder = () => {
    const navigate = useNavigate();
    const token = useEcomStore((state) => state.token);
    const [orders, setOrders] = useState([]);

    const fetchOrder = async () => {
        try {
            const res = await fetchOrders(token);
            setOrders(res.data.order);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const goToPaymentDetail = (order) => {
        navigate(`../paymentDetail`, { state: { order } }); // ส่ง order ไปยัง PaymentDetail
    };

    return (
        <div className="container">
            <div className="row">
                <h1 className="mt-5 mb-5">ธุรกรรม</h1>
                {orders.map((order, index) => (
                    <div
                        className="card mb-5 card-bill card-hover"
                        key={index}
                        onClick={() => goToPaymentDetail(order)} // ส่ง order เมื่อคลิก
                    >
                        <div className="row">
                            <div className="col-3">
                                <img
                                    src={order.cart[0]?.product?.fullPathImage || 'default-image-path.jpg'}
                                    className="img-fluid custom-cart-img rounded-start"
                                    alt={order.cart[0]?.product?.name || 'No Image'}
                                />
                            </div>
                            <div className="col-4">
                                <div className="card-body">
                                    <h5 className="card-title">หมายเลขคำสั่งซื้อ: {order.id}</h5>
                                    <p className="card-title">สถานะคำสั่งซื้อ: {order.status}</p>
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="card-body">
                                    <h5 className="card-title">ที่อยู่</h5>
                                    <p className="card-title">{order.userBy.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BillOrder;
