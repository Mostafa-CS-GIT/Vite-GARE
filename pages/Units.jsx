import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUnits } from '../src/helpers/api.jsx'
import unitImage from '../assets/fcbd14ad68c7c79a3b7967ded6040ae39401d84c.png'

const filteredUnits = (units, search, price, bedrooms) =>
  units.filter((unit) => {
    return (
      unit.title_en.toLowerCase().includes(search.toLowerCase()) &&
      (price === '' || unit.price <= price) &&
      (bedrooms === '' || unit.bedrooms == bedrooms)
    )
  })

function formatPrice(price) {
  if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(1)}M EGP`
  if (price >= 1_000) return `${(price / 1_000).toFixed(0)}K EGP`
  return `${price} EGP`
}

export default function Units() {
  const [units, setUnits] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // Filter state
  const [search, setSearch] = useState('')
  const [price, setPrice] = useState('')
  const [bedrooms, setBedrooms] = useState('')

  useEffect(() => {
    getUnits()
      .then(setUnits)
      .catch((requestError) => {
        setError(requestError.message || 'Unable to load units.')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    )
  }

  const results = filteredUnits(units, search, price, bedrooms)

  return (
    <section className="bg-white px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Page header */}
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
          Browse listings
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Find your perfect unit
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Search through our curated selection of residential units across Egypt's finest
          neighborhoods.
        </p>

        {/* Filter bar */}
        <div className="mt-10 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-3">
          {/* Search by name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="search" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Unit name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
            />
          </div>

          {/* Max price */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="price" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Max Price
            </label>
            <select
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
            >
              <option value="">Any price</option>
              <option value="2000000">Up to 2M EGP</option>
              <option value="4000000">Up to 4M EGP</option>
              <option value="6000000">Up to 6M EGP</option>
              <option value="10000000">Up to 10M EGP</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="bedrooms" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Bedrooms
            </label>
            <select
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
            >
              <option value="">Any</option>
              <option value="1">1 bedroom</option>
              <option value="2">2 bedrooms</option>
              <option value="3">3 bedrooms</option>
              <option value="4">4 bedrooms</option>
              <option value="5">5+ bedrooms</option>
            </select>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <p role="alert" className="mt-8 text-red-700">
            Could not load units: {error}
          </p>
        )}

        {/* Results count */}
        {!error && (
          <p className="mt-6 text-sm text-slate-500">
            {results.length} {results.length === 1 ? 'unit' : 'units'} found
          </p>
        )}

        {/* Unit grid */}
        {!error && results.length > 0 && (
          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((unit) => (
              <li
                key={unit.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <Link to={`/units/${unit.id}`} className="block">
                  <img
                    src={unitImage}
                    alt={unit.title_en}
                    className="h-52 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                      {unit.zone_id.replace(/-/g, ' ')}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-slate-900 leading-snug">
                      {unit.title_en}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
                      {unit.description_en}
                    </p>

                    {/* Stats row */}
                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        {unit.bedrooms} bed
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {unit.bathrooms} bath
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                        {unit.area} m²
                      </span>
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">
                        {formatPrice(unit.price)}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-amber-400 px-4 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-amber-300">
                        View details
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {!error && results.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 text-center text-slate-500">
            <svg className="h-12 w-12 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <p className="text-sm">No units match your filters. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </section>
  )
}
