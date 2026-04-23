// import { useEffect, useState } from "react";
import styles from "./PopUp.module.css";
import { useState, useEffect } from "react";

type ActionCode = "START" | "FAILED" | "SUCCESS" | "GAMEEND";
const getTheme = (actionCode: ActionCode) => {
  switch (actionCode) {
    case "START":
      return "skyblue";
    case "FAILED":
      return "red";
    case "SUCCESS":
      return "green";
    case "GAMEEND":
      return "greenyellow";
  }
};

const PopUp = ({
  message,
  actionCode,
}: {
  message: string | null;
  actionCode: "START" | "FAILED" | "SUCCESS" | "GAMEEND";
}) => {
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemove(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  const color = getTheme(actionCode);

  if (!message || remove) return null;

  return (
    <div
      className={styles.box}
      style={{
        border: `2px solid ${color}`,
        color: color,
      }}
    >
      <p className={styles.message}>{message}</p>
      <p
        className={styles.slider}
        style={{
          border: `2px solid ${color}`,
        }}
      ></p>
    </div>
  );
};

export { PopUp };
