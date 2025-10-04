import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

export default function LandingPage() {
  return (
    <div>
      <Header />
      <main>
        <section className="container-max py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">Build your website in minutes with AI</h1>
              <p className="mt-4 text-gray-600">Launch a beautiful website for your business using our AI-powered builder. No code, no hassle.</p>
              <div className="mt-8 flex gap-4">
                <a href="/signup" className="btn btn-primary">Get Started</a>
                <a href="#features" className="btn btn-secondary">Learn More</a>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary font-semibold">
                Instant AI Website Preview
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-background py-16">
          <div className="container-max">
            <h2 className="text-2xl font-semibold text-gray-900">Features</h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'AI Content', desc: 'Generate About, Services and more instantly.' },
                { title: 'Beautiful Templates', desc: 'Choose from modern responsive designs.' },
                { title: 'Drag & Edit', desc: 'Edit text and images inline with ease.' },
                { title: 'Export & Host', desc: 'Download or publish your site anywhere.' },
              ].map((f) => (
                <div key={f.title} className="card">
                  <div className="card-body">
                    <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center font-semibold">{f.title[0]}</div>
                    <div className="mt-3 font-semibold text-gray-900">{f.title}</div>
                    <div className="text-gray-600 text-sm mt-1">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="container-max py-16">
          <h2 className="text-2xl font-semibold text-gray-900">Pricing</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '$0', features: ['Basic templates', 'AI content (limited)'] },
              { name: 'Pro', price: '$19/mo', features: ['All templates', 'Unlimited AI content', 'Custom domain'] },
              { name: 'Business', price: '$49/mo', features: ['Team access', 'Priority support', 'SEO tools'] },
            ].map((p) => (
              <div key={p.name} className="card">
                <div className="card-body">
                  <div className="font-semibold text-gray-900">{p.name}</div>
                  <div className="text-3xl font-bold mt-2">{p.price}</div>
                  <ul className="mt-4 space-y-1 text-sm text-gray-600">
                    {p.features.map(f => <li key={f}>• {f}</li>)}
                  </ul>
                  <a href="/signup" className="btn btn-primary mt-6 w-full">Choose {p.name}</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
