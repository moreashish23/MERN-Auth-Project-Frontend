export interface AuthState {
  user: null | {
    email: string;
    verified: boolean;
  };
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}