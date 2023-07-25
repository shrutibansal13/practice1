const Products= require('../models/products')

async function insertData(item){
 try { 
    const results = Products.insertMany({
       
        title: item.title,
        description: item.description,
        brand: item.brand,
        category: item.category    
    })
    return results;
}
catch(error){
    return `${error};`
}
}


module.exports={
    insertData
}