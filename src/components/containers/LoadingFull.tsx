import styles from "./LoadingFull.module.css";

const LoadingFull = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.loader}></h1>
    </div>
  );
};

export default LoadingFull;
