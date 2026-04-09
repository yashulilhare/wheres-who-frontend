interface AuthData {
  username: string;
  password: string;
}

interface AuthFormProps {
  changeForm(authMode: "login" | "register"): void;
}

export type { AuthData, AuthFormProps };
