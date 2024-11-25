const prisma = require("../config/prisma");


exports.create = async (req, res) => {
    try{
        const { name } = req.body;
        await prisma.category.create({
            data: {
                name:name
            }
        });
        res.send({ message: "Create category successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

exports.getAll = async (req,res) => {
    try{
        const category = await prisma.category.findMany();
        res.json(category);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}

exports.remove = async (req,res) => {
    try{
        const { id } = req.params;
        await prisma.category.delete({
            where:{
                id: Number(id)
            }
        });
        res.send({ message: "Delete category successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server Error"});
    }
}