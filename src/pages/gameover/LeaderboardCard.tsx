import { Link } from "react-router-dom";
import styles from "./GameOver.module.css";
import type { GameRecord } from "@/features/playgame/types/playmode";

const getDuration = (seconds: number) => {
  if (seconds <= 59) {
    return `${seconds} seconds`;
  } else if (seconds <= seconds * 60 - 1)
    return `${Math.round(seconds / 60)} minutes`;
  else {
    return `${Math.round(seconds / 60 / 60)} hour`;
  }
};

const LeaderboardCard = ({
  topFive,
  modeName,
}: {
  topFive: GameRecord[];
  modeName: string;
}) => {
  return (
    <div className={styles.leaderbaordCard}>
      <div>
        <h2>Leaderboard</h2>
        <p>Top Score for {modeName}</p>
      </div>
      <section className={styles.ranks}>
        <table>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Duration</th>
            <th>Innocent Kills</th>
          </tr>
          {topFive.map((record, index) => {
            const duration = getDuration(record.duration);
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{record.user.username}</td>
                <td>{duration}</td>
                <td>{record.innocentKills}</td>
              </tr>
            );
          })}
        </table>
      </section>
      <Link to={"/"}>Select Mode</Link>
    </div>
  );
};

export default LeaderboardCard;
