"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import io from "socket.io-client";
import { Button } from "@/components/ui/button";
import socket from "@/socket";

export default function Game() {
  const searchParams = useSearchParams();
  const channelId = searchParams.get('channelId');
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    if (!channelId) {
      console.error("Channel ID is not defined");
      return;
    }

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinGame", channelId);
    });

    socket.on("gameState", (data) => {
      console.log("Game state received", data);
      setPlayers(data.players);
    });

    // Clean up the effect
    return () => {
      socket.off("connect");
      socket.off("gameState");
      
    };
  }, [channelId]);

  return (
    <div>
      <h1 className="text-4xl">Game Channel: {channelId}</h1>
      <div>
        <h2 className="text-2xl">Players</h2>
        <ul>
          {players.map((player) => (
            <li key={player}>{player}</li>
          ))}
        </ul>
        </div>
      
    </div>
  );
}