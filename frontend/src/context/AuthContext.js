import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

// Constants for localStorage keys and error messages
const USER_STORAGE_KEY = 'user';
const AUTH_TOKEN_KEY = 'authToken';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in on mount
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem(USER_STORAGE_KEY);
        const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
        
        if (savedUser && authToken) {
          setUser(JSON.parse(savedUser));
          // Only redirect to dashboard if we're on login or register page
          const publicPaths = ['/', '/login', '/register'];
          if (publicPaths.includes(location.pathname)) {
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear potentially corrupted data
        localStorage.removeItem(USER_STORAGE_KEY);
        localStorage.removeItem(AUTH_TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [navigate, location]);

  const login = async ({ email, password }) => {
    try {
      setError(null);
      setLoading(true);
      // For demo purposes using mock credentials
      // In production, replace with actual API call
      if (email === "test@example.com" && password === "password123") {
        const userData = {
          email,
          name: 'Test User',
          role: 'user',
          id: '123'
        };
        const mockToken = 'mock-jwt-token';
        
        // Save both user data and token
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
        
        setUser(userData);
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
        return userData;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      // Basic validation
      if (!userData.email || !userData.password) {
        throw new Error('Email and password are required');
      }

      if (userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // For demo purposes, simulate successful registration
      // Replace with your actual API call in production
      const mockUser = {
        email: userData.email,
        name: userData.name || 'New User',
        role: 'user',
        id: Date.now().toString()
      };
      const mockToken = 'mock-jwt-token';

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save both user data and token
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
      
      setUser(mockUser);
      navigate('/dashboard', { replace: true });
      return mockUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates) => {
    try {
      setError(null);
      setLoading(true);
      
      // In production, make API call to update user data
      const updatedUser = { ...user, ...updates };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return updatedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    updateUser,
    isAuthenticated: !!user,
  };

  if (loading) {
    // You might want to replace this with a proper loading component
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
