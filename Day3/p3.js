const http = require('http');
const fs = require('fs');
const path = require('path');

const users = require('./data.json');
const dataFilePath = path.join(__dirname, 'data.json');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    if (req.url === '/getdata' && req.method === 'GET') {
        res.end(JSON.stringify(users));
        return;
    } else if (req.url === '/setdata' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const data = JSON.parse(body);
            console.log('Received data:', data);
            users.push(data);

            fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                    res.end(JSON.stringify({message: 'Error saving data'}));
                    return;
                }
                res.end(JSON.stringify({message: 'Data received successfully'}));
            });
        });
        return;
    }
});

server.listen(9000, () => {
    console.log('Server is running on port 9000');
});