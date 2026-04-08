import styles from "./AuthForm.module.css";

import { useState } from "react";
import useRegister from "../hooks/useRegister";

interface AuthFormData {
  username: string;
  password: string;
}

const AuthForm = () => {
  const [formData, setFormData] = useState<AuthFormData>({
    username: "",
    password: "",
  });

  const { handleRegister, error } = useRegister();

  if (error) {
    console.log(error);
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister({ ...formData });
      }}
    >
      {error && error.message && (<ul className={styles.errors}></ul>)}
      {error && error.messageArray && (<ul className={styles.errors}></ul>)}
      
      <div className={styles.inputContainer}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={formData.username}
          name="username"
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="new-password"
          name="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default AuthForm;
