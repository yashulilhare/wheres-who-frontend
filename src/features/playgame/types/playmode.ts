interface SelectCharData {
  x: number;
  y: number;
  percentX: number;
  percentY: number;
}

interface CheckData {
  x: number;
  y: number;
  charId: string;
  charName: string;
  modeName: string;
  innocentKills: number;
  timer: number;
}
interface GameRecord {
  id: string;
  user: { username: string };
  innocentKills: number;
  duration: number;
}
interface GameCharacterData {
  id: string;
  name: string;
  imageCode: number;
  modeId: number;
  found: boolean;
}

interface GameData {
  // id is gameID
  id: string;
  userId: string;
  modeId: number;
  modeName: string;
  characterData: GameCharacterData[];
  gameState: "CONTINUE" | "COMPLETED";
  innocentKills: number;
  lastTimerScore: number;
  charactersFound: number;
  createdAt: string;
  updatedAt: string;
}

// starting-game response data
interface StartGameData {
  token: string;
  user: {
    id: string;
    username: string;
    iat: string;
    exp: string;
  };
  gameData: GameData;
}

interface StartGameError {
  message: string;
}
// attempt response data types

interface AttemptSentData {
  gameId: string;
  charId: string;
  modeId: number;
  charName: string;
  timerScore: number;
  x: number;
  y: number;
}

interface AttemptFailResponse {
  id: string;
  modeId: number;
  message: string;
  attemptResult: "FAILED";
  innocentKills: number;
  lastTimerScore: number;
}

interface AttemptSuccessResponse {
  id: string;
  modeId: number;
  lastTimerScore: number;
  message: string;
  attemptResult: "SUCCESS";
  characters: GameCharacterData[];
  gameState: "CONTINUE" | "COMPLETED";
  username: string;
  topFive: GameRecord[];
}

type AttemptResponse = AttemptFailResponse | AttemptSuccessResponse;
interface ApiSentError {
  message: string;
}

export type {
  GameCharacterData,
  SelectCharData,
  StartGameData,
  StartGameError,
  GameData,
  AttemptSentData,
  AttemptResponse,
  AttemptSuccessResponse,
  ApiSentError,
  GameRecord,
  CheckData,
};
