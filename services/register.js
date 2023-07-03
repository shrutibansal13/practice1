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

async function checkinguser(logs){
    try{
        const checkpoint= await User.find({email:logs.email,password:logs.password})  
        if(checkpoint.length>0){
            return checkpoint;
        }else {
            return 'User does not exist';
        }
       
    }catch(error){
        return error;
    }
}


module.exports={
    getusers,
    createusers,
    checkinguser
}
