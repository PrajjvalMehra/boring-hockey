"use client";
import { useEffect, useState } from "react";
import socket from "@/socket";
import { Button } from "@/components/ui/button"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

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
      <Button variant="destructive" onClick={updatePlayer}>
        Update Player
      </Button>
    </div>
  );
}