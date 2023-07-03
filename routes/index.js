const express = require("express");
const router = express.Router();
const register= require('../controllers/registercontroller');

router.get('/get', register.getallusers); 
router.post('/post', register.newuser); 
router.get('/check', register.checkuser);

module.exports= router;