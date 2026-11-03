import { Link } from 'react-router-dom'
import aboutImg from '../../assets/AboutImage.png'

export default function AboutSection() {
  return (
    <section className="bg-white py-20 px-6 sm:px-8 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Arched Luxury Villa Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-lg rounded-t-[120px] rounded-b-2xl border-4 border-slate-900 p-2 shadow-2xl bg-slate-900/5">
              <div className="overflow-hidden rounded-t-[112px] rounded-b-xl">
                <img
                  src={aboutImg}
                  alt="Grand Atlas Luxury Villa"
                  className="h-[420px] sm:h-[480px] w-full object-cover object-center transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col items-start">
            <div className="mb-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-slate-900">
                About Grand Atlas
              </h2>
              <div className="mt-2.5 h-1 w-20 rounded-full bg-amber-400" />
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-600">
              <p>
                We began with a singular, uncompromising vision: to bridge the gap
                between world-class architecture and the individuals who define our
                global culture. We recognized that for the discerning client, a home
                is rarely just a physical structure; it is a curated environment, a
                private gallery, and the ultimate expression of a life well-lived.
                Our journey started not in the pursuit of transactions, but in the
                pursuit of excellence. We set out to dismantle the traditional,
                high-volume real estate model in favor of a bespoke, &apos;private
                office&apos; approach—one where quality always supersedes quantity,
                and where every client is treated as the sole focus of our firm,
              </p>
              <p>
                We don&apos;t just find you a home; we secure your peace of mind
                through a veil of absolute professional confidentiality.
              </p>
            </div>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-amber-300 shadow-md transition hover:bg-slate-800 active:scale-[0.98]"
            >
              <span>Know More</span>
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
