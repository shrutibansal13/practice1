const express = require('express');
const router = express.Router();
const register= require('../controllers/registercontroller');

router.get('/get', register.getallusers); 
router.get('/userbyId', register.getuser); 
router.post('/post', register.newuser); 
router.post('/update', register.updateone); 
router.post('/check', register.checkuser);
router.post('/upload', register.uploadfile);
router.delete('/delete', register.deleteuser);
router.get('/paging', register.pagination);
router.get('/search', register.searchuser);
module.exports= router;