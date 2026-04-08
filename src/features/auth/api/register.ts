import { api } from "@/lib/api";
import type { AuthData } from "../types/form-types";

const register = async (data: AuthData) => {
  const registerURL = import.meta.env.VITE_API_REGISTER_URL;
  const res = await api(registerURL, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

export default register;
