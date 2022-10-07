const express = require('express');
const {getSignIpPage,getSignUpPage,postSignIn}  = require('../Controllers/authController')
const authRouter = express.Router();

authRouter.route('/signup')
.get(getSignUpPage)
.post();


authRouter.route('/signin')
.get(getSignIpPage)
.post(postSignIn);

module.exports = authRouter;