"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Menu() {
  const router = useRouter();
  const [gameId, setGameId] = useState("");

  const startGame = () => {
    const channelId = `game-${Math.random().toString(36).substr(2, 9)}`;
    router.push(`/game?channelId=${channelId}`);
  };

  const joinGame = () => {
    if (gameId.trim()) {
      router.push(`/game?channelId=${gameId}`);
    } else {
      alert("Please enter a valid game ID");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl mb-8">Boring Hockey</h1>
      <Button variant="primary" onClick={startGame} className="mb-4">
        Start New Game
      </Button>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder="Enter Game ID"
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <Button variant="secondary" onClick={joinGame}>
          Join Game
        </Button>
      </div>
    </div>
  );
}