import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getZones } from '../src/helpers/api.jsx'
import gizaImage from '../assets/84e57524c7829f9afb785bf4243ad1e00daff167.png'
import newCairoImage from '../assets/805f9157385c77eda00123d63f619091624bed5e.png'
import sheikhZayedImage from '../assets/6ea437099d93b802d86e24a7afd85a00406aef59.png'
import northCoastImage from '../assets/3e2f86a71c007de304c9d2e5eb886968519c1983.png'

const zoneImages = {
  giza: gizaImage,
  'new-cairo': newCairoImage,
  'sheikh-zayed': sheikhZayedImage,
  'north-coast': northCoastImage,
}

export default function Zones() {
  const [zones, setZones] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getZones()
      .then(setZones)
      .catch((requestError) => {
        setError(requestError.message || 'Unable to load zones.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="bg-white px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
          Find your neighborhood
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Explore the zones
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Discover four distinct places, each with its own pace and character. Click a zone to explore its listings.
        </p>
        {loading && (
          <div
            role="status"
            className="mt-8 flex items-center gap-3 text-slate-600"
          >
            <span
              aria-hidden="true"
              className="h-5 w-5 animate-spin rounded-full border-2 border-amber-700/30 border-t-amber-700"
            />
            <span>Loading zones…</span>
          </div>
        )}
        {error && (
          <p role="alert" className="mt-8 text-red-700">
            Could not load zones: {error}
          </p>
        )}
        {!loading && !error && (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {zones.map((zone) => (
              <li
                key={zone.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <Link to={`/zones/${zone.id}`} className="block">
                  <img
                    src={zoneImages[zone.id] || zone.images[0]}
                    alt={`${zone.name_en}, ${zone.city_en}`}
                    className="h-64 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <p className="text-sm font-medium text-amber-700">
                      {zone.city_en}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                      {zone.name_en}
                    </h2>
                    <p className="mt-3 leading-7 text-slate-600">
                      {zone.description_en}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-600 transition">
                      Explore listings
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
  )
}
