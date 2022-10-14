const cookieParser = require('cookie-parser');
const express = require ('express');
const  mongoose = require ('mongoose');
const authRouter = require ('./Routes/authRoutes');
require ('dotenv').config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/multer",require('./Routes/multerRoutes'));
app.listen(5000,()=>{console.log('connected on port no 5000')});
mongoose.connect(`${process.env.MONGO_URL}`,()=>{console.log('db connected.............')})