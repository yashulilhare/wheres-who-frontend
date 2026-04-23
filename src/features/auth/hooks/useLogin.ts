import { useState } from "react";
import loginUser from "../api/login";
import { useNavigate } from "react-router";

import type { AuthData } from "../types/form-types";
import type { ApiAuthResponse } from "../types/api-types";

interface LoginError {
  message?: string;
}

const useLogin = (
  setToken: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (data: AuthData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await loginUser(data);

      if (!res.ok || res.status >= 400) {
        const errorData = (await res.json()) as LoginError;
        setError(errorData);
        return;
      }

      const successData = (await res.json()) as ApiAuthResponse;
      console.log(successData);

      localStorage.setItem("token", successData.token);
      localStorage.setItem("user", JSON.stringify(successData.user));
      if (successData.token) {
        setToken(successData.token);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError({ message: "Network connection lost" } as LoginError);
    }
  };

  return { loading, error, handleLogin };
};

export default useLogin;
