interface AuthSuccessResponse {
  success: true;
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
  };
}

interface AuthFailedResponse {
  success: false;
  message: string;
  error: {
    code: "INVALID_TOKEN" | string;
  };
}

// checks if jwt token is valid or not
type AuthState = "PENDING" | "VALID" | "INVALID";
type AuthError = string;
type AuthResponse = AuthSuccessResponse | AuthFailedResponse;

interface MainOutletContext {
  soundToggle: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export type {AuthResponse, MainOutletContext, AuthError, AuthState}