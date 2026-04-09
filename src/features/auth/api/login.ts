import { api } from "@/lib/api";
import type { AuthData } from "../types/form-types";

const loginUser = async (data: AuthData) => {
  const url = import.meta.env.VITE_API_LOGIN_URL;
  const res = await api(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return res;
};

export default loginUser;
