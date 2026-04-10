import { useParams } from "react-router";
import { PlayMode } from "@/features/playgame";

import { modeList } from "@/data/mode-data";
import { useMemo } from "react";
import styles from "./PlayGround.module.css";
import SpaceBar from "@/components/partials/SpaceBar";

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
      <SpaceBar borderBottom={true}/>
      <PlayMode mode={mode || "undrcity"} modeData={modeData || null} />
      <SpaceBar borderTop={true}/>
    </main>
  );
};

export default PlayGround;
