

exports.create = async (req,res) => {
    try{
        res.send('Hello Category');
    }catch (err){
        console.log(err);
        res.send(500).json({ message: "Server Error"});
    }
}
exports.list = async (req,res) => {
    try{
        res.send('Hello Category List');
    }catch (err){
        console.log(err);
        res.send(500).json({ message: "Server Error"});
    }
}
exports.remove = async (req,res) => {
    try{
        const { id } = req.params;
        console.log(id)
        res.send('Hello Category Remove');
    }catch (err){
        console.log(err);
        res.send(500).json({ message: "Server Error"});
    }
}

