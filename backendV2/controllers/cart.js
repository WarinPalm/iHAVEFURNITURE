const prisma = require('../config/prisma');


exports.addItemToCart = async (req, res) => {
    try{
        const { productId , quantity } = req.body;

        // ดูว่า user ที่ login อยู่ในขณะนี้เป็นใคร
        const userData = await prisma.user.findFirst({
            where: { id: Number(req.user.id) }
        });
        
        // ดึงข้อมูลราคาสินค้า
        const productPrice = await prisma.product.findUnique({
            where: { id: Number(productId)},
        });

        // ตรวจสอบว่า user มี order ที่ status อยู่ในตะกร้าหรือไม่
        let order = await prisma.order.findFirst({
            where: { 
                userById: Number(userData.id),
                status : 'อยู่ในตะกร้า'
            }
        });

        // ถ้าไม่มี order ให้สร้าง order ใหม่
        if(!order){
            order = await prisma.order.create({
                data:{
                    userById : Number(userData.id),
                    netPrice: 0,
                    status : 'อยู่ในตะกร้า'
                }
            });
        }

        // ตรวจสอบว่าสินค้าที่เพิ่มลงในตะกร้ามีอยู่แล้วหรือไม่
        const checkCartItem = await prisma.cartitem.findMany({
            where:{
                userById: userData.id,
                status: 'อยู่ในตะกร้า'
            }
        });

        // ตรวจสอบว่าสินค้ามีจำนวนพอหรือไม่
        if(checkCartItem.quantity > productPrice.stock || quantity > productPrice.stock){
            return res.status(400).json({message: 'สินค้ามีจำนวนไม่พอ'});
        }
        

        

        // ตรวจสอบว่าสินค้าที่เพิ่มลงในตะกร้ามีอยู่แล้วหรือไม่
        const checkProductInCart = checkCartItem.find((item) => item.prodId === parseInt(productId));
        let item;

        

        
        if(checkProductInCart){
            item = await prisma.cartitem.update({
                where: { id : checkProductInCart.id},
                data: {
                    quantity: checkProductInCart.quantity + parseInt(quantity),
                    totalPrice: parseFloat((checkProductInCart.quantity + parseInt(quantity)) * productPrice.price)
                }
            });
        }else{
            item = await prisma.cartitem.create({
                data:{
                    prodId : parseInt(productId),
                    quantity : parseInt(quantity),
                    totalPrice : parseFloat(quantity * productPrice.price),
                    status: 'อยู่ในตะกร้า',
                    orderId: order.id,
                    userById: userData.id
                }
            });
        }
       
        // ดึงข้อมูลราคาสินค้าที่อยู่ในตะกร้า
        const listCartItem = await prisma.cartitem.findMany({
            where:{
                userById: userData.id,
                status: 'อยู่ในตะกร้า'
            },
            select: { totalPrice: true }
        });

        // คำนวนราคาสินค้าที่อยู่ในตะกร้า โดยเช็คว่ามีสินค้าอยู่ในตะกร้าหรือไม่ ถ้ามีให้คำนวนราคาสินค้าทั้งหมด ถ้าไม่มีให้เป็น 0
        let cartTotal = listCartItem.length > 0 ? listCartItem.map(item => item.totalPrice).reduce((sum, price) => sum + price, 0): 0;

        order = await prisma.order.update({
            where: { id: order.id},
            data: { netPrice: parseFloat(cartTotal)}
        });

        res.json({item , message: 'เพิ่มสินค้าลงในตะกร้าสำเร็จ'});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}

exports.listItemCart = async (req,res) => {
    try{
        const cart = await prisma.cartitem.findMany({
            where: { userById: Number(req.user.id) },
            include: {
                product: {
                    select: {
                        name: true,
                        description: true,
                        price: true,
                        picture: true 
                    }
                }
            },

        })

        // เพิ่ม fullPathImage ให้กับสินค้าแต่ละรายการ
        const cartWithImages = cart.map(item => ({
            ...item,
            product: {
                ...item.product,
                fullPathImage: `http://localhost:3000/uploads/${item.product.picture}`
            }
        }));

        res.json({cart : cartWithImages});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}

exports.removeItemCart = async (req,res) => {
    try{
        const { id } = req.params;
        
        const findItem = await prisma.cartitem.findFirst({
            where: { id: Number(id) , userById: Number(req.user.id) }
        });
        
        if(!findItem){
            return res.json({ message : 'ไม่มีสินค้าชิ้นนี้ในตะกร้าของคุณ' });
        }

        await prisma.cartitem.delete({
            where: { id: Number(id)}
        });

        const countItem = await prisma.cartitem.findFirst({
            where: { userById: Number(req.user.id) , status: 'อยู่ในตะกร้า'}
        });

        if (!countItem) {
            // ค้นหาหมายเลข order ของผู้ใช้
            const order = await prisma.order.findFirst({
                where: { userById: Number(req.user.id), status: 'อยู่ในตะกร้า' }
            });
        
            // ถ้ามี order ที่ตรงกับเงื่อนไข
            if (order) {
                // เซ็ตเป็นค่าเริ่มต้น
                // await prisma.order.update({
                //     where: { id: order.id },  // ใช้ id ของ order ที่ค้นพบ
                //     data: { netPrice: 0 }      // อัพเดท netPrice เป็น 0
                // });

                // ลบ order ที่อยู่ในตะกร้า
                await prisma.order.delete({
                    where: { id: order.id, status: 'อยู่ในตะกร้า' }
                });
            }
        }

        res.json({message: 'ลบสินค้าออกจากตะกร้าสำเร็จ' });
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}

exports.submitCart = async (req,res) => {
    try{
        const userCart = await prisma.cartitem.findMany({
            
        })
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}