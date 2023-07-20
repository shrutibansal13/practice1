const { ObjectId } = require('mongodb');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
var OtId = require('mongodb').ObjectId

async function  getusers(){
    try {
        const data = await User.find();
        return data;
    } catch (error) {
        console.log(`Could not fetch data ${error}`)
    }
}
async function  getuserbyId(id){
    console.log(typeof(id));
    try {
        const data = await User.findById({"_id": new OtId(id)});
        console.log(data);
        return data;
    } catch (error) {
        console.log(`Could not fetch data ${error}`)
    }
}

async function  searchuser(search){
    console.log(typeof(search));
    try {
        const data = await User.find({"uname":search });
        console.log(data);
        return data;
    } catch (error) {
        console.log(`Could not fetch data ${error}`)
    }
}

async function createusers(data) {
     try{
        const check= await User.find({email:data.email})
        // console.log(check);
        if(check.length > 0){
            return "User already Exists";
        }else{
        //    var encrypted=bcrypt.hash(data.password,10)
        //    console.log(encrypted,"encryyyyyg");
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

async function update(data) {
    try{   
       const results= await User.updateOne({"_id":new ObjectId(`${data.id}`)},{$set:{

        uname: data.uname,
        email:data.email,
        contact:data.contact,
        password:data.password
       }})
       console.log("result>>>>>>>>>.", results)
       return results;
       
    }catch(err){
       console.error(err);
    }
}

async function checkinguser(logs){
    try{
        console.log("logs>>>>>>>>.", logs)
        console.log("**********", {email:logs.email,password:logs.password})
        const checkpoint= await User.find({email:logs.email,password:logs.password})  
        console.log(checkpoint);
        console.log(">>>>>>>",checkpoint.length)
        if(checkpoint.length>0){
            console.log("233333333333333333333333333333")
            return checkpoint;
        }else {
            console.log("333333333333333333333333333333")
            return 'User does not exist';
        }
       
    }catch(error){
        return error;
    }
}

async function  deletebyId(id){
    console.log(typeof(id));
    try {
        const data = await User.deleteOne({"_id": new OtId(id)});
        console.log(data);
        return data;
    } catch (error) {
        console.log(`Could not fetch data ${error}`)
    }
}

async function  pagingusers(search,page,limit){
    var offset = (page -1)*(limit)
    console.log(offset,"offset/////");
    console.log(limit,"limit/////");
    try {
        const data = await User.find({uname:search}).skip(offset).limit(limit);
        return data;
    } catch (error) {
        console.log(`Could not fetch data ${error}`)
    }
}



module.exports={
    getusers,
    getuserbyId,
    createusers,
    update,
    checkinguser,
    deletebyId,
    pagingusers,
    searchuser
}
