const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNo:{
        type:Number,
        required:true,
        unique:true
    },
   
    semsester:{
        type:String,
        required:true,
        unique:true
    },
    clgName:{
        type:String,
        required:true,
        
    }
    
});


const userModel = mongoose.model("user",userSchema);


module.exports = userModel;