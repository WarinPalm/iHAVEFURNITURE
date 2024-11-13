const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) => {
    try{
        const { email , password, confirmPassword} = req.body;
        console.log(email, password);
        // step 1 validate body
        if (!email || !password){
            return res.status(400).json({message: "Email or Password is required!!! "});
        }
        

        // step 2 check email in DB already?
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if(user){
            return res.status(400).json({message: "Email is already exits!!!"});
        }

        // step 3 hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // step 4 Register
        await prisma.user.create({
            data:{
                email: email,
                password: hashPassword
            }
        })


        res.send('Register Success');
    }catch (err){
        console.log(err);
        res.status(500).json({ message : "Server Error"});
    }
}

exports.login = async (req,res) => {
    try{
        const { email , password } = req.body;

        // step 1 Check email
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
        if(!user || !user.enabled){
            return res.status(400).json({message: "User Not Found or not Enables"});
        }
        // step 2 Check password
        const isMatch = await bcrypt.compare(password, user.password); // input pw,db pw
        if(!isMatch){
            return res.status(400).json({message: "Password is not match"});
        }
        // step 3 Create Payload
        const payload = { // เป็นการเขียนข้อมูลที่จะเก็บไว้ใน token 
            id: user.id,
            email: user.email,
            role: user.role
        }
        // step 4 Create Token
        jwt.sign(payload, process.env.SECRET, {expiresIn: '1d'} , (err, token) => {
            if(err){
                return res.status(500).json({message: "Server Error"});
            }
            res.json({ payload, token})
        })

    }catch (err){
        console.log(err);
        res.status(500).json({ message : "Server Error"});
    }
}
exports.currentUser = async (req,res) => {
    try{
        const user = await prisma.user.findFirst({
            where: { email: req.user.email },
            select:{
                id: true,
                email: true,
                name: true,
                role: true
            }
        })
        res.json({user})
    }catch (err){
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}


