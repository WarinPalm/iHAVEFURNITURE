exports.listUsers = async(req,res) => {
    try{
        res.send('Hello Users')
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}