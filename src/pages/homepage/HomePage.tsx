import backgroundStyles from "@/styles/desert-background.module.css";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

import ModeCardContainer from "@/components/containers/ModeCardContainer";

const HomePage = () => {
  const token = localStorage.getItem("token");
  return (
    <main className={`${backgroundStyles.main} ${styles.main}`}>
      <div className={styles.logoContainer}>
        <img
          src="src/assets/icons/gun.png"
          alt="shotgun icon"
          aria-hidden
          className={styles.shotgun}
        />
        <h1 className={styles.logoHeading}>Shot'Em</h1>
      </div>

      <p className={styles.infoPara}>
        <span className={styles.info}>Info:</span>
        <br />
        There are people and animals have committed deadly crimes and gone
        hidden in different universes. Your job is to hunt them down and shot
        them on the spot as quick as you can. The quicker you shot all the
        criminals assigned to you with minimal innocent kills, the better you
        are counted. <br />
        Select the universe to start your duty.
        <br />
        {!token && (
          <span className={styles.authPara}>
            Wait! looks like you are not logged in.{" "}
            <Link to={"/auth"}>Click here to Register/Login</Link>
          </span>
        )}
      </p>
      <ModeCardContainer />
    </main>
  );
};

export default HomePage;
