import { Link } from "react-router-dom";
import styles from "./GameOver.module.css";
import type { GameRecord } from "@/features/playgame/types/playmode";
import getDuration from "@/utils/getDuration";

const LeaderboardCard = ({
  topFive,
  modeName,
}: {
  topFive: GameRecord[];
  modeName: string;
}) => {
  if (topFive.length === 0) {
    return null;
  }
  return (
    <div className={styles.card}>
      <div>
        <h2 className={styles.cardHeading}>Leaderboard</h2>
        <p className={styles.cardInfo}>Top Score for {modeName}</p>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Duration</th>
            <th>Innocent Kills</th>
          </tr>
        </thead>
        <tbody>
          {topFive.map((record, index) => {
            const duration = getDuration(record.duration);
            return (
              <tr key={record.id}>
                <td className={styles.rankIndex}>{index + 1}</td>
                <td>{record.user.username}</td>
                <td>{duration}</td>
                <td>{record.innocentKills}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to={"/"} className={styles.navButton}>
        Select Mode
      </Link>
    </div>
  );
};

export default LeaderboardCard;
