"use client";
import { useEffect, useState } from "react";
import socket from "@/socket";

export default function Home() {
  const [gameState, setGameState] = useState({ players: [], puck: { x: 0, y: 0 } });

  useEffect(() => {
    socket.on("gameState", (state) => {
      setGameState(state);
    });

    return () => {
      socket.off("gameState");
    };
  }, []);

  const updatePlayer = () => {
    const playerData = { id: "player1", x: Math.random() * 100, y: Math.random() * 100 };
    socket.emit("updatePlayer", playerData);
  };

  return (
    <div>
      <h1 className="text-4xl">Game State</h1>
      <pre>{JSON.stringify(gameState, null, 2)}</pre>
      <button onClick={updatePlayer} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Update Player
      </button>
    </div>
  );
}