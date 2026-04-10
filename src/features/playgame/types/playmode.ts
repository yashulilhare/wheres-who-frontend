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
  found: boolean;
}

interface GameStatusData {
  characters: CharacterStatus[];
  resumeFrom: number;
  innocentKills: number;
}

export type { CharacterInfo, GameStatusData };
