const User = require('../models/user');


async function  getusers(){
    try {
        const data = await User.find();
        return data;
    } catch (error) {
        console.log(`Could not fetch data ${error}`)
    }
}

async function createusers(data) {
    // console.log("req>>>>>", req.body)
//    var uname= data.uname;
    // var email=data.email;
    // var contact=data.contact;
    // var password= data.password;
    //  if(!uname || !email || !contact || !password) {
    //     return res.status(400).json({'message':'Fill all the details'});
    //  } 

     try{
        const check= await User.find({email:data.email})
        console.log(check);
        if(check.length > 0){
            return "User already Exists";
        }else{
            const Userdetails= User({
                uname: data.uname,
                email:data.email,
                contact:data.contact,
                password:data.password
              })
            const result= await Userdetails.save();
            console.log("result>>>>>>>>>.", result)
            return "New User Added Successfully";
        }
        
        
        
     }catch(err){
        console.error(err);
     }
}



module.exports={
    getusers,
    createusers
}
