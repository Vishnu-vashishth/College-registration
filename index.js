const express = require ('express');
const  mongoose = require ('mongoose');
const authRouter = require ('./Routes/authRoutes')
const app = express();
app.use(express.json());
app.use("/api/auth",authRouter);


app.listen(5000,()=>{console.log('connected on port no 5000')});
mongoose.connect('mongodb+srv://vishnu-vashishth:Vish98733@cluster0.x3jya.mongodb.net/clg_events',()=>{console.log('db connected.............')})