import styles from "./AuthPage.module.css";
import backgroundStyles from "@/styles/desert-background.module.css";
import RegisterForm from "@/features/auth/components/RegisterForm";
import LoginForm from "@/features/auth/components/LoginForm";
import { useState } from "react";

const AuthPage = () => {
  const [selectedForm, setSelectedForm] = useState<"login" | "register">(
    "login",
  );

  const changeForm = (authMode: "login" | "register") => {
    setSelectedForm(authMode);
  };
  return (
    <main className={`${styles.main} ${backgroundStyles.main}`}>
      {selectedForm === "register" && (
        <div className={styles.container}>
          <RegisterForm changeForm={changeForm} />
        </div>
      )}
      {selectedForm === "login" && (
        <div className={styles.container}>
          <LoginForm changeForm={changeForm} />
        </div>
      )}
    </main>
  );
};

export default AuthPage;
