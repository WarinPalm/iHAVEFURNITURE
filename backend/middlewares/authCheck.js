const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma')

exports.authCheck =async (req,res,next) => { // login รึเปล่า
    try{
        const headerToken = req.headers.authorization; // headers อย่างเดียวจะมีข้อมูลอื่นๆเยอะมาก แต่เราเจาะจงเอาแค่ authorization
        if(!headerToken){
            return res.status(401).json({message: 'No token, Authorization'});
        }
        const token = headerToken.split(" ")[1];

        const decode = jwt.verify(token, process.env.SECRET);
        // .user คือการเพิ่ม property ให้กับ req โดยที่เราสามารถเรียกใช้ได้ทุกที่ในโปรเจค
        req.user = decode;
        
        const user = await prisma.user.findFirst({
            where:{
                email: req.user.email
            }
        })
        if(!user.enabled){
            return res.status(400).json({message: 'This account cannot access'})
        }
        // console.log(user);
        // console.log('Hello middleware')
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Token Invalid'});
    }
}

exports.adminCheck = async(req,res,next) => { // ต้องเป็น admin เท่านั้น
    try{
        // enpoint ไหนที่ middleware ถูกเรียกใช้ จะมี req.user อยู่แล้ว ***ต้องใช้คู่กัน***
        const { email } = req.user
        const adminUser = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if(!adminUser || adminUser.role !== 'admin'){
            return res.status(403).json({message: 'access denied: Admin only'});
        }
        // console.log('admin Check' , adminUser);
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Admin access denied'});
    }
}