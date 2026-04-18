import styles from "./Leaderboard.module.css";
import desertBG from "@/styles/desert-background.module.css";

import { api } from "@/lib/api";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModeLeaderboard from "./ModeLeaderboard";

import type { LeaderboardResponse } from "@/types/pages-types";

const Leaderboard = () => {
  const [loading, setIsLoading] = useState(false);
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
        setIsLoading(false);
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
  return (
    <main className={`${desertBG.main} ${styles.main}`}>
      <h1>Leaderboard</h1>
      {data && (
        <div>
          {data.leaderboard.map((modeRank, index) => {
            return (
              <ModeLeaderboard
                key={modeRank.id}
                loading={loading}
                leaderboard={modeRank}
                topRank={data.userRanks[index]}
              />
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Leaderboard;
