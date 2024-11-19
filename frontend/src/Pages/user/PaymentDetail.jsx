import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cancleOrder, submitPayment } from '../../api/Order'; // เพิ่ม submitPayment
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom_store';

const PaymentDetail = () => {
    const [notificationDateTime, setNotificationDateTime] = useState('');//วันที่แจ้งโอน
    const [proofDate, setProofDate] = useState(''); // วันที่โอน
    const [proofPicture, setProofPicture] = useState(null); // ไฟล์แนบ

    const token = useEcomStore((state) => state.token);
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    // Update เวลาปัจจุบัน
    useEffect(() => {
        const updateCurrentTime = () => {
            const now = new Date();
            const formattedDateTime = now.toLocaleString('th-TH', {
                timeZone: 'Asia/Bangkok',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            setNotificationDateTime(formattedDateTime);
        };
    
        const intervalId = setInterval(updateCurrentTime, 1000);
    
        return () => clearInterval(intervalId); // ล้าง interval
    }, []);
    

    // ฟังก์ชันยกเลิกคำสั่งซื้อ
    const handleCancleOrder = async (id) => {
        try {
            await cancleOrder(token, id);
            toast.success('ยกเลิกคำสั่งซื้อสำเร็จ');
            navigate('../billorder');
        } catch (err) {
            console.error(err);
            toast.error('ยกเลิกคำสั่งซื้อไม่สำเร็จ');
        }
    };

    // ส่งข้อมูลการชำระเงิน
    const handleSubmitPayment = async () => {

        if (!notificationDateTime || !proofDate || !proofPicture) {
            toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }
    
        const formData = new FormData();
        formData.append('transferDate', notificationDateTime); 
        formData.append('proofDate', proofDate);
        formData.append('proofPicture', proofPicture); 
    
        try {
            await submitPayment(token, order.id, formData);
            toast.success('ส่งข้อมูลการชำระเงินสำเร็จ');
            navigate('../history'); 
        } catch (err) {
            console.error(err);
            toast.error('ส่งข้อมูลการชำระเงินไม่สำเร็จ');
        }
    };
    

    if (!order) {
        return <h1>ไม่พบข้อมูลคำสั่งซื้อ</h1>;
    }

    const renderBillItems = (cartInOrder) =>
        cartInOrder.map((item) => (
            <div key={item.id} className="row">
                <div className="col-6 mt-5 mb-3">
                    <h5 className="card-title">{item.product?.name || 'Unknown Product'}</h5>
                </div>
                <div className="col-1 mt-5 mb-3">
                    <h5 className="card-title">x{item.quantity}</h5>
                </div>
                <div className="col-4 mt-5 mb-3 text-end">
                    <h5 className="card-title">{(item.product?.price || 0) * item.quantity}฿</h5>
                </div>
                <div className="col-11">
                    <hr />
                </div>
            </div>
        ));

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
                            <div className="card-body ms-4 me-4">
                                {/* ข้อมูลบัญชี */}
                                <div className="card mt-3 mb-5 card-kbank">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-2 ms-4 me-4 kbank-img ">

                                            </div>
                                            <div className="col-8">
                                                <h4>082-8-06385-5</h4>
                                                <h4>นายวฤณ พรหมวรานนท์</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* วันที่แจ้งโอน */}
                                <div className="mb-3 mt-2">
                                    <div className="row align-items-center">
                                        <div className="col-3">
                                            <h5 className="card-title">วันที่ชำระ:</h5>
                                        </div>
                                        <div className="col-9">
                                            <h5 className="card-title">
                                                {notificationDateTime.replace('T', ', ')} {/* ลบตัว T และแทนด้วยช่องว่าง */}
                                            </h5>
                                        </div>
                                    </div>
                                </div>



                                {/* วันที่โอน */}
                                <div className="mb-3 mt-2">
                                    <div className="row align-items-center">
                                        <div className="col-3">
                                            <h5 className="card-title">วันที่โอน (ตามสลิป):</h5>
                                        </div>
                                        <div className="col-9">
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                onChange={(e) => setProofDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* แนบสลิป */}
                                <div className="mb-3 mt-2">
                                    <div className="row align-items-center">
                                        <div className="col-3">
                                            <h5 className="card-title">แนบสลิป (ไฟล์รูปภาพ):</h5>
                                        </div>
                                        <div className="col-9">
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={(e) => setProofPicture(e.target.files[0])}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ปุ่ม */}
                        <hr className="mb-5" />
                        <div className="d-flex justify-content-between mb-5">
                            <button
                                className="btn btn-danger me-5"
                                onClick={() => handleCancleOrder(order.id)}
                            >
                                ยกเลิกคำสั่งซื้อ
                            </button>
                            <button
                                type="button"
                                className="btn btn-custom"
                                onClick={handleSubmitPayment}
                            >
                                ดำเนินการต่อ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentDetail;
