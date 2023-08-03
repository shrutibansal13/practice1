const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    image_url :{
        type:Array, 
        required: true
    },
    product_id :{
        type:Schema.Types.ObjectId,
        ref:'products', 
        required: true
    }
})

const Image = mongoose.model("image", imagesSchema);
module.exports = Image;