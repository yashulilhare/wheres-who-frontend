import { useParams } from "react-router";
import { PlayMode } from "@/features/playgame";

import { modeList } from "@/data/mode-data";
import { useMemo } from "react";
import styles from "./PlayGround.module.css";

const PlayGround = () => {
  const { mode } = useParams();

  const modeData = useMemo(() => {
    const data = modeList.find((m) => {
      const removeColon = mode?.slice(1);
      return m.pagePath === removeColon;
    });
    return data;
  }, [mode]);

  return (
    <main className={styles.main}>
      <PlayMode mode={mode || "undrcity"} modeData={modeData || null} />
    </main>
  );
};

export default PlayGround;
