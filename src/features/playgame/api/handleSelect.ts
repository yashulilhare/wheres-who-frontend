import { api } from "@/lib/api";
import type { AttemptSentData } from "../types/playmode";

const handleAttempt = async (token:string, data: AttemptSentData) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const attemptUrl = `${baseUrl}/playgame/attempt`;

  const res = await api(attemptUrl, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(data),
  });
  return res;
};

export default handleAttempt;
