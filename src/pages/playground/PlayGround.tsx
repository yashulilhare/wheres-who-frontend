import { useParams } from "react-router";
import { PlayMode } from "@/features/playgame";

import { modeList } from "@/data/mode-data";
import { useMemo } from "react";
import styles from "./PlayGround.module.css";
import SpaceBar from "@/components/partials/SpaceBar";

const PlayGround = () => {
  const { mode } = useParams();

  const modeData = useMemo(() => {
    const removeColon = mode?.slice(1);
    const data = modeList.find((m) => {
      return m.pagePath === removeColon;
    });
    return data;
  }, [mode]);
  const removeColon = mode?.slice(1);

  return (
    <main className={styles.main}>
      <SpaceBar borderBottom={true} />
      <PlayMode mode={removeColon || "undrcity"} modeData={modeData || null} />
      <SpaceBar borderTop={true} />
    </main>
  );
};

export default PlayGround;
