interface UserTopRank {
  modeId: number;
  duration: number;
  innocentKills: number;
  bestRank: number;
  username: string;
}

interface GameRecord {
  // id is game id
  id: string;
  duration: number;
  innocentKills: number;
  user: {
    username: string;
  };
}
interface ModeLeaderboardData {
  id: number;
  name: "undrcity" | "universe113" | "pokeverse";
  records: GameRecord[];
}

type LeaderboardResponse = {
  leaderboard: ModeLeaderboardData[];
  userRanks: UserTopRank[];
};

export type { ModeLeaderboardData, UserTopRank, LeaderboardResponse };
