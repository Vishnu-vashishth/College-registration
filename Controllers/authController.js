const path = require('path');

const signInfilepath =  path.join(__dirname,'..','/Public/auth/signin.html');
const signUpfilepath =  path.join(__dirname,'..','/Public/auth/signup.html');

function getSignUpPage(req,res)
{
       res.sendFile(signUpfilepath);
       
}
function getSignIpPage(req,res)
{
       res.sendFile(signInfilepath);
}

function postSignIn(req,res)
{
}







module.exports = {getSignIpPage,getSignUpPage,postSignIn};
