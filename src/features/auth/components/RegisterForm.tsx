import styles from "./AuthForm.module.css";

import { useState } from "react";
import useRegister from "../hooks/useRegister";
import type { AuthFormProps } from "../types/form-types";

interface AuthFormData {
  username: string;
  password: string;
}

const RegisterForm = ({ changeForm }: AuthFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>({
    username: "",
    password: "",
  });

  const { handleRegister, error } = useRegister();

  if (error) {
    console.log(error);
  }

  return (
    <>
      <p className={styles.instructions}>
        Wait! Wait! You need to register to the game so your score would be
        yours and safe. <br />
        Use the form below to Register.
      </p>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister({ ...formData });
        }}
      >
        {error && error.message && (
          <ul className={styles.errors}>
            <li>{error.message}</li>
          </ul>
        )}
        {error && error.messageArray && (
          <ul className={styles.errors}>
            {error.messageArray.map((message) => {
              return <li>{message.msg}</li>;
            })}
          </ul>
        )}

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
        <p className={styles.changeForm}>
          Already have an account?{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeForm("login");
            }}
          >
            Login here
          </a>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
