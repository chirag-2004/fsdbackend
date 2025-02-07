const fs = require('fs');

// const data=fs.readFile('./Data.txt');
const data=fs.readFileSync("./Data.txt","utf-8");
console.log(data);