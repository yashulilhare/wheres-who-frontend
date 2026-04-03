"use strict";

import styles from "./ModeCardContainer.module.css";
import ModeCard from "../cards/ModeCard";

import { modeList } from "@/data/mode-data";

const ModeCardContainer = () => {
  return (
    <section className={styles.container}>
      {modeList.map((mode) => {
        return (
          <ModeCard
            pageUrl={mode.pagePath}
            imageUrl={mode.imageUrl}
            pageName={mode.name}
            altText={mode.description}
          />
        );
      })}
    </section>
  );
};

export default ModeCardContainer;
