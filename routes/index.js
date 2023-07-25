const express = require('express');
const router = express.Router();
const register= require('../controllers/registercontroller');
const authenticate = require('../middleware/authenticate');
const mobiledata= require('../controllers/mobiledatacontroller')

//users
router.get('/get',register.getallusers); 
router.get('/userbyId', authenticate, register.getuser); 
router.post('/post', register.newuser); 
router.post('/update',authenticate, register.updateone); 
router.post('/check', register.loginuser);
router.post('/upload', register.uploadfile);
router.delete('/delete', register.deleteuser);
router.get('/paging', register.pagination);
router.get('/search', register.searchuser);

//products
router.post('/postalldata',mobiledata.getallmobiles); 
// router.post( ); 
module.exports= router;