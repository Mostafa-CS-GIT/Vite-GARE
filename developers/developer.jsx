import { useEffect, useState } from 'react'
import { getDevelopers } from '../src/helpers/api.jsx'

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
    <section className="bg-white px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
          Our partners
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Developers
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Meet the teams creating thoughtful places to live.
        </p>
        {loading && <p className="mt-8 text-slate-600">Loading developers…</p>}
        {error && (
          <p role="alert" className="mt-8 text-red-700">
            Could not load developers: {error}
          </p>
        )}
        {!loading && !error && (
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {developers.map((developer) => (
              <li
                key={developer.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <img
                  src={developer.images[0]}
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
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
