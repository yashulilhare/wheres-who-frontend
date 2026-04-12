import Mode from "@/data/mode-data";
import styles from "./PlayMode.module.css";
import { useEffect, useState } from "react";
import StartGame from "./StartGame";
import LoadingFull from "@/components/containers/LoadingFull";
import { SelectCharacter } from "./SelectCharacter";
import useImageLoader from "../hooks/useImageLoader";

import type { CharacterInfo, GameStatusData } from "../types/playmode";
// temporary imports
import { getGameData } from "@/mock-server/getGameData";
import ScoreBoard from "@/features/scoreboard/components/ScoreBoard";

interface PlayModeProps {
  modeData: Mode | null;
  mode: string;
}

/*
interface Points {
  x: number;
  y: number;
}
const isMatch = (stored: Points, clicked: Points): boolean => {
  console.log(stored);
  console.log(clicked);
  const diffX = Math.abs(stored.x - clicked.x);
  const diffY = Math.abs(stored.y - clicked.y);
  console.log(diffX, diffY);

  if (diffX > 5 && diffY > 5) return false;
  else return true;
};
*/

// root component
const PlayMode = ({ modeData }: PlayModeProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [gameData, setGameData] = useState<CharacterInfo[] | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatusData | null>(null);
  const [optionsMenuPos, setOptionsMenuPos] = useState({ x: 0, y: 0 });
  const [optionsOpen, setOptionsOpen] = useState(false);

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

    setOptionsMenuPos({ x: posX, y: posY });
    setOptionsOpen(true);

    /*
    const rect = e.currentTarget.getBoundingClientRect();

    const currentWidth = rect.width;
    const currentHeight = rect.height;
    
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    const percentX = (clickX / currentWidth) * 100;
    const percentY = (clickY / currentHeight) * 100;
    
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
        <ScoreBoard
          gameStatus={gameStatus}
          characters={gameData.map((d) => ({
            id: d.id,
            name: d.name || "Unknown",
            imageCode: d.imageCode,
            modeName: d.modeName,
          }))}
        />
      )}
      {isStarted && isReady && gameStatus && optionsOpen && (
        <SelectCharacter
          close={closeOptionsMenu}
          position={{ x: optionsMenuPos.x, y: optionsMenuPos.y }}
          characters={gameStatus.characters.filter((char) => {
            return !char.found;
          })}
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
