import homeImage from '../assets/types-of-real-estate-overview-scaled.jpg'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[min(760px,88svh)] scroll-mt-16 items-center overflow-hidden bg-slate-900"
    >
      <img
        src={homeImage}
        alt="Modern contemporary home with expansive glass windows"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/15" />
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="max-w-2xl text-white">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300 sm:text-sm">
            Find a place to call home
          </p>
          <h1
            id="hero-title"
            className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl sm:leading-[1.08]"
          >
            A home that feels
            <span className="block text-amber-300">like your own.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            Thoughtful spaces, beautiful architecture, and a better way to find
            your next home.
          </p>
          <Link
            to="/services"
            className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-amber-400 px-7 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            Explore our services
          </Link>
        </div>
        <p className="mt-16 text-xs font-medium uppercase tracking-[0.2em] text-white/70">
          Designed for living
        </p>
      </div>
    </section>
  )
}
