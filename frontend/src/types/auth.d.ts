interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  isInitialized: boolean;
  isAuthenticated: boolean;
}

interface Action {
  type: string;
  payload: {
    user: User | null;
    isAuthenticated?: boolean;
    isInitialized?: boolean;
  };
}

interface Signup {
  name: string;
  username: string;
  email: string;
  password: string;
}
