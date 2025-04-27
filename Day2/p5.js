const http=require('http');
const fs=require('fs/promises');
const server=http.createServer(async(req,res)=>{
    // res.writeHead(200,{'Content-Type':'application/json'});
    // res.writeHead(200,{'Content-Type':'text/html'});
    const data=await fs.readFile("./data.json");
    const mydata=JSON.parse(data);
    res.statusCode=200;
    res.statusMessage="Success"
    res.setHeader('Content-Type','application/json');
    const names=mydata.map((ele)=>{
        return ele.name
    })
    console.log(JSON.stringify(names));
        res.end(JSON.stringify(names));
});

server.listen(3002,(err)=>{
    if(err){
        console.error("Error"+err);
    }
    console.log('server is running on port 3002');
});