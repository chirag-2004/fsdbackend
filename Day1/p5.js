const fs=require("fs");
const data="I am Akshat";
fs.writeFile("./Data.txt",data,(err)=>{
    if(err)
        console.error("Error reading file",err);
    else
    console.log("file written successfully");
});