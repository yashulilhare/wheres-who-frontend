import Mode from "@/data/mode-data";
import styles from "./PlayMode.module.css";
import { useEffect, useState } from "react";
import StartGame from "./StartGame";
import useImageLoader from "../hooks/useImageLoader";

import type { CharacterInfo } from "../types/playmode";
// temporary imports
import { getGameData } from "@/mock-server/getGameData";

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

  useEffect(() => {
    const mockFetch = async () => {
      const data = await getGameData();
      setGameData(data);
    };
    mockFetch();
  });

  const isReady = useImageLoader(
    gameData?.map((d) => {
      const imgSrc = `/characters/${d.modeName}/${d.imageCode}.png`;
      return imgSrc;
    }) || null,
  );

  const startGame = () => {
    setIsStarted(true);
  };

  /*
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    if (!isStarted) return;
    // const img = e.currentTarget;
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
  };
*/

  return (
    <>
      {!isReady && !isStarted && <h1>Setting up your game....</h1>}
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
      <img
        src={modeData?.modeImageUrl}
        alt={modeData?.description}
        className={styles.img}
        onClick={() => {
          //todo: pass handleClick
        }}
      />
    </>
  );
};

export { PlayMode };
