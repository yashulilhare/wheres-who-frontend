import { api } from "@/lib/api";
import { useEffect, useState } from "react";

import type {
  AuthResponse,
  AuthError,
  AuthState,
} from "@/types/main-outlet-types";

const useAuthChecker = () => {
  const token = localStorage.getItem("token");
  const haveToken = token ? "PENDING" : "INVALID";
  const [authState, setAuthState] = useState<AuthState>(haveToken);
  const [authError, setAuthError] = useState<AuthError | null>(null);

  useEffect(() => {
    if (!token) {
      setAuthState("INVALID");
      return;
    }
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const initAuthUrl = `${baseUrl}/me`;
    const bearerToken = `Bearer ${token}`;
    const controller = new AbortController();

    // if there is no token then do not verify the token
    const authCheck = async () => {
      try {
        const res = await api(initAuthUrl, {
          method: "POST",
          headers: {
            Authorization: bearerToken,
          },
          signal: controller.signal,
        });
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const resData = (await res.json()) as AuthResponse;

          if (!res.ok || res.status >= 400) {
            console.log("this was <=400");
            console.error(resData);
            console.warn(`Server responded with status: ${res.status}`);
          }
          if (!resData.success) {
            setAuthError(
              resData.error.code === "INVALID_TOKEN"
                ? resData.message
                : "Something went wrong",
            );
            setAuthState("INVALID");
            return;
          }

          if (resData.success) {
            console.log("so is it success?");
            console.log(resData);
            const userString = JSON.stringify(resData.user);
            localStorage.setItem("token", resData.token);
            localStorage.setItem("user", userString);
            setAuthState("VALID");
            setAuthError(null);
          }
        } else {
          console.log("got this one no success ");
          const textError = await res.text();
          throw new Error(
            `Expected JSON, but received HTML/Text. Server says: ${textError.substring(0, 100)}...`,
          );
        }
      } catch (err) {
        console.log("got this one in catch");
        console.error(err);
        setAuthState("INVALID");
        setAuthError("Something went wrong");
      }
    };
    authCheck();
    return () => {
      controller.abort();
    };
  }, []);
  return { authState, authError };
};
export default useAuthChecker;
