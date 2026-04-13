import type { CharacterStatus, CharacterInfo } from "@/features/playgame";

const mockData = [
  {
    id: "41b7e6ee-3e89-4c20-81be-bc12a5c4f693",
    name: "Nightcrawler - from X-men",
    imageCode: 1,
    xposition: 83.33,
    yposition: 20.43,
    modeId: 13,
    modeName: "undrcity",
    found: false,
  },
  {
    id: "0a7bd923-ab52-4bde-b95f-65b32836aabc",
    name: "Bubble head nurse",
    imageCode: 2,
    xposition: 46.46,
    yposition: 43.47,
    modeId: 13,
    modeName: "undrcity",
    found: false,
  },
  {
    id: "71d8311d-f987-4f52-a6c4-3c3b30512b47",
    name: "Storyteller Chef",
    imageCode: 3,
    xposition: 5,
    yposition: 87.56,
    modeId: 13,
    modeName: "undrcity",
    found: true,
  },
];

const getGameData = async () => {
  const res = new Promise<CharacterInfo[]>((resolve) => {
    setTimeout(() => {
      const charData = mockData.map((m) => {
        return {
          id: m.id,
          name: m.name,
          imageCode: m.imageCode,
          modeId: m.modeId,
          modeName: m.modeName,
          found: m.found,
        };
      });
      resolve(charData);
    }, 5000);
  });

  return res;
};

interface Points {
  x: number;
  y: number;
}
const isMatch = (stored: Points, clicked: Points): boolean => {
  console.log(stored);
  console.log(clicked);
  const diffX = Math.abs(stored.x - clicked.x);
  const diffY = Math.abs(stored.y - clicked.y);
  console.log(diffX, diffY);

  if (diffX > 5 && diffY > 5) return false;
  else return true;
};
interface CheckData {
  x: number;
  y: number;
  charId: string;
  charName: string;
  modeName: string;
  innocentKills: number;
  timer: number;
}

interface ReturnData {
  validationResult: "correct" | "wrong" | "no-character";
  characters?: CharacterStatus[];
  innocentKills: number;
  resumeFrom: number;
}

const validateSelect = async (data: CheckData): Promise<ReturnData> => {
  const res = new Promise<ReturnData>((resolve) => {
    setTimeout(() => {
      const characterData = mockData.find((char) => char.id === data.charId);

      if (!characterData) {
        resolve({
          validationResult: "no-character",
          resumeFrom: data.timer,
          innocentKills: data.innocentKills,
        });
        return;
      }

      const match = isMatch(
        { x: characterData.xposition, y: characterData.yposition },
        { x: data.x, y: data.y },
      );

      if (match) {
        const charData = mockData.map((m) => {
          if (m.id === data.charId) {
            m.found = true;
            return {
              id: m.id,
              name: m.name,
              imageCode: m.imageCode,
              modeId: m.modeId,
              modeName: m.modeName,
              found: true,
            };
          } else return { ...m };
        });
        resolve({
          validationResult: "correct",
          characters: charData,
          resumeFrom: data.timer,
          innocentKills: data.innocentKills,
        });
      } else {
        resolve({
          validationResult: "wrong",
          innocentKills: data.innocentKills + 1,
          resumeFrom: data.timer,
        });
      }
    }, 2000);
  });
  return res;
};

export { getGameData, mockData, validateSelect };

export type { CheckData };
