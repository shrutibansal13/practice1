const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    rating :{
        type:Number, 
        required: true
    },
    message :{
        type:String, 
        
    },
    product_id :{
        type:Schema.Types.ObjectId, 
        ref:'products',
        required: true
    }
})

const Rating = mongoose.model("ratings", ratingSchema);
module.exports = Rating;