import styles from "./GameOver.module.css";
import LeaderboardCard from "./LeaderboardCard";
import GameOverCard from "./GameOverCard";
import type { AttemptSuccessResponse } from "@/features/playgame/types/playmode";

interface GameOverProps {
  innocentKills: number;
  modeName: string;
  data: AttemptSuccessResponse;
  restartGame: () => void;
}

const GameOver = (props: GameOverProps) => {
  return (
    <div className={`${styles.main}`}>
      <h1 className={styles.logoHeading}>Where's Who?</h1>

      <div className={styles.container}>
        <GameOverCard
          timerScore={props.data.lastTimerScore}
          innocentKills={props.innocentKills}
          username={props.data.username}
          modeName={props.modeName}
          restartGame={props.restartGame}
        />
        <LeaderboardCard
          topFive={props.data.topFive}
          modeName={props.modeName}
        />
      </div>
    </div>
  );
};

export default GameOver;
