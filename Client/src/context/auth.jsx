import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider to provide the context to the app
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  // Fetch data from localStorage if present
  useEffect(() => {
    const storedData = localStorage.getItem('auth');
    if (storedData) {
      const { user, token } = JSON.parse(storedData);
      setAuth({ user, token });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set Authorization header globally
    }
  }, []);

  // Store auth data in localStorage whenever it changes
  useEffect(() => {
    if (auth.token && auth.user) {
      localStorage.setItem('auth', JSON.stringify(auth));
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
