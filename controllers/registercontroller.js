const User = require('../models/user');
const registerService= require('../services/register')
async function getallusers(req,res,next){
    try {
        const alldata = await registerService.getusers(); 
        if (!alldata) {
          res.status(404).json("There are no users found yet!");
        }
        res.json(alldata);
      } catch (error) {
        res.status(500).json({ error: error });
      }
}

async function newuser(req,res,next){
    try {
        // console.log(req.body);
        if (!req.body) return next(new AppError("No data found", 404));
        const createduser =  await registerService.createusers(req.body);
        // res.json(createduser);
        // console.log(createduser);
        res.status(200).json(createduser);
      } catch (error) {
        res.status(500).json({ error: error });
      }
}


module.exports = {
    getallusers,
    newuser

}