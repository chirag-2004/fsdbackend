const http=require('http')

const server=http.createServer(async(req,res)=>{
    const data=await fetch("https://dummyjson.com/products");
    const jsd=await data.json();
    const products=jsd.products;
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    const title=products.map((ele)=>{
        return ele.title;
    })
    res.end(JSON.stringify(title));
});

server.listen(9000,(err)=>{
    if (err) console.log(err);
    else console.log('Server is running on port 9000');
})