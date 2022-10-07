const express = require ('express');
const  mongoose = require ('mongoose');
const authRouter = require ('./Routes/authRoutes')
const app = express();
app.use("/api/auth",authRouter)
app.use(express.json());


app.listen(5000,()=>{console.log('connected on port no 5000')});