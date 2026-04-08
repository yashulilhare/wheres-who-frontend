import styles from "./AuthPage.module.css";
import backgroundStyles from "@/styles/desert-background.module.css";
import AuthForm from "@/features/auth/components/AuthForm";

const AuthPage = () => {
  return (
    <main className={`${styles.main} ${backgroundStyles.main}`}>
      <p className={styles.instructions}>
        Wait! Wait! You need to have an account before moving forward. <br />
        Already have an account? Fill up your current credentials. <br />
        OR fill up with new data to create a new account.
      </p>
      <AuthForm />
    </main>
  );
};

export default AuthPage;
