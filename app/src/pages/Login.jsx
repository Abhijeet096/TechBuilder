import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/app'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Please fill all fields')
      return
    }
    try {
      setLoading(true)
      await login(form)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <Link to="/" className="text-xl font-bold text-indigo-600">SwiftSite</Link>
          <div className="mt-1 text-sm text-gray-600">Welcome back</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account? <Link className="text-indigo-600" to="/signup">Sign up</Link>
        </div>
        {loading && <Loader className="mt-4" />}
      </div>
    </div>
  )
}
