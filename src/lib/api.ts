"use strict";

// global api
export async function api(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  return res;
}
