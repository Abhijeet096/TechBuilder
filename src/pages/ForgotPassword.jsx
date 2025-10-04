import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { useNotify } from '../context/NotifyContext';
import { config } from '../config';

export default function ForgotPassword() {
  const { push } = useNotify();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      if (config.apiBaseUrl) {
        await fetch(`${config.apiBaseUrl}/auth/request-reset`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email })});
      }
      push({ title: 'If account exists, reset link sent' });
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
            <h1 className="text-xl font-semibold text-gray-900">Forgot Password</h1>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" value={email} onChange={e=>setEmail(e.target.value)} />
              </div>
              <Button className="w-full" disabled={loading}>{loading ? <Loader label="Sending..."/> : 'Send reset link'}</Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
