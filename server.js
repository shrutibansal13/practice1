require('dotenv').config();
const express= require('express');
const app = express();
const bodyParser =  require("body-parser");
const connectDB = require('./config/dbConn');
const fileupload = require('express-fileupload');
var ObjectId = require('mongodb').ObjectId;
const router = require("./routes");
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

connectDB();

app.use(bodyParser.urlencoded({extended: true }));  
app.use(express.json({ type: 'application/*+json' }));
app.use(bodyParser.json());
app.use(router);
app.use(fileupload());

// app.post('/uploadfile', function(req,res,next){
//     var file= req.files.photo;
//     console.log(file.name);
//     file.mv('images/'+file.name, function(err,result){
//       res.status(200).json({message:'File uploaded'});
//     })

// })


// var url = 'mongodb://localhost:27017/upload';
// var multer = require('multer');
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'public/images/uploads')
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
// });
// var upload = multer({storage: storage});
// var insertDocuments = function(db, filePath, callback) {
//   var collection = db.collection('user');
//   collection.insertOne({'imagePath' : filePath }, (err, result) => {
//       assert.equal(err, null);
//       callback(result);
//   });
// }


// app.post('/file', upload.single('image'), (req, res, next) => {
//   MongoClient.connect(url, (err, db) => {
//     assert.equal(null, err);
//     insertDocuments(db, 'images' + req.file.filename, () => {
//         // db.close();
//         res.json({'message': 'File uploaded successfully'});
//     });
// });
// })


app.listen(8000);

module.exports = app;