const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const indexRouter = require('./routes/index');
const gameController = require('./controllers/gameController');

const app = express();
const port = 3002;

app.use(cors()); // Add this line to enable CORS

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use('/', indexRouter);

const games = {};

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinGame', (channelId) => {
        console.log(`Player joined channel: ${channelId}`);
        if (!games[channelId]) {
            games[channelId] = { players: [], puck: { x: 0, y: 0 } };
            console.log(`New game channel created: ${channelId}`);
        }
        socket.join(channelId);
        const playerId = socket.id;
        if (!games[channelId].players.includes(playerId)) {
            games[channelId].players.push(playerId);
        }
        console.log(`Player joined channel: ${channelId}`);
        const  broadcastToRoom = ()=> {
            io.to(channelId).emit('gameState', games[channelId], games[channelId].players);
        }
        broadcastToRoom();
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});