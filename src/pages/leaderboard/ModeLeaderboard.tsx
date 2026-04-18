import styles from "./Leaderboard.module.css";

import { Link } from "react-router-dom";

import type { ModeLeaderboardData, UserTopRank } from "@/types/pages-types";
interface ModeLeaderboardProps {
  leaderboard: ModeLeaderboardData;
  topRank: UserTopRank;
  loading: boolean;
}
const ModeLeaderboard = ({ leaderboard, topRank }: ModeLeaderboardProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTop}>
        <h2>{leaderboard.name}</h2>
        <Link to={`/playgame/:${leaderboard.name}`}>play mode</Link>
      </div>
      <div className={styles.topRanksContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Duration</th>
              <th>InnocentKills</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.records.map((record, index) => {
              return (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.user.username}</td>
                  <td>{record.duration}</td>
                  <td>{record.innocentKills}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className={styles.userTale}>
          <tbody>
            <tr>
              <td rowSpan={2}>Your Best</td>
              <td>Rank</td>
              <td>Duration</td>
              <td>InnocentKills</td>
            </tr>
            <tr>
              <td>{topRank.bestRank}</td>
              <td>{topRank.duration}</td>
              <td>{topRank.innocentKills}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};

export default ModeLeaderboard;
