import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{ type:String,reqired:true },
    email:{ type:String,reqired:true,unique:true },
    password:{ type:String,reqired:true },
})
const user=mongoose.model("User",userSchema,"userCollection")

export default user;