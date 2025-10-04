import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { useNotify } from '../context/NotifyContext';
import { config } from '../config';

export default function ResetPassword() {
  const { push } = useNotify();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  const submit = async (e) => {
    e.preventDefault();
    if (!password || !token) return;
    setLoading(true);
    try {
      if (config.apiBaseUrl) {
        const res = await fetch(`${config.apiBaseUrl}/auth/reset`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ token, password })});
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed');
      }
      push({ title: 'Password updated. You can login now.' });
      setPassword('');
    } catch (err) {
      push({ variant: 'error', title: 'Failed', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="container-max py-16">
        <div className="max-w-md mx-auto card">
          <div className="card-body">
            <h1 className="text-xl font-semibold text-gray-900">Reset Password</h1>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium">New Password</label>
                <input type="password" className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" value={password} onChange={e=>setPassword(e.target.value)} />
              </div>
              <Button className="w-full" disabled={loading || !token}>{loading ? <Loader label="Updating..."/> : 'Update password'}</Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
