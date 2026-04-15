interface CharacterInfo {
  id: string;
  name?: string;
  imageCode: number;
  modeId: number;
  modeName: string;
  found: boolean;
}

interface CharacterStatus {
  id: string;
  name: string;
  modeName: string;
  imageCode: number;
  found: boolean;
}

interface GameStatusData {
  characters: CharacterStatus[];
  resumeFrom: number;
  innocentKills: number;
}

interface SelectCharData {
  x: number;
  y: number;
  percentX: number;
  percentY: number;
}

interface GameCharacterData {
  id: string;
  name: string;
  imageCode: number;
  modeId: number;
  found: boolean;
}

// starting game response data
interface StartGameData {
  token: string;
  user: {
    id: string;
    username: string;
    iat: string;
    exp: string;
  };
  gameData: {
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
  };
}

interface StartGameError {
  message: string;
}

export type {
  GameCharacterData,
  CharacterInfo,
  GameStatusData,
  SelectCharData,
  CharacterStatus,
  StartGameData,
  StartGameError,
};
