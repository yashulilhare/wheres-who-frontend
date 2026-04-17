import { Link } from "react-router-dom";
import styles from "./GameOver.module.css";
import getDuration from "@/utils/getDuration";

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

  const duration = getDuration(timerScore);
  return (
    <div className={styles.card}>
      <div>
        <h2 className={styles.cardHeading}>Game Over</h2>
        <p className={styles.cardInfo}>{username}</p>
      </div>
      <ul className={styles.gameInfo}>
        <li>
          <span className={styles.gameData}>Duration:</span>{" "}
          <span className={styles.dataValue}>{duration}</span>
        </li>
        <li>
          <span className={styles.gameData}>Innocent Kills:</span>
          <span className={styles.dataValue}>{innocentKills}</span>
        </li>
        <li>
          <span className={styles.gameData}>Universe:</span>{" "}
          <span className={styles.dataValue}>{modeName}</span>
        </li>
      </ul>
      <p className={styles.message}>{message}</p>
      <Link to={`/playground/:${modeName}`} className={styles.navButton}>
        Play Again
      </Link>
    </div>
  );
};

export default GameOverCard;
