import type { CharacterInfo } from "@/features/playgame";

const mockData = [
  {
    id: "41b7e6ee-3e89-4c20-81be-bc12a5c4f693",
    name: "Nightcrawler - from X-men",
    imageCode: 1,
    xposition: 83.33,
    yposition: 20.43,
    modeId: 13,
    modeName: "undrcity",
  },
  {
    id: "0a7bd923-ab52-4bde-b95f-65b32836aabc",
    name: "Bubble head nurse",
    imageCode: 2,
    xposition: 46.46,
    yposition: 43.47,
    modeId: 13,
    modeName: "undrcity",
  },
  {
    id: "71d8311d-f987-4f52-a6c4-3c3b30512b47",
    name: "Storyteller Chef",
    imageCode: 3,
    xposition: 5,
    yposition: 87.56,
    modeId: 13,
    modeName: "undrcity",
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
          modeName:m.modeName
        };
      });
      resolve(charData);
    }, 5000);
  });

  return res;
};

export { getGameData };
