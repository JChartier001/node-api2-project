
const express = require('express');
const postRouter = require('../posts/postRouter');
const server = express();

server.get('/', (req, res) => {
    res.send(`
    <h2>Hello World</h2`);
});

server.use('/api/posts', postRouter);

module.exports = server;