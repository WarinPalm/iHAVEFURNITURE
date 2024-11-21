const prisma = require('../config/prisma');
const { host , port } = require('../config/connectENV');


exports.listUser = async (req, res) => {
    try{
        const users = await prisma.user.findMany({
            where:{ role: 'user' },
            select:{
                id: true,
                fName: true,
                lName: true,
                email: true,
                telNo: true,
                address: true,
            }
        });
        res.json(users);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}
exports.listOrder = async (req, res) => {
    try{
        const oders = await prisma.order.findMany({
            select:{
                id: true,
                netPrice: true,
                transferDate: true,
                proofPicture: true,
                proofDate: true,
                status: true,
                createdAt: true,
                userBy: {
                    select: {
                        id: true,
                        fName: true,
                        lName: true,
                        email: true,
                        telNo: true,
                        address: true,
                    }
                },
                cart: {
                    select: {
                        id: true,
                        quantity: true,
                        totalPrice: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                picture: true,
                            }
                        }
                    }
                }
            }
        });

        if(oders.length === 0){
            return res.status(400).json({ message : 'ไม่พบรายการสั่งซื้อเข้ามา' });
        };

        const imageOrder = oders.map(orderItem => ({
            ...orderItem,
            proofPicture: orderItem.proofPicture ? `${host}${port}/uploads/slip/${orderItem.proofPicture}` : null  ,
            cart: orderItem.cart.map(item => ({
                ...item,
                product: {
                    ...item.product,
                    picture: `${host}${port}/uploads/${item.product.picture}`
                }
            }))
        }));

        res.json({ orders: imageOrder });
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}
exports.changeStatusOrder = async (req, res) => {
    try{
        const { status } = req.body;
        const checkStatusOrder = await prisma.order.findFirst({
            where: { id: Number(req.params.id)}
        });

        if(checkStatusOrder.status !== 'รอการตรวจสอบ'){
            return res.status(400).json({ message: 'ไม่สามารถอนุมัติการสั่งซื้อได้' });
        };
        
        const order = await prisma.order.update({
            where: { id: Number(req.params.id) , status: 'รอการตรวจสอบ'},
            data: { status: status }
        });
        res.json({ message: `${order.status}` });
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}