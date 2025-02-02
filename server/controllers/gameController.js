// filepath: /server/controllers/gameController.js
let gameState = {
    players: [],
    puck: { x: 0, y: 0 },
};

const handlePlayerUpdate = (data) => {
    const player = gameState.players.find(p => p.id === data.id);
    if (player) {
        player.x = data.x;
        player.y = data.y;
    } else {
        gameState.players.push({ id: data.id, x: data.x, y: data.y });
    }
    return gameState;
};

module.exports = {
    gameState,
    handlePlayerUpdate,
}; 