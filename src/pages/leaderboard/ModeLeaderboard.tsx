import styles from "./Leaderboard.module.css";

import { Link } from "react-router-dom";
import getDuration from "@/utils/getDuration";

import type { ModeLeaderboardData, UserTopRank } from "@/types/pages-types";
interface ModeLeaderboardProps {
  leaderboard: ModeLeaderboardData;
  topRank: UserTopRank | null;
}
const ModeLeaderboard = ({ leaderboard, topRank }: ModeLeaderboardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <h2>{leaderboard.name}</h2>
        <Link to={`/playgame/:${leaderboard.name}`}>
          play {leaderboard.name}
        </Link>
      </div>
      <div className={styles.topRanksContainer}>
        {leaderboard.records.length === 0 && (
          <h3
            style={{
              textAlign: "center",
            }}
          >
            ---- No player had played this mode yet ----
          </h3>
        )}
        {leaderboard.records.length > 0 && (
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
                    <td>{getDuration(record.duration)}</td>
                    <td>{record.innocentKills}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {!topRank && (
          <h3 className={styles.noRecord}>
            ----- You haven't played this mode -----
          </h3>
        )}
        {topRank && (
          <table className={styles.userTable}>
            <tbody>
              <tr>
                <td rowSpan={2}>Your Best</td>
                <td>Rank</td>
                <td>Duration</td>
                <td>InnocentKills</td>
              </tr>
              <tr>
                <td>{topRank.bestRank}</td>
                <td>{getDuration(topRank.duration)}</td>
                <td>{topRank.innocentKills}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ModeLeaderboard;
