import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import * as api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem('auth:user')
    if (raw) {
      try {
        setUser(JSON.parse(raw))
      } catch {
        localStorage.removeItem('auth:user')
      }
    }
    setLoading(false)
  }, [])

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    async login({ email, password }) {
      const result = await api.login({ email, password })
      setUser(result.user)
      localStorage.setItem('auth:user', JSON.stringify(result.user))
      return result.user
    },
    async signup({ name, email, password }) {
      const result = await api.signup({ name, email, password })
      setUser(result.user)
      localStorage.setItem('auth:user', JSON.stringify(result.user))
      return result.user
    },
    logout() {
      setUser(null)
      localStorage.removeItem('auth:user')
    },
  }), [user])

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-gray-100">
        <div className="animate-spin h-10 w-10 rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}
