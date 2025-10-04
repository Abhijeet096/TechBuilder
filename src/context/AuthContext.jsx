import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { mockAuthApi } from '../services/mockApi';
import { config } from '../config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('awb_user');
    return cached ? JSON.parse(cached) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('awb_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('awb_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (config.apiBaseUrl) {
        const res = await fetch(`${config.apiBaseUrl}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        localStorage.setItem('awb_token', data.token);
        setUser(data.user);
      } else {
        const loggedIn = await mockAuthApi.login({ email, password });
        setUser(loggedIn);
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      if (config.apiBaseUrl) {
        const res = await fetch(`${config.apiBaseUrl}/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Signup failed');
        localStorage.setItem('awb_token', data.token);
        setUser(data.user);
      } else {
        const registered = await mockAuthApi.signup({ name, email, password });
        setUser(registered);
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('awb_token');
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    signup,
    logout,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
