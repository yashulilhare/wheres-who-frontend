import Mode from "@/data/mode-data";
import styles from "./PlayMode.module.css";

interface PlayModeProps {
  modeData: Mode | null;
  mode: string;
}

const PlayMode = ({ modeData }: PlayModeProps) => {
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = rect.width;
    const y = rect.height;

    console.log(`Clicked at X:${x}, y:${y}`);
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
