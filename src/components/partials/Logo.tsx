import styles from "./Logo.module.css";
import gunImg from "./../../assets/icons/gun.png";

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <img
        src={gunImg}
        alt="shotgun icon"
        aria-hidden
        className={styles.shotgun}
      />
      <h1 className={styles.logoHeading}>Shot'Em</h1>
    </div>
  );
};

export default Logo;
