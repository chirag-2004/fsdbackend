const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/home') {
        res.end('welcome to home page');
    }
    else if (req.url === '/about') {
        res.end('welcome to about page');
    }
    else if (req.url === '/contact') {
        res.end('welcome to contact page');
    }
    else {
        res.writeHead(404);
        res.end('404 not found');
    }
})

server.listen(6002,(err)=>{
    if (err) console.log(err);
    else console.log('Server is running on port 6002');
})