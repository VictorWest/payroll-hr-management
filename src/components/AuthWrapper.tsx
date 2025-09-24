import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import RoleBasedAppLayout from './RoleBasedAppLayout';
import { toast } from '@/components/ui/use-toast';

type AuthView = 'login' | 'register';

const AuthWrapper: React.FC = () => {
  const { user, login, isAuthenticated, loading } = useAuth();
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const handleLogin = async (email: string, password: string) => {
    try {
      const success = await login(email, password);
      if (success) {
        toast({ title: 'Success', description: 'Logged in successfully!' });
      } else {
        toast({ 
          title: 'Error', 
          description: 'Invalid credentials. Try demo@example.com / demo123', 
          variant: 'destructive' 
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({ 
        title: 'Error', 
        description: 'Login failed. Try demo@example.com / demo123', 
        variant: 'destructive' 
      });
    }
  };

  const handleRegister = async (data: any) => {
    try {
      setCurrentView('login');
      toast({ 
        title: 'Success', 
        description: 'Registration successful! Please log in with your credentials.' 
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({ 
        title: 'Error', 
        description: 'Registration failed. Please try again.', 
        variant: 'destructive' 
      });
    }
  };

  const handleForgotPassword = () => {
    toast({ 
      title: 'Demo Mode', 
      description: 'Use demo@example.com / demo123 to login' 
    });
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-4">
            <span className="text-blue-600">MiPay</span>
            <span className="text-purple-600">Master</span>
          </div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  // If authenticated, show the main app
  if (isAuthenticated && user) {
    return <RoleBasedAppLayout />;
  }

  // Show login or registration screen
  if (currentView === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onNavigateToRegister={() => setCurrentView('register')}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  return (
    <RegistrationScreen
      onRegister={handleRegister}
      onNavigateToLogin={() => setCurrentView('login')}
    />
  );
};

export default AuthWrapper;