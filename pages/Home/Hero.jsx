import homeImage from '../../assets/types-of-real-estate-overview-scaled.jpg'
import { Link } from 'react-router-dom'
import SocialSidebar from '../../components/SocialSidebar.jsx'

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[min(760px,88svh)] scroll-mt-16 items-center overflow-hidden bg-slate-950"
    >
      <img
        src={homeImage}
        alt="Modern contemporary architecture"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-slate-950/60" />

      {/* Social media floating sidebar */}
      <SocialSidebar />

      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-col items-center text-center text-white">
          <h1
            id="hero-title"
            className="text-4xl font-serif font-bold italic leading-tight tracking-tight sm:text-6xl sm:leading-[1.12]"
          >
            Redefining the Horizon
            <span className="block">of Modern Luxury Living</span>
          </h1>
          <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
            We believe a home should be a sanctuary of innovation and an extension of your personal brand. By combining cutting-edge market data with a keen eye for world-class design, we help you navigate the complexities of the luxury market to find a space that inspires your best work and your deepest rest
          </p>
          <div className="mt-10">
            <Link
              to="/units"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-amber-400 px-10 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
