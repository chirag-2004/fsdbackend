const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
//Connect to Mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to Mongo db"))
  .catch((error) => console.log("Error in Connection",error));

//Design Book Schema
const BookSchema=new mongoose.Schema({
    title: String,
    author: String,
    date: String,
    image: String
})
// Design Book Model
const Book=mongoose.model('MyBook',BookSchema)

app.post('/books',async (req,res)=>{
    try {
    const newbook=new Book(req.body);
    await newbook.save();
    res.status(200).send('Book Added')
    } catch (error) {
        res.status(500).send('Sever Error')
    }
})

app.listen(9000,()=>{
    console.log('Server is Running on port 9000')
})