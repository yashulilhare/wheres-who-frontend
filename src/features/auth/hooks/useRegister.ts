import { useState } from "react";
import register from "../api/register";

import type { AuthData } from "../types/form-types";

// ValidationError is validationResult error thrown from express-validator module on sever
interface ValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

interface ApiRegisterResponse {
  message: string;
  token: string;
  user: { id: string; username: string };
}

interface ApiError {
  message?: string;
  messageArray?: ValidationError[];
}

const useRegister = () => {
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setIsLoading] = useState(false);

  const handleRegister = async (data: AuthData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await register(data);

      if (!res.ok || res.status >= 400) {
        const errorData = await res.json();
        setError(errorData as ApiError);
        return;
      }
      const resData = (await res.json()) as ApiRegisterResponse;

      localStorage.setItem("token", resData.token);
      localStorage.setItem("user", JSON.stringify(resData.user));

      console.log(resData);
    } catch (err) {
      console.error(err);
      setError({ message: "network connection lost;" } as ApiError);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegister, error, loading };
};

export default useRegister;
