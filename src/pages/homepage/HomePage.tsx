"use strict";

import backgroundStyles from "@/styles/desert-background.module.css";
import styles from "./HomePage.module.css";

import ModeCardContainer from "@/components/containers/ModeCardContainer";

const HomePage = () => {
  return (
    <main className={`${backgroundStyles.main} ${styles.main}`}>
      <h1 className={styles.logoHeading}>Where's Who?</h1>
      <p className={styles.infoPara}>
        There are people and animals have committed deadly crimes and gone
        hidden in different universes. Your job is to hunt them down and shot
        them on the spot as quick as you can. The quicker you shot all the
        criminals assigned to you with minimal innocent kills, the better you
        are counted. <br />
        Select the universe to start your duty.
      </p>

      <ModeCardContainer />
    </main>
  );
};
export default HomePage;
