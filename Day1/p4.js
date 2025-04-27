const fs=require("fs");
const data=fs.readFile("./Data.txt","utf-8",(err,Data)=>{
    if(err){
        console.log("Error reading file ",err);
        return;
    }
    console.log(Data);
});
// console.log(Data);