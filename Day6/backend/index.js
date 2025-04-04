import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
const app=express();
app.use(express.json());
dotenv.config();
import user from './models/user.js';
// app.get("/",(req,res)=>{
//     res.send("Welcome ");
// })
connectDB();
app.post("/user",async(req,res)=>{
    try{
        await user.create(req.body);
        res.status(201).json({message:"User created successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});

    }
})
const PORT =process.env.PORT;
app.listen (PORT,()=>
    console.log(`Server is running on port http://localhost:${PORT}`));
