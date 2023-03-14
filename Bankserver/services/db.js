//import mongoose in db.js

const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

//using mongoose define connection string

mongoose.connect('mongodb://localhost:27017/Bank', ()=>{
    console.log("Mongo db connected successfully");
})

//create model for the projecct
//collection -users

const User = mongoose.model('User', {
    username:String,
    acno:Number, 
    password:String, 
    balance:Number, 
    transaction:[]
})
module.exports={
    User
}