import { useState } from "react";
import styles from "./AuthForm.module.css";
import useLogin from "../hooks/useLogin";
import { useOutletContext } from "react-router-dom";

import type { MainOutletContext } from "@/types/main-outlet-types";
import type { AuthFormProps } from "../types/form-types";

interface LoginData {
  username: string;
  password: string;
}

const LoginForm = ({ changeForm }: AuthFormProps) => {
  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const { setToken } = useOutletContext<MainOutletContext>();

  const { error, handleLogin } = useLogin(setToken);

  return (
    <>
      <p className={styles.instructions}>
        Welcome back. Just one step before you can play the game. <br />
        Use the form below to Login.
      </p>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin({ ...formData });
        }}
      >
        {error && error.message && (
          <ul className={styles.errors}>
            <li>{error.message}</li>
          </ul>
        )}

        <div className={styles.inputContainer}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            name="username"
            autoComplete="current-username"
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
            autoComplete="current-password"
            name="password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </div>
        <button type="submit">Login</button>
        <p className={styles.changeForm}>
          Doesn't have an account?{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeForm("register");
            }}
          >
            Register here
          </a>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
