import styles from "./SelectCharacter.module.css";
import { useRef, useLayoutEffect } from "react";

import type { SelectCharData, GameStatusData } from "../types/playmode";
import type { CheckData } from "@/mock-server/getGameData";

interface Character {
  id: string;
  name: string;
  modeName: string;
  imageCode: number;
}
interface SelectCharacterProps {
  characters: Character[];
  close: () => void;
  posData: SelectCharData;
  handleSelect: (data: CheckData) => Promise<void>;
  gameStatus: GameStatusData;
}

const SelectCharacter = ({
  characters,
  close,
  posData,
  handleSelect,
  gameStatus,
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
          const imgSrc = `/characters/${char.modeName}/${char.imageCode}.png`;
          return (
            <li
              className={styles.list}
              key={char.id}
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await handleSelect({
                  charId: char.id,
                  charName: char.name,
                  x: posData.percentX,
                  y: posData.percentY,
                  modeName: char.modeName,
                  innocentKills: gameStatus.innocentKills,
                  timer: gameStatus.resumeFrom,
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
