import { createContext, useContext, useMemo, useState } from 'react';
import {
  getSession,
  signIn as authSignIn,
  signOut as authSignOut,
  signUp as authSignUp,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSession());

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signUp: (credentials) => {
        const result = authSignUp(credentials);
        if (result.success) {
          setUser(result.user);
        }
        return result;
      },
      signIn: (credentials) => {
        const result = authSignIn(credentials);
        if (result.success) {
          setUser(result.user);
        }
        return result;
      },
      signOut: () => {
        authSignOut();
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
