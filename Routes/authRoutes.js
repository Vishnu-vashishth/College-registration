const express = require('express');
const {getSignIpPage,getSignUpPage,postSignIn,postSignUp}  = require('../Controllers/authController')
const authRouter = express.Router();

authRouter.route('/signup')
.get(getSignUpPage)
.post(postSignUp);


authRouter.route('/signin')
.get(getSignIpPage)
.post(postSignIn);

module.exports = authRouter;