import { useState } from "react";
import loginUser from "../api/login";

import type { AuthData } from "../types/form-types";
import type { ApiAuthResponse } from "../types/api-types";

interface LoginError {
  message?: string;
}

const useLogin = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);

  const handleLogin = async (data: AuthData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await loginUser(data);

      if (!res.ok || res.status >= 400) {
        const errorData = (await res.json()) as LoginError;
        setError(errorData);
      }

      const successData = (await res.json()) as ApiAuthResponse;
      console.log(successData);

      localStorage.setItem("token", successData.token);
      localStorage.setItem("user", JSON.stringify(successData.user));
    } catch (err) {
      console.error(err);
      setError({ message: "Network connection lost" } as LoginError);
    }
  };

  return { loading, error, handleLogin };
};

export default useLogin;
