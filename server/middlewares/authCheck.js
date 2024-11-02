const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma')

exports.authCheck =async (req,res,next) => {
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
        console.log(user);
        console.log('Hello middleware')
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Token Invalid'});
    }
}

exports.adminCheck = async(req,res,next) => {
    try{

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Admin access denied'});
    }
}