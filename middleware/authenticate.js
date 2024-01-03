let jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');
const helpers = require('../utils/helpers');

 module.exports=(req, res, next) =>{
    try {
      const token = req.headers["authorization"]
      // console.log(token,"tokkkkkk");
      if (token) {
        const decodedData = jwt.verify(token, jwtSecretKey)
        req['decoded'] = decodedData;
        next();
      } else {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
      }
    } catch (err) {
      return res.status(500).json({ success: false, error: `${err}` });
  
    }
  }


  // module.exports={
  //   decodingtoken

  // }