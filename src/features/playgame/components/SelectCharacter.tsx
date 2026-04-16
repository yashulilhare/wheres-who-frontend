import styles from "./SelectCharacter.module.css";
import { useRef, useLayoutEffect } from "react";

import type {
  SelectCharData,
  GameCharacterData,
  AttemptSentData,
} from "../types/playmode";
// import type { CheckData } from "@/mock-server/getGameData";

interface SelectCharacterProps {
  characters: GameCharacterData[];
  close: () => void;
  posData: SelectCharData;
  handleSelect: (data: AttemptSentData) => Promise<void>;
  gameData: {
    gameId: string;
    modeId: number;
    modeName: string;
    innocentKills: number;
    timerScore: number;
  };
}

const SelectCharacter = ({
  characters,
  close,
  posData,
  handleSelect,
  gameData,
}: SelectCharacterProps) => {
  const optionsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const optionMenuWidth = optionsRef.current?.offsetWidth;
    const optionMenuHeight = optionsRef.current?.offsetHeight;
    const windowWith = window.innerWidth;
    const windowHeight = window.innerHeight;

    let posX = posData.x;
    let posY = posData.y;

    // manage horizontal  overflow
    if (optionMenuWidth && posX + optionMenuWidth > windowWith) {
      posX = posX - optionMenuWidth;
      if (posX < 0) posX = 10;
    }

    // manage vertical overflow
    if (optionMenuHeight && posY + optionMenuHeight > windowHeight) {
      posY = posY - optionMenuHeight;
      if (posY < 0) posY = 10;
    }

    if (optionsRef.current) {
      optionsRef.current.style.left = `${posX}px`;
      optionsRef.current.style.top = `${posY}px`;
      optionsRef.current.style.visibility = "visible";
    }
  }, [posData]);

  return (
    <div className={styles.container} ref={optionsRef}>
      <button className={styles.cancelButton} onClick={close}>
        X
      </button>
      <ul>
        {characters.map((char) => {
          const imgSrc = `/characters/${gameData.modeName}/${char.imageCode}.png`;
          return (
            <li
              className={styles.list}
              key={char.id}
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                await handleSelect({
                  gameId: gameData.gameId,
                  charId: char.id,
                  modeId: gameData.modeId,
                  charName: char.name,
                  timerScore: gameData.timerScore,
                  x: posData.percentX,
                  y: posData.percentY,
                });
              }}
            >
              <img src={imgSrc} alt={`Image for character ${char.name}`} />
              <p>{char.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { SelectCharacter };
