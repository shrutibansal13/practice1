const Products= require('../models/products')
const Price = require('../models/price')
const Ratings = require('../models/rating')
const Images = require('../models/product_images');
const Category = require('../models/category');
const OtId = require('mongodb').ObjectId;
//Inserting data in products table
async function insertData(item){
 try { 
    const results = Products({
       
        title: item.title,
        description: item.description,
        brand: item.brand,
        category: item.category    
    })
    await results.save();
    return results;
}
catch(error){
    return `${error};`
}
}

async function getallproducts(){
    try{
        const results= await Products.aggregate([
            {
               $lookup:{
                    from:'prices',
                    localField:'_id',
                    foreignField:'product_id',
                    as:'pricedata'
               }
            },
            {
                $unwind:'$pricedata',
            },
            {
                        $lookup:{
                             from:'ratings',
                             localField:'_id',
                             foreignField:'product_id',
                             as:'ratedata'
                        }
                     },
                     {
                         $unwind:'$ratedata',
                     },{
                        $lookup:{
                             from:'images',
                             localField:'_id',
                             foreignField:'product_id',
                             as:'imagedata'
                        }
                     },
                     {
                         $unwind:'$imagedata',
                     },

             {
                $project: {
                  title: 1,
                  description:1,
                  brand: 1,
                  category: 1,
                  price: '$pricedata.price' ,
                  rating: '$ratedata.ratings' ,
                  images: '$imagedata.image_url',
                  category_id:1
                },
              },
        ]).exec();
        
        return results;
    }
    catch(error){
        return error;
    }
}


//Inserting data in price table
async function insertprice(price,product_id){
    try{
        const results= Price({
            price:price,
            product_id:product_id
        });
        await results.save()
        return results
    }
    catch(error){
        return error;
    }
}

async function insertrating(rating,message,product_id){
    try{
        const results=  Ratings({
            rating:rating,
            message:message,
            product_id:product_id
        });
        await results.save()
        return results
    }
    catch(error){
        return error;
    }
}


async function insertimages(images,product_id){
    try{
        const results= Images({
            image_url:images,
            product_id:product_id
        });
        await results.save()
        return results
    }
    catch(error){
        return error;
    }
}

let data;
async function insertcategoryid(){
    try{
        const categories=  await Category.find();
        // categories.map((category)=>(
        //       Products.findOneAndUpdate({'category':`${category.category}`},{$set: { 'category_id': `${category._id}` } })
        // ))
        for (const category of categories) {
            await Products.updateMany(
              { category: category.category }, 
              { $set: { category_id: category._id } } 
            );
            
          }
        

    }
    catch(error){
        console.log(error);
    }

}


async function getcategory(type){
    try{
        const categories= await Category.find({type:type});
        return categories;
    }
    catch(err){
        return err;
    }
}

async function getallcategory(){
    try{
        const categories= await Category.find();
        return categories;
    }
    catch(err){
        return err;
    }
}

async function getproducts(category_id){
   
    try{
        console.log(typeof(new OtId(category_id)));
        const products= await getallproducts();
        const data= products.filter((product)=>product.category_id.equals(category_id))
        console.log(data,"data");
        return data;
    }
    catch(err){
        return err;
    }
}

module.exports={
    insertData,
    getallproducts,
    insertprice,
    insertrating,
    insertimages,
    insertcategoryid,
    getcategory,
    getallcategory,
    getproducts
}