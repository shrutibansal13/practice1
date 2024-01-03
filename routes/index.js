const express = require('express');
const router = express.Router();
const register= require('../controllers/registercontroller');
const authenticate = require('../middleware/authenticate');
const mobiledata= require('../controllers/mobiledatacontroller')

//users
router.get('/get',register.getallusers); 
router.get('/userbyId', authenticate, register.getuser); 
router.get('/userbyparamId', register.getuserbyparamId); 
router.post('/post', register.newuser); 
router.post('/update',authenticate, register.updateone); 
router.post('/check', register.loginuser);
router.post('/upload', register.uploadfile);
router.delete('/delete', register.deleteuser);
router.get('/paging', register.pagination);
router.get('/search', register.searchuser);

//products
router.post('/postalldata',mobiledata.getallmobiles); 
router.get('/getallproducts',mobiledata.getallproducts); 
router.post('/postcategory', mobiledata.insertData);
router.get('/getcategories',mobiledata.getcategories); 
router.get('/getallcategories',mobiledata.getallcategories);
router.get('/getproducts',mobiledata.getcategoryproducts); 
// router.post( ); 
module.exports= router;