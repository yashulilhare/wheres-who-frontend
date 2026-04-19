import styles from "./PlayMode.module.css";
import handleAttempt from "../api/handleSelect";
import Mode from "@/data/mode-data";

import StartGame from "./StartGame";
import LoadingFull from "@/components/containers/LoadingFull";
import { SelectCharacter } from "./SelectCharacter";
import { ScoreBoard } from "@/features/scoreboard";
import GameOver from "@/pages/gameover/GameOver";

import { useEffect, useState } from "react";
import useImageLoader from "../hooks/useImageLoader";
import TimerContext from "../hooks/timerContext";
import useGameDataLoader from "../hooks/useGameDataLoader";
import { useNavigate } from "react-router-dom";

import type { SelectCharData } from "@/features/playgame";

import type {
  AttemptResponse,
  AttemptSentData,
  AttemptSuccessResponse,
} from "../types/playmode";
interface PlayModeProps {
  modeData: Mode | null;
  mode: string;
}

const PlayMode = ({ modeData, mode }: PlayModeProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameCompleteData, setGameCompleteData] =
    useState<AttemptSuccessResponse | null>(null);

  const [selectCharData, setSelectCharData] = useState<SelectCharData | null>(
    null,
  );
  const [optionsOpen, setOptionsOpen] = useState(false);

  const { gameData, gameDataLoaded, setGameData, restartGame } =
    useGameDataLoader(mode);
  const [timer, setTimer] = useState(gameData?.lastTimerScore || 0);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setOptionsOpen(false);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isStarted) {
      const key = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => {
        clearInterval(key);
      };
    }
  }, [timer, isStarted]);

  const isReady = useImageLoader(
    gameData?.characterData.map((d) => {
      const imgSrc = `/characters/${gameData.modeName}/${d.imageCode}.png`;
      return imgSrc;
    }) || null,
  );
  const startGame = () => {
    setIsStarted(true);
    setTimer(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isStarted) return;
    const posX = e.clientX;
    const posY = e.clientY;

    const rect = e.currentTarget.getBoundingClientRect();

    const currentWidth = rect.width;
    const currentHeight = rect.height;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const percentX = (clickX / currentWidth) * 100;
    const percentY = (clickY / currentHeight) * 100;

    setSelectCharData({
      x: posX,
      y: posY,
      percentX: percentX,
      percentY: percentY,
    });
    setOptionsOpen(true);
  };

  const handleSelect = async (data: AttemptSentData) => {
    const audio = new Audio("/sounds/gunshot.mp3");
    audio.volume = 0.2;
    audio.play();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
      return;
    }
    const bearerToken = `Bearer ${token}`;
    try {
      const res = await handleAttempt(bearerToken, data);
      if (!res.ok || res.status >= 400) {
        const resData = await res.json();
        console.error(resData);
        return;
      }

      const resData = (await res.json()) as AttemptResponse;
      if (resData.attemptResult === "FAILED" && gameData) {
        setGameData({
          ...gameData,
          innocentKills: resData.innocentKills,
        });
        return;
      }
      if (resData.attemptResult === "SUCCESS" && gameData) {
        if (resData.gameState === "COMPLETED") {
          setGameCompleted(true);
          setGameCompleteData(resData);
          return;
        }
        setGameData({
          ...gameData,
          characterData: resData.characters,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const closeOptionsMenu = () => {
    setOptionsOpen(false);
  };

  const handleRestart = () => {
    setIsStarted(false);
    setGameCompleted(false);
    setGameCompleteData(null);
    restartGame();
  };
  return (
    <>
      {!isReady && !isStarted && !gameCompleted && <LoadingFull />}

      {!isStarted &&
        gameDataLoaded &&
        isReady &&
        gameData &&
        !gameCompleted && (
          <StartGame
            startGame={startGame}
            characters={gameData.characterData.map((d) => ({
              name: d.name || "Unknown",
              imageCode: d.imageCode,
              modeName: gameData.modeName,
            }))}
          />
        )}

      {isStarted && isReady && gameData && !gameCompleted && (
        <TimerContext.Provider value={timer}>
          <ScoreBoard gameData={gameData} />
        </TimerContext.Provider>
      )}

      {isStarted &&
        isReady &&
        gameData &&
        optionsOpen &&
        selectCharData &&
        !gameCompleted && (
          <SelectCharacter
            close={closeOptionsMenu}
            posData={selectCharData}
            characters={gameData.characterData.filter((char) => {
              return !char.found;
            })}
            gameData={{
              gameId: gameData.id,
              modeId: gameData.modeId,
              timerScore: timer,
              innocentKills: gameData.innocentKills,
              modeName: gameData.modeName,
            }}
            handleSelect={handleSelect}
          />
        )}

      {!gameCompleted && (
        <img
          src={modeData?.modeImageUrl}
          alt={modeData?.description}
          className={styles.img}
          onClick={handleClick}
          draggable="false"
        />
      )}

      {gameCompleted && gameCompleteData && gameData && (
        <GameOver
          restartGame={handleRestart}
          innocentKills={gameData.innocentKills}
          modeName={gameData.modeName}
          data={gameCompleteData}
        />
      )}
    </>
  );
};

export { PlayMode };
