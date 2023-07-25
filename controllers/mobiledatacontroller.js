 const productsService= require('../services/products')
 
 
 async function getallmobiles(req, res) {
    try {
        const data =await fetch('https://dummyjson.com/products?limit=100&skip=0',{ method: "Get" })
        .then(res => res.json())
        data.products.foreach(async (item)=>{
            
            const result = await productsService.insertData(item);
         
            
        })
        res.status(200).json({ success: true, data: 'Products have been inserted successfully' });
       
    
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

module.exports={getallmobiles}