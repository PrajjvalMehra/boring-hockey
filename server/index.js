// filepath: /server/index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const indexRouter = require('./routes/index');
const gameController = require('./controllers/gameController');

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = socketIo(server);

app.use('/', indexRouter);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('updatePlayer', (data) => {
        const updatedGameState = gameController.handlePlayerUpdate(data);
        io.emit('gameState', updatedGameState);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});