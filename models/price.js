const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priceSchema = new Schema({
    price :{
        type:Number, 
        required: true
    },
    product_id :{
        type:Schema.Types.ObjectId, 
        ref:'products',
        required: true
    }
})

const Price = mongoose.model("price", priceSchema);
module.exports = Price;