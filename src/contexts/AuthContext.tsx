
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real app, this would be handled by a proper backend
const ADMIN_EMAIL = 'admin@spacehub.com';
const ADMIN_PASSWORD = 'admin123';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true
  });

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('spacehub_user');
    if (storedUser) {
      try {
        setAuthState({
          user: JSON.parse(storedUser),
          loading: false
        });
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('spacehub_user');
        setAuthState({ user: null, loading: false });
      }
    } else {
      setAuthState({ user: null, loading: false });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple authentication for demo purposes
    // In a real app, this would call an API endpoint
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user: User = { email, isAdmin: true };
      localStorage.setItem('spacehub_user', JSON.stringify(user));
      setAuthState({ user, loading: false });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('spacehub_user');
    setAuthState({ user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
