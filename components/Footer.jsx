import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block transition hover:opacity-90">
              <Logo className="h-16 w-auto" />
            </Link>
            <div className="space-y-2 text-sm text-slate-400">
              <p>
                <a
                  href="tel:+176355471297"
                  className="transition hover:text-amber-300"
                >
                  +1 (7635) 547-12-97
                </a>
              </p>
              <p>
                <a
                  href="mailto:support@lift.agency"
                  className="transition hover:text-amber-300"
                >
                  support@lift.agency
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="transition hover:text-amber-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/units" className="transition hover:text-amber-300">
                  Inventories
                </Link>
              </li>
              <li>
                <Link to="/zones" className="transition hover:text-amber-300">
                  Zones
                </Link>
              </li>
              <li>
                <Link to="/developers" className="transition hover:text-amber-300">
                  Developers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-amber-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="transition hover:text-amber-300">
                  Grand Atlas
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-amber-300">
                  Help
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@lift.agency"
                  className="transition hover:text-amber-300"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Get In touch */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">
              Get In touch
            </h3>
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex items-center overflow-hidden rounded-lg border border-white/10 bg-slate-900 p-0.5 shadow-2xs focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400/20">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Get product updates"
                  required
                  className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none sm:text-sm"
                />
                <button
                  type="submit"
                  aria-label="Submit newsletter subscription"
                  className="flex h-9 w-10 shrink-0 items-center justify-center rounded-md bg-amber-400 text-slate-950 transition hover:bg-amber-300"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-amber-300">
                  Thank you for subscribing!
                </p>
              )}
            </form>

            {/* Social Media Icons */}
            <div className="mt-6 flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs font-bold text-slate-300 transition hover:border-amber-400 hover:text-amber-300 hover:bg-white/5"
              >
                in
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs font-bold text-slate-300 transition hover:border-amber-400 hover:text-amber-300 hover:bg-white/5"
              >
                f
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs font-bold text-slate-300 transition hover:border-amber-400 hover:text-amber-300 hover:bg-white/5"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 border-t border-white/10 pt-8 text-center text-xs text-slate-500">
          <p>© 2020 Lift Media. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
