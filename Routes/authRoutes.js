const cookieParser = require('cookie-parser');
const express = require('express');
const {getSignIpPage,getSignUpPage,postSignIn,postSignUp,protectedRoute,forgotPassword,resetPassword}  = require('../Controllers/authController')
const authRouter = express.Router();

authRouter.route('/signup')
.get(getSignUpPage)
.post(postSignUp);


authRouter.route('/signin')
.get(getSignIpPage)
.post(postSignIn);

//forgot password route
authRouter.route('/forgotpassword')
.post(forgotPassword);

authRouter.route('/resetpassword/:token')
.post(resetPassword);
module.exports = authRouter;