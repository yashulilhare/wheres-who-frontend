// global api
export async function api(url: string, options: RequestInit = {}) {
  
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "omit",
  });
  return res;
}
