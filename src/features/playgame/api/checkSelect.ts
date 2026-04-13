import { api } from "@/lib/api";

const checkSelect = async (data: { x: number; y: number }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const checkUrl = `${baseUrl}/playgame/check`;
  try {
    const res = await api(checkUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resultData = await res.json();
    return resultData;
  } catch (err) {
    console.error(err);
  }
};

export default checkSelect;
