const express = require('express');
const fs = require('fs/promises');
const app = express();
let users = [];
app.use(express.json());

const readData = async () => {
    const data = await fs.readFile('./data.json', 'utf8');
    users = JSON.parse(data);
};

const writeData = async () => {
    await fs.writeFile('./data.json', JSON.stringify(users, null, 2));
};

app.get('/getdata', async (req, res) => {
    await readData();
    res.json(users);
});

app.post('/setdata', async (req, res) => {
    const newUser = req.body;
    await readData();
    users.push(newUser);
    await writeData();
    res.json({ message: 'Data received successfully' });
});

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});