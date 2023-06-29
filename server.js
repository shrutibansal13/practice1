require('dotenv').config();
const express= require('express');
const app = express();
const mongoose =require('mongoose');
const connectDB = require('./config/dbConn')
const register= require('./controllers/registercontroller')
connectDB();


app.get('/', register.getusers); 
app.post('/post', register.createusers); 
mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    app.listen(8000,()=> console.log(`Server running on port 8000`))
})