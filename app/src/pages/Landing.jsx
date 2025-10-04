import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { RocketLaunchIcon, SparklesIcon, BoltIcon } from '@heroicons/react/24/outline'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
        <Link to="/" className="text-xl font-bold text-indigo-600">SwiftSite</Link>
        <nav className="hidden gap-6 text-sm font-medium text-gray-700 md:flex">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <a href="#features" className="hover:text-indigo-600">Features</a>
          <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
          <Link to="/login" className="hover:text-indigo-600">Login</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/signup"><Button size="sm">Sign Up</Button></Link>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Build your website in minutes with AI
              </h1>
              <p className="mt-4 text-gray-600">
                SwiftSite helps you launch a professional website fast. Describe your business and our AI drafts your content and layout.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/signup"><Button className="">Get Started</Button></Link>
                <a href="#features"><Button variant="secondary">Learn More</Button></a>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="aspect-video w-full rounded-md bg-gradient-to-br from-indigo-100 to-indigo-50 grid place-items-center text-indigo-600">
                <span className="font-semibold">Live Preview</span>
              </div>
              <p className="mt-3 text-sm text-gray-600">See how your site could look.</p>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-2xl font-bold text-gray-900">Features</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: RocketLaunchIcon, title: 'Fast Launch', desc: 'Create a site in minutes.' },
                { icon: SparklesIcon, title: 'AI Content', desc: 'Generate copy tailored to your business.' },
                { icon: BoltIcon, title: 'Beautiful Templates', desc: 'Pick from clean, responsive templates.' },
              ].map((f) => (
                <div key={f.title} className="rounded-lg border bg-white p-6 shadow-sm">
                  <f.icon className="h-8 w-8 text-indigo-600" />
                  <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-2xl font-bold text-gray-900">Pricing</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[['Starter', 'Free'], ['Pro', '$9/mo'], ['Business', '$29/mo']].map(([name, price]) => (
                <div key={name} className="rounded-lg border bg-white p-6 shadow-sm">
                  <div className="text-lg font-semibold">{name}</div>
                  <div className="mt-2 text-3xl font-bold text-indigo-600">{price}</div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    <li>AI content generation</li>
                    <li>Responsive templates</li>
                    <li>Email support</li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/signup"><Button className="w-full">Choose {name}</Button></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-gray-600 flex flex-wrap items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} SwiftSite</div>
          <nav className="flex gap-4">
            <a className="hover:text-indigo-600" href="#">About</a>
            <a className="hover:text-indigo-600" href="#">Privacy</a>
            <a className="hover:text-indigo-600" href="#">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
