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
    setSelectedForm(authMode)
  };
  return (
    <main className={`${styles.main} ${backgroundStyles.main}`}>
      {selectedForm === "register" && <RegisterForm changeForm={changeForm}/>}
      {selectedForm === "login" && <LoginForm changeForm={changeForm}/>}
    </main>
  );
};

export default AuthPage;
