import styles from "./Leaderboard.module.css";
import desertBG from "@/styles/desert-background.module.css";

import { api } from "@/lib/api";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModeLeaderboard from "./ModeLeaderboard";

import type { LeaderboardResponse } from "@/types/pages-types";

const Leaderboard = () => {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return;
    }
    const controller = new AbortController();

    const loadLeaderboard = async () => {
      const leaderboardUrl = `${import.meta.env.VITE_API_BASE_URL}/leaderboard`;
      const bearerToken = `Bearer ${token}`;

      try {
        const res = await api(leaderboardUrl, {
          method: "GET",
          headers: {
            Authorization: bearerToken,
          },
          signal: controller.signal,
        });

        if (!res.ok || res.status >= 400) {
          return console.error(res.statusText);
        }
        const data = (await res.json()) as LeaderboardResponse;
        setData(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadLeaderboard();

    return () => {
      controller.abort();
    };
  }, []);

  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;
  return (
    <main className={`${desertBG.main} ${styles.main}`}>
      <div className={styles.headingSection}>
        <h1 className={styles.mainHeading}>Game Leaderboard</h1>
        {userObj && userObj.username && <h2>Hello, {userObj.username}</h2>}
      </div>
      {data && (
        <div className={styles.cardContainer}>
          {data.map((modeRank) => {
            return (
              <ModeLeaderboard
                key={modeRank.id}
                leaderboard={modeRank}
                topRank={modeRank.userRank}
              />
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Leaderboard;
