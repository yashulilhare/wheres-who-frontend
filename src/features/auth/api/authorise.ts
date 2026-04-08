import { api } from "@/lib/api";

import type { AuthData } from "../types/form-types";

export const authUser = async (data: AuthData) => {
  const url = import.meta.env.VITE_API_AUTH_URL;
  const res = await api(url, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (!res.ok) throw resData;

  return { ...resData };
};
