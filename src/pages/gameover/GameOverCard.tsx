import { Link } from "react-router-dom";
import styles from "./GameOver.module.css";

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
      <Link to={`/playground:${modeName}`}>Play Again</Link>
    </div>
  );
};

export default GameOverCard;
