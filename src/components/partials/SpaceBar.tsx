import styles from "./SpaceBar.module.css";

interface SpaceBarProps {
  borderBottom?: boolean;
  borderTop?: boolean;
}

// this component is used as empty horizontal space with custom styling
const SpaceBar = ({ borderBottom, borderTop }: SpaceBarProps) => {
  return (
    <div
      className={`${styles.spacebar} ${borderBottom && styles.borderBottom} ${borderTop && styles.borderTop}`}
    ></div>
  );
};

export default SpaceBar;
