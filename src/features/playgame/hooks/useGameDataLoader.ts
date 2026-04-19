import { api } from "@/lib/api";
import { useEffect, useState } from "react";

import type {
  GameData,
  StartGameData,
  StartGameError,
} from "../types/playmode";
import { useNavigate } from "react-router";

const useGameDataLoader = (mode: string) => {
  const navigate = useNavigate();
  const [gameDataLoaded, setGameDataLoaded] = useState(false);
  const [startGameData, setStartGameData] = useState<StartGameData | null>(
    null,
  );
  const [startGameError, setStartGameError] = useState<StartGameError | null>(
    null,
  );
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [restart, setRestart] = useState(0);

  const restartGame = () => {
    setRestart(restart + 1);
  };

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const startGameUrl = `${baseUrl}/playgame/start`;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return;
    }
    const bearerToken = `Bearer ${token}`;
    const controller = new AbortController();
    const loadGame = async () => {
      try {
        const res = await api(startGameUrl, {
          method: "POST",
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            modeName: mode,
          }),
          signal: controller.signal,
        });

        if (res.ok && res.status <= 400) {
          const successData = (await res.json()) as StartGameData;
          setStartGameData(successData);
          setGameData(successData.gameData);
          setGameDataLoaded(true);
        } else if (!res.ok && res.status >= 400) {
          const errorData = (await res.json()) as StartGameError;
          setStartGameError(errorData);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error(err);
      }
    };

    loadGame();

    return () => {
      controller.abort();
    };
  }, [mode, restart]);

  return {
    startGameData,
    gameDataLoaded,
    startGameError,
    gameData,
    setGameData,
    restartGame,
  };
};

export default useGameDataLoader;
