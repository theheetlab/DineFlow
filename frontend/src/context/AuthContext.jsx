import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('dineflow_token');
    if (token) {
      authAPI.getMe()
        .then((res) => setAdmin(res.data))
        .catch(() => {
          localStorage.removeItem('dineflow_token');
          localStorage.removeItem('dineflow_admin');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    localStorage.setItem('dineflow_token', res.data.token);
    localStorage.setItem('dineflow_admin', JSON.stringify(res.data));
    setAdmin(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('dineflow_token');
    localStorage.removeItem('dineflow_admin');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};
