const User = require('../models/user');
const registerService = require('../services/register')
const helpers= require('../utils/helpers')

async function getallusers(req, res) {
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

async function getuser(req, res, next) {
  try {
    const id = helpers(req);
    console.log(id,"iddddddd");
    if (!req.query) return next(new AppError("No data found", 404));
    const data = await registerService.getuserbyId(id);
    console.log("data>>>>>>>>>11", data)
    if (!data) {
      res.status(404).json("There are no users!");
    }
    res.status(200).json([data]);
    console.log(data, "data>>>>>>>>>>>>>>");
  } catch (error) { 
    res.status(500).json({ error: error });
  }
}

async function newuser(req, res, next) {
  try {
    // console.log(req.body);
    if (!req.body) return next(new AppError("No data found", 404));
    const createduser = await registerService.createusers(req.body);
    // res.json(createduser);
    // console.log(createduser);
    res.status(200).json(createduser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function updateone(req, res, next) {
  
  try {
    const id = helpers(req);
    console.log(id,"iddddddd");
    if (!req.body) return next(new AppError("No data found", 404));
    const updateduser = await registerService.update(req.body,id);
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function loginuser(req, res, next) {
  try {
    if (!req.body) return next(new AppError("No data found", 404));
    const users = await registerService.loginguser(req.body);
    if (users === 'Password does not match') {
      res.status(200).json('Password does not match');
    } else {
      res.status(200).json({ success: true, "data": users });
    }

  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function uploadfile(req, res, next) {
  try {
    var file = req.body.photo;
    console.log(file);
    file.mv('/images/' + file.name, function (err, result) {
      res.status(200).json({ message: 'File uploaded' });
    })

  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function deleteuser(req, res, next) {
  try {
    console.log(">>>>>>>>>>>>>>>", req.query.id)
    if (!req.query) return next(new AppError("No data found", 404));
    const data = await registerService.deletebyId(req.query.id);
    if (!data) {
      res.status(404).json("There are no users!");
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function pagination(req, res, next) {
  try {
    var regex = new RegExp(req.query.search, 'i');
    if (!req.query) return next(new AppError("No data found", 404));
    const data = await registerService.pagingusers(regex, req.query.page, req.query.limit);
    if (!data) {
      res.status(404).json("There are no more users!");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function searchuser(req, res, next) {
  try {
    var regex = new RegExp(req.query.search, 'i');
    if (!req.query) return next(new AppError("No data found", 404));
    const data = await registerService.searchuser(regex, req.query.page, req.query.limit);
    if (!data) {
      res.status(404).json("There are no users!");
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  getallusers,
  getuser,
  newuser,
  updateone,
  loginuser,
  uploadfile,
  deleteuser,
  pagination,
  searchuser,
  
}