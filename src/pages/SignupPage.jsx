import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    const res = await signup(name, email, password);
    if (!res.ok) setError(res.error || 'Signup failed');
    else navigate('/dashboard');
  };

  return (
    <div>
      <Header />
      <main className="container-max py-16">
        <div className="max-w-md mx-auto card">
          <div className="card-body">
            <h1 className="text-xl font-semibold text-gray-900">Sign Up</h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input type="text" className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input type="password" className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              {error && <div className="text-sm text-red-600">{error}</div>}
              <button className="btn btn-primary w-full" disabled={loading}>
                {loading ? <Loader label="Creating account..." /> : 'Create account'}
              </button>
            </form>
            <div className="text-sm text-gray-600 mt-4">
              Already have an account? <Link to="/login" className="text-primary">Log in</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
