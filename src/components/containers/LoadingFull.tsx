import styles from "./LoadingFull.module.css";

// this component shows Loading state covering full screen - used between page loads
const LoadingFull = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.loader}></h1>
    </div>
  );
};

export default LoadingFull;
