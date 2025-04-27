const fs=require("fs");
const data="I am Akshat jain";
fs.appendFile("./Data.txt",data,(err)=>{
    if(err) throw err;
    console.log("file appended successfully");
    console.log(data)
});