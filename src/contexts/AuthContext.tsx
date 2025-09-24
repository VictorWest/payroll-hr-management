import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

export type UserRole = 'Super Admin' | 'HR' | 'Accountant';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  organizationName?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        // Check for stored demo user first
        const storedUser = localStorage.getItem('demoUser');
        if (storedUser && mounted) {
          setUser(JSON.parse(storedUser));
          setLoading(false);
          return;
        }

        // Try to get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user && mounted) {
          const userData = {
            id: session.user.id,
            email: session.user.email || 'user@example.com',
            role: 'HR' as UserRole,
            organizationName: 'Default Organization'
          };
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Handle demo login
      if (email === 'demo@example.com' && password === 'demo123') {
        const demoUser = {
          id: 'demo-user',
          email: 'demo@example.com',
          role: 'HR' as UserRole,
          organizationName: 'Demo Organization'
        };
        setUser(demoUser);
        localStorage.setItem('demoUser', JSON.stringify(demoUser));
        return true;
      }
      
      // Try Supabase authentication
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (authError) {
        console.error('Login error:', authError);
        return false;
      }

      if (authData.user) {
        localStorage.removeItem('demoUser');
        const userData = {
          id: authData.user.id,
          email: authData.user.email || email,
          role: 'HR' as UserRole,
          organizationName: 'Default Organization'
        };
        setUser(userData);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any): Promise<boolean> => {
    return true;
  };

  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('demoUser');
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};