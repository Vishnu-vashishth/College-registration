
const path = require('path');
const sendMail = require('./sendMail')
const userModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const signInfilepath = path.join(__dirname, '..', '/Public/auth/signin.html');
const signUpfilepath = path.join(__dirname, '..', '/Public/auth/signup.html');



function protectedRoute(req,res,next){
       
      let token = req.cookies;
      console.log(token);
      if(token){
     jwt.verify(token.login,process.env.JWT_KEY,function(err,verified){
       if(verified){
              next();
       }
       else{
            return  res.redirect('/api/auth/signin');
       }
     });
}
else{
       return  res.redirect('/api/auth/signin');

}

}

//*---------send sign up page------------
function getSignUpPage(req, res) {
       res.sendFile(signUpfilepath);
       
}

//*---------send sign in page------------
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
              
               bcrypt.compare(password,userData.password).then(function(allOkay){
                     if(allOkay)
                   {
                     let uid = userData['_id'];
                     let jwt_token  = jwt.sign({payload:uid},JWT_KEY); 
                    
                     res.cookie('login',jwt_token, { maxAge: 900000, httpOnly: true });
                     return res.status(200).json({message:"login succesfull"})
                   }
                   else{
                     return res.status(401).json({message:"incorrect password"})

                   }
              });
       }

       else{
              return res.status(400).json({message:"incorrect email "})
       }

}

async function forgotPassword (req,res){
      try {
       let {email} = req.body;
       let user = await userModel.findOne({email:email});
       if(user){
              let token = jwt.sign({payload:user['_id']},process.env.JWT_KEY);
              user.resetToken = token;
              user.save();
              sendMail(user.userName,email,token);
              return res.status(200).json({message:"reset link sent to your email"});
       }
       else{
              return res.status(404).json({message:"user not found"});
       }
      } catch (error) {
               res.json({message:error.message});
      }

}

async function resetPassword(req,res)
{
    try {
       const token = req.params.token;
       const {password} = req.body;
       const user = await userModel.findOne({resetToken:token});
       
       if(user){
              user.password = bcrypt.hashSync(password,10);
              user.resetToken = undefined;
              user.save();
              return res.status(200).json({message:"password updated"});
       }

       else{
              return res.status(404).json({message:"user not found"});
       }



    } catch (error) {
       res.json({message:error.message});
    }        
}


module.exports = { getSignIpPage, getSignUpPage, postSignIn ,postSignUp,protectedRoute,forgotPassword,resetPassword};
