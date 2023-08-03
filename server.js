require('dotenv').config();
const express= require('express');
const app = express();
const bodyParser =  require("body-parser");
const connectDB = require('./config/dbConn');
const fileupload = require('express-fileupload');
const cron = require("node-cron");
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId;
const router = require("./routes");
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

connectDB();
app.use(express.urlencoded({extended: true })); 
app.use(bodyParser.urlencoded({extended: true }));  
app.use(express.json({ type: 'application/*+json' }));
app.use(bodyParser.json());
app.use(router);
app.use(fileupload());

// cron.schedule("*/10 * * * * *", function() {
//     console.log("running a task every 10 seconds");
// });
//            seconds(opt), minute,hours,dayofthemonth,month,dayoftheweek
cron.schedule("0 7 * * * ", function() {
    console.log("running a task everyday at 7am");
});
app.listen(8000);

module.exports = app;