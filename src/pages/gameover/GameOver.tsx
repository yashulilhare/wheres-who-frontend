import styles from "./GameOver.module.css";
import bgStyles from "@/styles/desert-background.module.css";
import LeaderboardCard from "./LeaderboardCard";
import GameOverCard from "./GameOverCard";
import type { AttemptSuccessResponse } from "@/features/playgame/types/playmode";

interface GameOverProps {
  innocentKills: number;
  modeName: string;
  data: AttemptSuccessResponse;
}

const GameOver = (props: GameOverProps) => {
  return (
    <div className={`${styles.main} ${bgStyles.main}`}>
      <GameOverCard
        timerScore={props.data.lastTimerScore}
        innocentKills={props.innocentKills}
        username={props.data.username}
        modeName={props.modeName}
      />
      <LeaderboardCard topFive={props.data.topFive} modeName={props.modeName} />
    </div>
  );
};

export default GameOver;
