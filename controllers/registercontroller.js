const User = require('../models/user');


const getusers = async (req,res)=>{
    const data= await User.find();
    if(!data) return res.status(204).json({'message':'No users found'});
    res.json(data);
    console.log(data);
}

const createusers = async (req,res)=>{
    console.log(req.body);
     if(!req?.body?.uname || !req?.body?.email || !req?.body?.contact || !req?.body?.password) {
        return res.status(400).json({'message':'Fill all the details'});
     } 

     try{
        const result=  await User.create({
            uname: req.body.uname,
            email: req.body.email,
            contact: req.body.contact,
            password: req.body.password,
        })

        res.status(200).json(result);
        
     }catch(err){
        console.error(err);
     }
}

module.exports = {
    getusers,
    createusers
}