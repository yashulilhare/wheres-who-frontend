import Mode from "@/data/mode-data";
import styles from "./PlayMode.module.css";

interface PlayModeProps {
  modeData: Mode | null;
  mode: string;
}

const mockData = [
  {
    id: "41b7e6ee-3e89-4c20-81be-bc12a5c4f693",
    name: "Nightcrawler - from X-men",
    imageCode: 1,
    xposition: 83.33,
    yposition: 20.43,
    modeId: 13,
  },
  {
    id: "0a7bd923-ab52-4bde-b95f-65b32836aabc",
    name: "Bubble head nurse",
    imageCode: 2,
    xposition: 46.46,
    yposition: 43.47,
    modeId: 13,
  },
  {
    id: "71d8311d-f987-4f52-a6c4-3c3b30512b47",
    name: "Storyteller Chef",
    imageCode: 3,
    xposition: 5,
    yposition: 87.56,
    modeId: 13,
  },
];

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

const PlayMode = ({ modeData }: PlayModeProps) => {
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    // const img = e.currentTarget;
    const rect = e.currentTarget.getBoundingClientRect();

    const currentWidth = rect.width;
    const currentHeight = rect.height;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const percentX = (clickX / currentWidth) * 100;
    const percentY = (clickY / currentHeight) * 100;

    const userValue = prompt("select your result from 1 t  3");

    const assumed = mockData.find((item) => {
      const num = Number.parseInt(userValue || "mm");

      return item.imageCode === num;
    });

    if (assumed) {
      console.log(assumed);
      const res = isMatch(
        { x: assumed.xposition, y: assumed.yposition },
        { x: percentX, y: percentY },
      );
      alert(res);
    }
  };

  return (
    <>
      <img
        src={modeData?.modeImageUrl}
        alt={modeData?.description}
        className={styles.img}
        onClick={handleClick}
      />
    </>
  );
};

export default PlayMode;
