const fs=require('fs/promises');

const read=async()=>{
    const data=await fs.readFile("./data.txt","utf-8");
    console.log(data) ;
}
read();
console.log("I am after reading data");