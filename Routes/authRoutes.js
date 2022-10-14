const cookieParser = require('cookie-parser');
const express = require('express');
const {getSignIpPage,getSignUpPage,postSignIn,postSignUp,protectedRoute}  = require('../Controllers/authController')
const authRouter = express.Router();

authRouter.route('/signup')
.get(protectedRoute,getSignUpPage)
.post(postSignUp);


authRouter.route('/signin')
.get(getSignIpPage)
.post(postSignIn);

module.exports = authRouter;