import Mode from "@/data/mode-data";
import styles from "./PlayMode.module.css";

interface PlayModeProps {
  modeData: Mode | null;
}

const PlayMode = ({ modeData }: PlayModeProps) => {
  return (
    <>
      <img
        src={modeData?.modeImageUrl}
        alt={modeData?.description}
        className={styles.img}
      />
    </>
  );
};

export default PlayMode;
