import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { useNotify } from '../context/NotifyContext';
import { config } from '../config';

export default function ContactPage() {
  const { push } = useNotify();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      push({ variant: 'error', title: 'Missing info', message: 'Please complete all fields.' });
      return;
    }
    setLoading(true);
    try {
      if (config.emailServiceUrl) {
        await fetch(config.emailServiceUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });
        push({ title: 'Message sent', message: 'We will get back to you shortly.' });
      } else {
        await new Promise(r => setTimeout(r, 600));
        push({ title: 'Message queued (demo)', message: 'Configure emailServiceUrl to enable real sending.' });
      }
      setName(''); setEmail(''); setMessage('');
    } catch (e2) {
      push({ variant: 'error', title: 'Failed to send', message: e2.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="container-max py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Contact Us</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Have questions? Send us a message and our team will reply soon.</p>
          <form onSubmit={submit} className="card mt-6">
            <div className="card-body space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" value={name} onChange={(e)=>setName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea rows={5} className="mt-1 w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" value={message} onChange={(e)=>setMessage(e.target.value)} />
              </div>
              <Button className="w-full" disabled={loading}>{loading ? <Loader label="Sending..." /> : 'Send message'}</Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
