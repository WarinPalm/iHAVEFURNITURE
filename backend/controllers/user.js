const prisma = require("../config/prisma");


exports.listUsers = async(req,res) => {
    try{
        const users = await prisma.user.findMany({
            select:{
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true
            }
        });
        res.json(users);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}
exports.changeStatus = async(req,res) => {
    try{
        const  { id, enabled } = req.body;
        console.log(id, enabled);
        const user = await prisma.user.update({
            where:{ id: Number(id) }, // ที่ไหน
            data:{ enabled: enabled} // ทำอะไร , update อะไร
        })
        res.send('Update status success')
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}
exports.changeRole = async(req,res) => {
    try{
        const  { id, role } = req.body;
        const user = await prisma.user.update({
            where:{ id: Number(id) }, // ที่ไหน
            data:{ role: role} // ทำอะไร , update อะไร
        })
        res.send('Update status success')
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}
exports.userCart = async(req,res) => {
    try{
        const { cart } = req.body;
        console.log(cart);
        console.log(req.user.id)

        const user = await prisma.user.findFirst({
            where: { id: Number(req.user.id) }
        })
        // console.log(user);
        // delete old cart item
        await prisma.productOnCart.deleteMany({
            where:{
                cart: { 
                    orderedById: user.id, 

                }
            }
        })
        // delete old cart
        await prisma.cart.deleteMany({
            where:{ orderedById: user.id }
        })

        // เตรียมสินค้า
        let products = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price
        }) )
        // หาผลรวมของราคาสินค้าทั้งหมด
        // reduce ค่าก่อน ค่าปัจจุบัน, 0 คือค่าเริ่มต้น
        let cartTotal = products.reduce((sum, item) => sum + item.price * item.count, 0)
        
        // New cart
        const newcart = await prisma.cart.create({
            data: {
                products: { create: products },
                cartTotal: cartTotal,
                orderedById: user.id
            }
        })
        
        console.log(newcart);

        res.send('Add cart ok')
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}
exports.getUserCart = async(req,res) => {
    try{
        // req.user.id
        const cart = await prisma.cart.findFirst({
            where:{
                orderedById: Number(req.user.id)
            },
            include:{ // ต้องการเอาอะไร
                products: {
                    include:{ // คือการ join table
                        product: true
                    }
                }
            }
        })
        // console.log(cart)

        res.json({
            products: cart.products,
            cartTotal: cart.cartTotal
        })
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}
exports.emptyCart = async(req,res) => {
    try{
        const cart = await prisma.cart.findFirst({
            where:{
                orderedById: Number(req.user.id)
            }
        })
        if(!cart){
            return res.status(400).json({message: 'No cart'})
        }

        await prisma.productOnCart.deleteMany({
            where:{ cartId: cart.id }
        })
        const result = await prisma.cart.deleteMany({
            where:{ orderedById: Number(req.user.id) }
        })


        console.log(result)

        res.json({
            message: 'Empty cart success',
            deletedCount: result.count
        })
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}
exports.saveAddress = async(req,res) => {
    try{
        const { address } = req.body
        console.log(address)
        const addressUser = await prisma.user.update({
            where:{
                id: Number(req.user.id)
            },
            data:{
                address: address
            }
        })

        res.json({ok: true, message: 'Address Updated success'})
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}
exports.saveOrder = async(req,res) => {
    try{
        //step 1 Get User Cart
        const userCart = await prisma.cart.findFirst({
            where:{
                orderedById: Number(req.user.id)
            },
            include:{ products: true } // products คือ productOnCart
        })

        //Check quatity
        if(!userCart || userCart.products.length === 0){
            return res.status(400).json({ ok: false, message: 'Cart is empty'})
        }

        // Check quantity
        for(const item of userCart.products){
            // console.log(item)
            const product = await prisma.product.findUnique({
                where:{ id: item.productId },
                select: { quantity: true , name: true }
            })
            
            // console.log(product)
            if(!product || item.count > product.quantity){
                return res.status(400).json({ ok: false, message: `ขออภัย. สินค้า ${product?.name || 'product'} หมด`}) // optional chaining product?.name ถ้า product ไม่มี data จะ return undefined , จะได้ไม่ error
            }
        }

        // Create a New Order
        const order = await prisma.order.create({
            data:{
                products: {
                    create: userCart.products.map((item) => ({
                        productId: item.productId,
                        count: item.count,
                        price: item.price
                    }))
                },
                orderedBy:{
                    connect:{ id: req.user.id }
                },
                cartTotal: userCart.cartTotal
            }
        })

        // Update Product 
        const update = userCart.products.map((item) => ({
            where: { id: item.productId },
            data: {
                quantity: { decrement: item.count },
                sold: {increment: item.count }
            }
        }))

        console.log(update)

        await Promise.all(
            update.map((updated) => prisma.product.update(updated))
        )

        await prisma.cart.deleteMany({
            where:{ orderedById: Number(req.user.id) }
        })

        res.json({ok: true, order})
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}
exports.getOrder = async(req,res) => {
    try{
        const orders = await prisma.order.findMany({
            where: { orderedById: Number(req.user.id) },
            include: { 
                products: {
                    include: {
                        product: true
                    }
                } 
            }
        })
        if(orders.length === 0){
            return res.status(400).json({message: 'No orders'})
        }
        res.json({ok: true, orders})

        console.log(orders)
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}