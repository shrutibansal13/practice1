const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uname :{
        type:String, 
        required: true
    },
    email :{
        type:String, 
        required: true
    },
    contact :{
        type:String, 
        required: true
    },
    password :{
        type:String, 
        required: true
    }
})

const User = mongoose.model("user", userSchema);// user is the table name here
module.exports = User;