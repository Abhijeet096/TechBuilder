import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password) {
      setError('Please fill all fields')
      return
    }
    try {
      setLoading(true)
      await signup(form)
      navigate('/app', { replace: true })
    } catch (err) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <Link to="/" className="text-xl font-bold text-indigo-600">SwiftSite</Link>
          <div className="mt-1 text-sm text-gray-600">Create your account</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link className="text-indigo-600" to="/login">Log in</Link>
        </div>
        {loading && <Loader className="mt-4" />}
      </div>
    </div>
  )
}
