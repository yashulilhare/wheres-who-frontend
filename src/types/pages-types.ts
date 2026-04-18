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
  userRank: UserTopRank | null;
}

type LeaderboardResponse = ModeLeaderboardData[];

export type { ModeLeaderboardData, UserTopRank, LeaderboardResponse };
