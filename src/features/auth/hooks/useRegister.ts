import { useState } from "react";
import { useNavigate } from "react-router-dom";
import register from "../api/register";

import type { AuthData } from "../types/form-types";
import type { ApiAuthResponse } from "../types/api-types";

// ValidationError is validationResult error thrown from express-validator module on sever
interface ValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

interface ApiError {
  message?: string;
  messageArray?: ValidationError[];
}

const useRegister = (
  setToken: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      const resData = (await res.json()) as ApiAuthResponse;

      localStorage.setItem("token", resData.token);
      localStorage.setItem("user", JSON.stringify(resData.user));

      if (resData.token) {
        setToken(resData.token);
        navigate("/");
      }
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
