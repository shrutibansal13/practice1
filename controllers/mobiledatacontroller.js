 const productsService= require('../services/products')
 const Products= require('../models/products')
 const Price = require('../models/price')
 const Ratings = require('../models/rating')
 const Images = require('../models/product_images')
const Category = require('../models/category')
 let category_list=[];

async function getallmobiles(req, res) {
    try {
     
        const data = await fetch('https://dummyjson.com/products?limit=100&skip=0',{ method: "Get" })
        .then(res => res.json())
        const jsonData = data.products;
        
        jsonData.map(async (item)=>{
                    
      // Insert data into the products table
      const product = new Products({
        title: item.title,
        description: item.description,
        brand: item.brand,
        category: item.category,
      });
        console.log(item.category);
       category_list.push(item.category)
      // Insert data into the prices table
      const price = new Price({
        price: item.price,
        product_id: product._id, // Use the ObjectId of the newly inserted product
      });

      // await price.save();

      
      const rating = new Ratings({
        rating: item.rating, 
        product_id: product._id, 
        message:"", 
      });

      // await rating.save();

      const image = new Images({
        image_url: item.images, 
        product_id: product._id 
        
      });

      // await image.save()
       
        })
        //removing duplicates 
        const list = category_list.filter((category,index)=> category_list.indexOf(category)=== index)
        list.map(async (cat)=>{
          const category = new Category({
            category :cat
           });
          await category.save();
        })
        
       


        res.status(200).json({ success: true, data: 'Prices of products have been inserted successfully' });
       
    
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

async function getallproducts(req, res) {
    try {
       
        const response =await productsService.getallproducts(); 
        res.status(200).json({ success: true, data: response });
       
    
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

async function insertData(req, res) {
    try {
      
        const response =await productsService.insertcategoryid(); 
        res.status(200).json({ success: true, data: response });
       
    
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

async function getcategories(req,res){
  try{
    console.log(req.query,"sdfghjkl");
    if(req.query){
      const data = await productsService.getcategory(req.query.type);
    
    res.status(200).json({ success: true, data: data });
   }else{
    res.status(403).json({ success: true, message:'Invalid type' });
   }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getallcategories(req,res){
  try{
   
      const data = await productsService.getallcategory();
    
    res.status(200).json({ success: true, data: data });
  
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
async function getcategoryproducts(req,res){
  try{
   if(req.query.id){ 
    const data = await productsService.getproducts(req.query.id);
    res.status(200).json({ success: true, data: data });
  }else{
    res.status(403).json({ success: true, message:'Invalid category' });
  }
    
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports={
  getallmobiles,
  getallproducts,
  insertData,
  getcategories,
  getallcategories,
  getcategoryproducts
}