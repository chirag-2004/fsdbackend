const fs=require("fs");
console.log("Create a new Directory");
fs.mkdir('Myfolder',{recursive:true},(err)=>{
    if(err){
        console.error("An error occured",err);
        return;
    }
    console.log("Directory created successfully");

});