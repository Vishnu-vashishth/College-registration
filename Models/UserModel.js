const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
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
   
    semester:{
        type:String,
        
    },
    clgName:{
        type:String,
        required:true,
        
    },
    resetToken:{ 
        type:String,
        default:null
    },
    
});


const userModel = mongoose.model("user",userSchema);


module.exports = userModel;