
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
        const parsedUser = JSON.parse(storedUser);
        setAuthState({
          user: parsedUser,
          loading: false
        });
        
        // Set up Supabase auth session when stored user exists
        const setupAuthSession = async () => {
          try {
            console.log('Setting up Supabase session for stored user');
            // Since we're using a mock auth system, we need to manually sign in to Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
              email: ADMIN_EMAIL,
              password: ADMIN_PASSWORD,
            });
            
            if (error) {
              console.error('Error setting up Supabase session:', error);
              // Don't invalidate the user session if Supabase auth fails
              // Just log the error for debugging
            } else {
              console.log('Supabase session established successfully:', data.session);
            }
          } catch (e) {
            console.error('Failed to set up Supabase session:', e);
          }
        };
        
        setupAuthSession();
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
      try {
        console.log('Attempting Supabase authentication');
        // Authenticate with Supabase as well
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          console.error('Supabase auth error:', error);
          
          // Special case for demo: If Supabase auth fails but credentials match our hardcoded ones,
          // we'll still allow login but with a warning
          console.log('Using fallback authentication for demo');
          toast.warning("Backend authentication failed, using demo mode");
          
          const user: User = { email, isAdmin: true };
          localStorage.setItem('spacehub_user', JSON.stringify(user));
          setAuthState({ user, loading: false });
          return true;
        }
        
        console.log('Supabase auth successful:', data);
        
        const user: User = { email, isAdmin: true };
        localStorage.setItem('spacehub_user', JSON.stringify(user));
        setAuthState({ user, loading: false });
        return true;
      } catch (e) {
        console.error('Login error:', e);
        return false;
      }
    }
    return false;
  };

  const logout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      console.log('Signed out from Supabase');
    } catch (e) {
      console.error('Error signing out from Supabase:', e);
    }
    
    localStorage.removeItem('spacehub_user');
    setAuthState({ user: null, loading: false });
    console.log('User logged out');
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
