
interface ApiAuthResponse {
  message: string;
  token: string;
  user: { id: string; username: string };
}

export type {ApiAuthResponse}