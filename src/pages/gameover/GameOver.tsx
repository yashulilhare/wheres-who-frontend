import styles from "./GameOver.module.css";
import { useSearchParams, Link } from "react-router-dom";

const GameOverCard = ({
  timerScore,
  innocentKills,
  username,
  modeName,
}: {
  timerScore: number;
  innocentKills: number;
  username: string;
  modeName: string;
}) => {
  const message =
    timerScore < 15
      ? "Very well done! you were really fast in this one!"
      : timerScore < 30
        ? `Good job! You did it under 30 seconds.`
        : "That took a while...  but you did it.";
        
  return (
    <div className={styles.gameoverCard}>
      <div>
        <h2>Game Over</h2>
        <p>{username}</p>
      </div>
      <ul>
        <li>Duration: {timerScore}</li>
        <li>Innocent Kills: {innocentKills}</li>
        <li>Universe: {modeName}</li>
      </ul>
      <p className={styles.message}>{message}</p>
      <Link to={`/playgame:${modeName}`}></Link>
    </div>
  );
};

const LeaderboardCard = () => {
  return <div className={styles.leaderbaordCard}></div>;
};

const GameOver = () => {
  const [searchParams] = useSearchParams();

  const timerScore = searchParams.get("timerScore");
  const innocentKills = searchParams.get("incKills");
  const username = searchParams.get("username");
  const modeName = searchParams.get("modeName");

  if (timerScore && innocentKills && username && modeName) {
    const scoreNumber = parseInt(timerScore);
    const killsNumber = parseInt(innocentKills);
    return (
      <main className={styles.main}>
        <GameOverCard
          timerScore={scoreNumber}
          innocentKills={killsNumber}
          username={username}
          modeName={modeName}
        />
        <LeaderboardCard />
      </main>
    );
  } else return null;
};

export default GameOver;
