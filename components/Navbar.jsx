import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Units', to: '/units' },
  { label: 'Zones', to: '/zones' },
  { label: 'Developers', to: '/developers' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white shadow-lg backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-6 sm:px-8"
      >
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 text-lg font-semibold tracking-[0.16em] text-white transition hover:opacity-95"
          aria-label="Grand Atlas Home"
        >
          <Logo className="h-10 w-auto sm:h-30" />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-1.5 text-xs font-medium sm:text-sm">
          {links.map(({ label, to }) => {
            const active = isActive(to)
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`rounded-full px-3 py-2 transition ${
                    active
                      ? 'bg-white/10 font-semibold text-amber-300'
                      : 'text-slate-200 hover:bg-white/10 hover:text-amber-300'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-amber-300 active:scale-[0.98]"
          >
            Register
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-slate-950 px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-2 text-base font-medium">
            {links.map(({ label, to }) => {
              const active = isActive(to)
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2 transition ${
                      active
                        ? 'bg-white/10 font-semibold text-amber-300'
                        : 'text-slate-200 hover:bg-white/5 hover:text-amber-300'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
            <li className="pt-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-300"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
