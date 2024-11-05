const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    const { name, description, price, quantity, categoryId , images } = req.body;
    // console.log(title, description, price, quantity, images);

    const product = await prisma.product.create({
        data:{
            name: name,
            description: description,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            categoryId: parseInt(categoryId),
            images: {
                create: images.map((item) => ({
                    asset_id: item.asset_id,
                    public_id: item.public_id,
                    url: item.url,
                    secure_url: item.secure_url
                })) // วงเล็บครอบปีกกาเพราะเป็นการ return object
            }
        }
    })


    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.list = async (req, res) => {
  try {
    const { count } = req.params;
    const products = await prisma.product.findMany({
        take: parseInt(count), // get count of products
        orderBy: { createdAt: 'desc' },
        include: {
            // category: {
            //     select: { name: true }
            // }
            category: true,
            images: true
        }
    })

    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.listAll = async (req, res) => {
  try {
    const products = await prisma.product.findMany()

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.read = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await prisma.product.findFirst({
        where:{
            id: Number(id)
        },
        include: {
            category: true,
            images: true
        }
    })

    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.update = async (req, res) => {
  try {
    const { name, description, price, quantity, categoryId , images } = req.body;

    // clear images
    await prisma.image.deleteMany({
        where: {
            productId: Number(req.params.id)
        }
    })

    const product = await prisma.product.update({
        where:{
            id: Number(req.params.id)
        },
        data:{
            name: name,
            description: description,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            categoryId: parseInt(categoryId),
            images: {
                create: images.map((item) => ({
                    asset_id: item.asset_id,
                    public_id: item.public_id,
                    url: item.url,
                    secure_url: item.secure_url
                })) // วงเล็บครอบปีกกาเพราะเป็นการ return object
            }
        }
    })
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
        where: {
            id: Number(id)
        }
    })
    res.send("Deleted success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.listby = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    console.log(sort, order, limit);
    const products = await prisma.product.findMany({
        take: limit,
        orderBy:{ [sort]: order },
        include: { category: true }
    })

    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const handleQuery = async(req,res,query) => {
    try{
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: query,
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Search Error" });
    }
}
const handlePrice = async(req,res,priceRange) => {
    try{
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: priceRange[0],
                    lte: priceRange[1]
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Search Error" });
    }
}
const handleCategory = async(req,res,categoryId) => {
    try{
        const products = await prisma.product.findMany({
            where: {
                // categoryId: Number(categoryId)  // category อันเดียว
                categoryId: {
                    in: categoryId.map((id) => Number(id))
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Search Error" });
    }
}


exports.searchFilters = async (req, res) => {
  try {
    const { query, category, price } = req.body;
    if(query){
        console.log('query : ',query);
        await handleQuery(req,res,query);
    }
    if(category){
        console.log('category : ',category);
        await handleCategory(req,res,category);
    }
    if(price){
        console.log('price : ',price);
        await handlePrice(req,res,price);
    }

    // res.send("Hello searchFilters product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
