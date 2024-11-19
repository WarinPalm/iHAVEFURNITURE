import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentDetail = () => {
    const [notificationDateTime, setNotificationDateTime] = useState('');
    const location = useLocation();
    const order = location.state?.order; 

    // Update เวลาตลอด
    useEffect(() => {
        const updateCurrentTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
            setNotificationDateTime(formattedDateTime);
        };

        const intervalId = setInterval(updateCurrentTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    if (!order) {
        return <h1>ไม่พบข้อมูลคำสั่งซื้อ</h1>;
    }

    const renderBillItems = (cartInOrder) => {
        return cartInOrder.map((item) => (
            <div key={item.id} className="row">
                <div className="col-6 mt-5 mb-3">
                    <h5 className="card-title">{item.product?.name || 'Unknown Product'}</h5>
                </div>
                <div className="col-1 mt-5 mb-3">
                    <h5 className="card-title">x{item.quantity}</h5>
                </div>
                <div className="col-4 mt-5 mb-3 text-end">
                    <h5 className="card-title">
                        ฿{(item.product?.price || 0) * item.quantity}
                    </h5>
                </div>
                <div className="col-11">
                    <hr />
                </div>
            </div>
        ));
    };

    return (
        <section className="bill-order mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-3">
                        <h1>สรุปคำสั่งซื้อ</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <div className="card card-bill">
                            <div className="card-body">
                                <h1 className="mb-5 mt-4">ใบแจ้งหนี้</h1>
                                <div className="col-12">
                                    <h5 className="ms-4 mb-4">
                                        ลูกค้า: {order.userBy?.fName} {order.userBy?.lName}
                                    </h5>
                                    <h5 className="ms-4 mb-4">ที่อยู่: {order.userBy?.address}</h5>
                                    <h5 className="ms-4 mb-4">เบอร์โทร: {order.userBy?.telNo}</h5>
                                    <h5 className="ms-4 mb-4">
                                        วันที่สั่งซื้อ: {new Date(order.createdAt).toLocaleString()}
                                    </h5>
                                    <h5 className="ms-4 mb-4">สถานะ: {order.status}</h5>
                                </div>
                                <div className="mt-4 ms-5 bill-items">
                                    {renderBillItems(order.cart)}
                                </div>
                                <hr className="me-4" />
                                <div className="row">
                                    <div className="col-9 ms-5 mb-5 mt-5">
                                        <h5 className="card-title">รวมสุทธิ:</h5>
                                    </div>
                                    <div className="col-2 ms-3 mb-5 mt-5">
                                        <h5 className="card-title">฿{order.netPrice}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-bill mt-5 mb-5 pe-4">
                            <div className="card-body">
                                <div className="card ms-5 mt-3 mb-5 card-kbank">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-2 kbank-img ms-3"></div>
                                            <div className="col-1"></div>
                                            <div className="col-8">
                                                <h4>082-8-06385-5</h4>
                                                <h4>นายวฤณ พรหมวรานนท์</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 mt-2">
                                    <div className="row">
                                        <div className="col-1"></div>
                                        <div className="col-11 mb-3">
                                            <h5 className="card-title">
                                                วันที่แจ้งโอน :{' '}
                                                <input
                                                    type="datetime-local"
                                                    value={notificationDateTime}
                                                    onChange={(e) => setNotificationDateTime(e.target.value)}
                                                    disabled
                                                />
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 mt-2">
                                    <div className="row">

                                        <div className="col-1"></div>
                                        <div className="col-3">
                                            <h5 className="card-title">วันที่โอน(ตามสลิป)</h5>
                                        </div>
                                        <div className="col-1">
                                            <h5 className="card-title">:</h5>
                                        </div>
                                        <div className="col-1">
                                            <input type="date" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 mt-2">
                                    <div className="row">
                                        <div className="col-1"></div>
                                        <div className="col-3">
                                            <h5 className="card-title">แนบสลิป(ไฟล์รูปภาพ)</h5>
                                        </div>
                                        <div className="col-1">
                                            <h5 className="card-title">:</h5>
                                        </div>
                                        <div className="col-4">
                                            <label htmlFor="fileInput" style={{color: '#A18B79',textDecoration: 'underline',
                                            cursor: 'pointer',fontSize: '16px',}}>
                                                เลือกไฟล์
                                            </label>
                                            <input type="file"id="fileInput"style={{ display: 'none' }}/>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </section>
    );
};

export default PaymentDetail;
