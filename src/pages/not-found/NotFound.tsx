import styles from "./NotFound.module.css";
import sadIcon from "./../../assets/icons/sad-face.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className={styles.main}>
      <img src={sadIcon} alt="" />
      <h1>404</h1>
      <p className={styles.notFound}>Page not found</p>
      <p className={styles.message}>
        The page you are looking for doesn't exist or some an other error
        occurred. <br />
        Go back or <Link to={'/'}>Click here to go to homepage</Link>
      </p>
    </main>
  );
};

export default NotFound;
