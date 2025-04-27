const http=require('http');
const users=[
    {id:1,name:'John',age:25},
    {id:2,name:'Jane',age:30},
    {id:3,name:'Bob',age:35}
];
const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'application/json'});
    const names=users.map((user)=>{
        return user.name;
    })
    res.end(JSON.stringify(names));
});

server.listen(3001,()=>{
    console.log('server is running on port 3001');
});