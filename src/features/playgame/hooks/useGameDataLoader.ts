import { api } from "@/lib/api";
import { useEffect, useState } from "react";

import type { StartGameData, StartGameError } from "../types/playmode";
import { useNavigate } from "react-router";

const useGameDataLoader = (mode: string) => {
  const navigate = useNavigate();
  const [gameDataLoaded, setGameDataLoaded] = useState(false);
  const [gameData, setGameData] = useState<StartGameData | null>(null);
  const [startGameError, setStartGameError] = useState<StartGameError | null>(
    null,
  );

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const startGameUrl = `${baseUrl}/playgame/start`;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
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
          setGameData(successData);
          setGameDataLoaded(true);
          // todo: console
          console.log(successData);
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
  }, [mode]);

  return { gameData, gameDataLoaded, startGameError };
};

export default useGameDataLoader;
