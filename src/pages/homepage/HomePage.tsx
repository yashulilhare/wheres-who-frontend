import backgroundStyles from "@/styles/desert-background.module.css";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

import ModeCardContainer from "@/components/containers/ModeCardContainer";
import Logo from "@/components/partials/Logo";

const HomePage = () => {
  const token = localStorage.getItem("token");
  return (
    <main className={`${backgroundStyles.main} ${styles.main}`}>
      <Logo />

      <p className={styles.infoPara}>
        <span className={styles.info}>Info:</span>
        <br />
        There are people and creatures who committed deadly crimes and went
        hidden in different universes. Your job is to hunt them down and shot
        them on the spot as quick as you can. The quicker you shot all the
        criminals assigned to you with minimal innocent kills, the better you
        are counted. <br />
        Select the universe to start your duty.
        <br />
        {!token && (
          <span className={styles.authPara}>
            But! looks like you are not ready to join the mission yet.{" "}
            <Link to={"/auth"}>
              Click here to register OR log in your account
            </Link>
          </span>
        )}
      </p>
      <ModeCardContainer />
    </main>
  );
};

export default HomePage;
