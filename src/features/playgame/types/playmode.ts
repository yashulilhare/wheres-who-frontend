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

export type { CharacterInfo, GameStatusData };
