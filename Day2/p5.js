const http=require('http');
const fs=require('fs/promises');
const server=http.createServer(async(req,res)=>{
    res.writeHead(200,{'Content-Type':'application/json'});
    const data=await fs.readFile("./data.json");
        res.end(data);
});

server.listen(3002,()=>{
    console.log('server is running on port 3002');
});