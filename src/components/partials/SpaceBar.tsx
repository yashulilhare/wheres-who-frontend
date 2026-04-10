import styles from "./SpaceBar.module.css";

interface SpaceBarProps {
  borderBottom?: boolean;
  borderTop?: boolean;
}

const SpaceBar = ({ borderBottom, borderTop }: SpaceBarProps) => {
  return (
    <div
      className={`${styles.spacebar} ${borderBottom && styles.borderBottom} ${borderTop && styles.borderTop}`}
    ></div>
  );
};

export default SpaceBar;
