
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    // In a real app, this would make an API call to validate credentials
    // For now, we'll just store the user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Register function
  const register = (userData) => {
    // In a real app, this would make an API call to create a new user
    // For now, we'll just store the user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
