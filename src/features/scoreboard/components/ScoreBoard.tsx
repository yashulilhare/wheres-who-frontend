import { useContext } from "react";
import styles from "./ScoreBoard.module.css";
import type { GameStatusData } from "@/features/playgame/types/playmode";
import TimerContext from "@/features/playgame/hooks/timerContext";

interface ImageCardProps {
  imageCode: number;
  name: string;
  modeName: string;
  found: boolean;
}
const ImageCard = ({ name, imageCode, modeName, found }: ImageCardProps) => {
  return (
    <div className={styles.imgCard}>
      {found && <div className={styles.imgOverLayer}></div>}
      <img
        src={`/characters/${modeName}/${imageCode}.png`}
        alt={`Image for character ${name}`}
      />
    </div>
  );
};

const InnocentKills = ({ innocentKills }: { innocentKills: number }) => {
  return (
    <div className={styles.scoreContainer}>
      <p className={styles.cardTitle}>Innocent Kills</p>
      <p className={styles.score}>{innocentKills}</p>
    </div>
  );
};

// interface TimerProps {
//   resumeFrom: number;
// }
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const s = sec.toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const Timer = () => {
  const timer = useContext<number>(TimerContext);
  return (
    <div className={styles.scoreContainer}>
      <p className={styles.cardTitle}>Score</p>
      <p className={styles.score}>{formatTime(timer)}</p>
    </div>
  );
};

// interface CharacterData {
//   id: string;
//   imageCode: number;
//   name: string;
//   modeName: string;
//   found: boolean;
// }
interface ScoreBoardProps {
  gameStatus: GameStatusData;
}
const ScoreBoard = ({ gameStatus }: ScoreBoardProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.imageContainer}>
        {gameStatus.characters.map((char) => {
          return (
            <ImageCard
              name={char.name}
              modeName={char.modeName}
              imageCode={char.imageCode}
              found={char.found}
              key={char.id}
            />
          );
        })}
      </div>
      <InnocentKills innocentKills={gameStatus.innocentKills} />
      <Timer />
    </section>
  );
};

export { ScoreBoard };
