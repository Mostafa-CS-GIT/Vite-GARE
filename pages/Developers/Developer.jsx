import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDevelopers } from '../../src/helpers/api.jsx'
import PageHero from '../../components/PageHero.jsx'
import developersHeroImg from '../../assets/developersHero.png'

export default function Developer() {
  const [developers, setDevelopers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDevelopers()
      .then(setDevelopers)
      .catch((requestError) => {
        setError(requestError.message || 'Unable to load developers.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <PageHero
        image={developersHeroImg}
        badge="Our partners"
        title="Developers"
        description="Meet the teams creating thoughtful places to live."
        alt="Developers Hero Banner"
      />

      <section className="bg-white px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          {loading && <p className="text-slate-600">Loading developers…</p>}
          {error && (
            <p role="alert" className="text-red-700">
              Could not load developers: {error}
            </p>
          )}
          {!loading && !error && (
            <ul className="grid gap-6 md:grid-cols-3">
              {developers.map((developer) => (
                <li
                  key={developer.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:-translate-y-1 hover:shadow-md"
                >
                  <Link to={`/developers/${developer.id}`} className="block h-full">
                    <img
                      src={developer.images?.[0] || developersHeroImg}
                      alt={`${developer.name_en} development`}
                      className="h-64 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-slate-900">
                        {developer.name_en}
                      </h2>
                      <p className="mt-3 leading-7 text-slate-600">
                        {developer.description_en}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                        Explore units
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
