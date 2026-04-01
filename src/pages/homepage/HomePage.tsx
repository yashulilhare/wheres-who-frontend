"use strict";

import backgroundStyles from "@/styles/desert-background.module.css";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={`${backgroundStyles.main} ${styles.main}`}>
      <h1 className={styles.logoHeading}>Where's Who?</h1>
      <p className={styles.infoPara}>
        Choose an image below and clock will start.
      </p>
      <p className={styles.infoPara}>
        Your HUD wil display the timer and remaining characters to find.
      </p>
      <p className={styles.infoPara}>
        Find them as quickly as possible to earn a spot on the leaderboard.
      </p>
    </main>
  );
};

export default HomePage;
