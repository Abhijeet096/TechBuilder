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
              <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">New</span>
              <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Build your website in minutes with AI</h1>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Launch a beautiful website for your business using our AI-powered builder. No code, no hassle.</p>
              <div className="mt-8 flex gap-4">
                <a href="/signup" className="btn btn-primary">Get Started</a>
                <a href="#features" className="btn btn-secondary">Learn More</a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-primary/10 blur-3xl opacity-40 rounded-3xl" />
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-3 gap-3">
                  <img className="rounded-lg aspect-square object-cover animate-float-slow" src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800&auto=format&fit=crop" alt="preview1" />
                  <img className="rounded-lg aspect-square object-cover animate-float-fast" src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop" alt="preview2" />
                  <img className="rounded-lg aspect-square object-cover animate-float-slow" src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=800&auto=format&fit=crop" alt="preview3" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-gray-600 dark:text-gray-300">
                  {['SEO Ready','Fast','Responsive'].map(k => (
                    <div key={k} className="rounded-md border border-gray-200 dark:border-gray-800 px-3 py-2 text-center">{k}</div>
                  ))}
                </div>
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

        <section className="bg-background py-16">
          <div className="container-max">
            <h2 className="text-2xl font-semibold text-gray-900">Loved by small businesses</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="card">
                  <div className="card-body">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">{i}</div>
                      <div className="font-medium">Acme Co.</div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">“We launched our new site in a day. The AI content saved us weeks.”</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-max py-16">
          <h2 className="text-2xl font-semibold text-gray-900">FAQ</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              { q: 'Can I export my website?', a: 'Yes, you can export and host anywhere.' },
              { q: 'Do I need coding skills?', a: 'No, everything is visual and simple.' },
              { q: 'Is there a free plan?', a: 'Yes, the Starter plan is free.' },
              { q: 'Can I customize templates?', a: 'Absolutely, adjust fonts, colors and content.' },
            ].map(item => (
              <div key={item.q} className="card">
                <div className="card-body">
                  <div className="font-semibold text-gray-900">{item.q}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.a}</div>
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
