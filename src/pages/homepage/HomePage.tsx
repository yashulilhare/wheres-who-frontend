"use strict";

import backgroundStyles from "@/styles/desert-background.module.css";
import styles from "./HomePage.module.css";

import ModeCardContainer from "@/components/containers/ModeCardContainer";

const HomePage = () => {
  return (
    <main className={`${backgroundStyles.main} ${styles.main}`}>
      <h1 className={styles.logoHeading}>Where's Who?</h1>
      <p className={styles.infoPara}>
        Some person and some animals have committed deadly crimes and your job
        is to hunt them down and shot them on the spot. The quicker you shot all
        the criminals with minimal innocent kills, the better you are counted.{" "}
        <br />
        Select the universe to start your duty.
      </p>

      <ModeCardContainer />
    </main>
  );
};

export default HomePage;
