const http=require("http");
const fs=require('fs/promises');
const server=http.createServer(async(req,res)=>{
// res.writeHead(200,{'Content-Type':'text/html'});
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    const data=await fs.readFile("./index.html");
    res.end(data);
}); 

server.listen(3000,()=>{
    console.log("server is running on port 3000");
})