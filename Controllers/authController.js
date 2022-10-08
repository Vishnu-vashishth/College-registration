const path = require('path');
const userModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const signInfilepath = path.join(__dirname, '..', '/Public/auth/signin.html');
const signUpfilepath = path.join(__dirname, '..', '/Public/auth/signup.html');

function getSignUpPage(req, res) {
       res.sendFile(signUpfilepath);

}
function getSignIpPage(req, res) {
       res.sendFile(signInfilepath);
}



//*-----------------register user -----------------------------
async function postSignUp(req, res) {
       try 
       
       {
              let { userName,email,mobileNo,semester,clgName, password } = req.body;
          
                  //*--------------checking if user already exist--------
              let userExist = await userModel.findOne({ email: email });
       
              if (userExist) 
              {
                     return res.status(403).json({message: "user already exist" });
              }
              else 
              {  //*----------hash user password-------
                     // const salt = bcrypt.genSalt(10);
                     const hashedPassword = bcrypt.hashSync(password,10);
                      
                     //*-------user object created-------------
                  const user = {
                               userName:userName,
                               email:email,
                               mobileNo:mobileNo,
                               semester:semester,
                               clgName:clgName,
                               password: hashedPassword
                             }
                    await userModel.create(user);
                    return res.status(200).json({message:"registerd"});


              }
       }

       catch (err) {
              console.log(err);
       }
}



//*-----------login logic-----------------------------------

async function postSignIn(req, res) {
       let {email,password} = req.body;
       const userData = await userModel.findOne({email:email});
       if(userData){
              console.log(password,userData);
               bcrypt.compare(password,userData.password).then(function(allOkay){
                     if(allOkay)
                   {
                     res.cookie('login','true');
                     return res.status(200).json({message:"login succesfull"})
                   }
                   else{
                     return res.status(401).json({message:"incorrect password"})

                   }
              });
       }

       else{
              return res.status.json({message:"incorrect email "})
       }

}







module.exports = { getSignIpPage, getSignUpPage, postSignIn ,postSignUp};
