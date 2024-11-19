const prisma = require("../config/prisma");


exports.create = async (req, res) => {
    try{
        const { name } = req.body;
        const checkCategory = await prisma.category.findFirst({
            where:{
                name: name
            }
        });

        if(checkCategory){
            return res.status(400).json({ message: "Category already exists"});
        };
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

exports.editCategory = async (req,res) => {
    try{
        const cate = await prisma.category.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });

        const { name } = {
            ...cate,
            ...req.body
        };
        await prisma.category.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                name: name
            }
        });
        res.send({ message: "Edit category successfully"});
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