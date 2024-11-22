import { FC, ReactNode, createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import config from "src/config";

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: ({ username, email, name, password }: Signup) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: "INITIALIZE";
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type LoginAction = {
  type: "LOGIN";
  payload: {
    user: User;
  };
};

type LogoutAction = {
  type: "LOGOUT";
};

type Action = InitializeAction | LoginAction | LogoutAction;

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    localStorage.removeItem("accessToken");
  }
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "INITIALIZE": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const initialize = async (): Promise<void> => {
    try {
      const accessToken = window.localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }
      const res = await fetch(`${config.apiUrl}/user/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data: User = await res.json();
      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthenticated: true,
          user: data,
        },
      });
    } catch (err) {
      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const res = await fetch(`${config.apiUrl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      return Promise.reject(data);
    }
    setSession(data.access_token);
    await initialize();
  };

  const logout = async (): Promise<void> => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  const signup = async ({
    name,
    username,
    email,
    password,
  }: Signup): Promise<void> => {
    const res = await fetch(`${config.apiUrl}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        password_confirmation: password,
      }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      return Promise.reject(data);
    }
    setSession(data.access_token);
    await initialize();
  };

  const resetPassword = async (email: string): Promise<void> => {
    console.log({ email });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        signup,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
