import Mode from "@/data/mode-data";
import styles from "./PlayMode.module.css";
import { useEffect, useState } from "react";
import StartGame from "./StartGame";
import LoadingFull from "@/components/containers/LoadingFull";
import { SelectCharacter } from "./SelectCharacter";
import useImageLoader from "../hooks/useImageLoader";
import TimerContext from "../hooks/timerContext";

import type {
  CharacterInfo,
  GameStatusData,
  SelectCharData,
} from "@/features/playgame";
// temporary imports
import {
  getGameData,
  validateSelect,
  type CheckData,
} from "@/mock-server/getGameData";
import { ScoreBoard } from "@/features/scoreboard";
interface PlayModeProps {
  modeData: Mode | null;
  mode: string;
}

// root component
const PlayMode = ({ modeData }: PlayModeProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [gameData, setGameData] = useState<CharacterInfo[] | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatusData | null>(null);
  const [selectCharData, setSelectCharData] = useState<SelectCharData | null>(
    null,
  );
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [timer, setTimer] = useState(gameStatus?.resumeFrom || 0);

  useEffect(() => {
    const mockFetch = async () => {
      const data = await getGameData();
      setGameData(data);
      setGameStatus({
        characters: data.map((d) => {
          return {
            id: d.id,
            name: d.name || "Unknown",
            modeName: d.modeName,
            imageCode: d.imageCode,
            found: d.found,
          };
        }),
        innocentKills: 0,
        resumeFrom: 0,
      });
    };
    mockFetch();
  }, []);

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
    gameData?.map((d) => {
      const imgSrc = `/characters/${d.modeName}/${d.imageCode}.png`;
      return imgSrc;
    }) || null,
  );

  const startGame = () => {
    setIsStarted(true);
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
    /*
    const userValue = prompt("select your result from 1 t  3");

    const assumed = mockData.find((item) => {
      const num = Number.parseInt(userValue || "mm");

      return item.imageCode === num;
    });

    if (assumed) {
      console.log(assumed);
      const res = isMatch(
        { x: assumed.xposition, y: assumed.yposition },
        { x: percentX, y: percentY },
      );
      alert(res);
    }
    */
  };

  const handleSelect = async (data: CheckData) => {
    const result = await validateSelect(data);
    switch (result.validationResult) {
      case "no-character":
        {
          return;
        }
        break;
      case "wrong":
        {
          setGameStatus((prev) => {
            if (!prev) return null;
            else
              return {
                ...prev,
                resumeFrom: result.resumeFrom,
                innocentKills: result.innocentKills,
              };
          });
        }
        break;
      case "correct": {
        if (gameStatus && result.characters) {
          setGameStatus({
            ...gameStatus,
            characters: result.characters,
            resumeFrom: result.resumeFrom,
          });
        }
      }
    }
  };

  const closeOptionsMenu = () => {
    setOptionsOpen(false);
  };
  return (
    <>
      {!isReady && !isStarted && <LoadingFull />}
      {!isStarted && gameData && isReady && (
        <StartGame
          startGame={startGame}
          characters={gameData.map((d) => ({
            name: d.name || "Unknown",
            imageCode: d.imageCode,
            modeName: d.modeName,
          }))}
        />
      )}
      {isStarted && isReady && gameStatus && gameData && (
        <TimerContext.Provider value={timer}>
          <ScoreBoard gameStatus={{ ...gameStatus }} />
        </TimerContext.Provider>
      )}
      {isStarted && isReady && gameStatus && optionsOpen && selectCharData && (
        <SelectCharacter
          close={closeOptionsMenu}
          posData={selectCharData}
          characters={gameStatus.characters.filter((char) => {
            return !char.found;
          })}
          handleSelect={handleSelect}
          gameStatus={{ ...gameStatus }}
        />
      )}

      <img
        src={modeData?.modeImageUrl}
        alt={modeData?.description}
        className={styles.img}
        onClick={handleClick}
        draggable="false"
      />
    </>
  );
};

export { PlayMode };
