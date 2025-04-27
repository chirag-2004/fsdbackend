const http=require('http');

const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h1 style="background-color:black;color:white">Hello World</h1>');
    res.end();
}); //create server

server.listen(8000,(err)=>{
    if(err)
        console.log(err);
    console.log('Server is running on port 8000');
}); //listen to port 8000