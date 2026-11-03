import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUnits } from '../../src/helpers/api.jsx'
import unitImage from '../../assets/fcbd14ad68c7c79a3b7967ded6040ae39401d84c.png'
import unitsHeroImg from '../../assets/UnitsHeroSection.png'
import PageHero from '../../components/PageHero.jsx'

const filteredUnits = (units, filters) =>
  units.filter((unit) => {
    const searchLower = filters.search.trim().toLowerCase()
    const matchesSearch =
      !searchLower ||
      (unit.title_en || '').toLowerCase().includes(searchLower) ||
      (unit.title_ar || '').toLowerCase().includes(searchLower) ||
      (unit.zoneName_en || '').toLowerCase().includes(searchLower) ||
      (unit.projectName_en || unit.project?.name_en || '').toLowerCase().includes(searchLower) ||
      (unit.developerName_en || unit.project?.developer?.name_en || '').toLowerCase().includes(searchLower) ||
      (unit.description_en || '').toLowerCase().includes(searchLower)

    const matchesPrice =
      filters.price === '' || Number(unit.price) <= Number(filters.price)

    const matchesBedrooms =
      filters.bedrooms === '' ||
      (Number(filters.bedrooms) === 5
        ? Number(unit.bedrooms) >= 5
        : Number(unit.bedrooms) === Number(filters.bedrooms))

    const matchesDeveloper =
      filters.developer === '' ||
      (unit.developerName_en || unit.project?.developer?.name_en || '') === filters.developer
    const matchesZone =
      filters.zone === '' ||
      (unit.zoneName_en || unit.project?.zone?.name_en || '') === filters.zone
    const matchesProject =
      filters.project === '' ||
      (unit.projectName_en || unit.project?.name_en || '') === filters.project
    const matchesStatus = filters.status === '' || unit.status === filters.status

    return (
      matchesSearch &&
      matchesPrice &&
      matchesBedrooms &&
      matchesDeveloper &&
      matchesZone &&
      matchesProject &&
      matchesStatus
    )
  })

const getFilterOptions = (units, getValue) =>
  [...new Set(units.map(getValue).filter(Boolean))].sort((a, b) => a.localeCompare(b))

function formatPrice(price) {
  if (!price && price !== 0) return 'Price on request'
  const num = Number(price)
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M EGP`
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K EGP`
  return `${num} EGP`
}

export default function Units() {
  const [units, setUnits] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    search: '',
    bedrooms: '',
    developer: '',
    zone: '',
    project: '',
    status: '',
    price: '',
  })
  const [appliedFilters, setAppliedFilters] = useState(filters)

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
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl font-medium text-slate-600">Loading units...</p>
      </div>
    )
  }

  const results = filteredUnits(units, appliedFilters)
  const developers = getFilterOptions(
    units,
    (unit) => unit.developerName_en || unit.project?.developer?.name_en,
  )
  const zones = getFilterOptions(
    units,
    (unit) => unit.zoneName_en || unit.project?.zone?.name_en,
  )
  const projects = getFilterOptions(
    units,
    (unit) => unit.projectName_en || unit.project?.name_en,
  )
  const statuses = getFilterOptions(units, (unit) => unit.status)

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((currentFilters) => ({ ...currentFilters, [name]: value }))
  }

  return (
    <div>
      {/* Hero Section */}
      <PageHero
        image={unitsHeroImg}
        badge="Browse listings"
        title="Find Your Perfect Unit"
        description="Search through our curated selection of residential units across Egypt's finest neighborhoods."
        alt="Units Hero Banner"
      />

      <section className="bg-white px-6 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <form
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
              setAppliedFilters(filters)
            }}
          >
            <div className="grid overflow-hidden rounded-xl border border-amber-200 bg-white shadow-2xs sm:grid-cols-2 md:grid-cols-[1.55fr_repeat(6,minmax(0,1fr))] md:divide-x md:divide-slate-200">
              <div className="relative min-w-0 border-b border-slate-200 px-2 py-1 md:border-b-0">
                <label htmlFor="search" className="sr-only">Search property</label>
                <input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search Property"
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="h-11 w-full bg-transparent px-3 pr-9 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-300"
                />
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="m16 16 4 4" />
                </svg>
              </div>

              {[
                {
                  name: 'bedrooms',
                  label: 'Bedrooms',
                  options: [
                    ['1', '1 bedroom'],
                    ['2', '2 bedrooms'],
                    ['3', '3 bedrooms'],
                    ['4', '4 bedrooms'],
                    ['5', '5+ bedrooms'],
                  ],
                },
                { name: 'developer', label: 'Developer', options: developers.map((value) => [value, value]) },
                { name: 'zone', label: 'Zone', options: zones.map((value) => [value, value]) },
                { name: 'project', label: 'Projects', options: projects.map((value) => [value, value]) },
                {
                  name: 'status',
                  label: 'Status',
                  options: statuses.map((value) => [
                    value,
                    value.charAt(0) + value.slice(1).toLowerCase(),
                  ]),
                },
                {
                  name: 'price',
                  label: 'Price Range',
                  options: [
                    ['2000000', 'Up to 2M EGP'],
                    ['5000000', 'Up to 5M EGP'],
                    ['10000000', 'Up to 10M EGP'],
                    ['25000000', 'Up to 25M EGP'],
                  ],
                },
              ].map(({ name, label, options }) => (
                <div
                  key={name}
                  className="relative min-w-0 border-b border-slate-200 px-2 py-1 last:border-b-0 md:border-b-0"
                >
                  <label htmlFor={name} className="sr-only">{label}</label>
                  <select
                    id={name}
                    name={name}
                    value={filters[name]}
                    onChange={handleFilterChange}
                    className="h-11 w-full appearance-none bg-transparent px-3 pr-8 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-inset focus:ring-amber-300 md:px-2 md:pr-5 md:text-[11px]"
                  >
                    <option value="">{label}</option>
                    {options.map(([value, optionLabel]) => (
                      <option key={value} value={value}>{optionLabel}</option>
                    ))}
                  </select>
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 md:right-2 md:h-3 md:w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="mx-auto mt-8 flex w-full max-w-56 items-center justify-center rounded-md bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              Search
            </button>
          </form>

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
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((unit) => (
                <li
                  key={unit.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition hover:shadow-md hover:-translate-y-0.5"
                >
                  <Link to={`/units/${unit.id}`} className="block">
                    <img
                      src={unit.images?.[0] || unitImage}
                      alt={unit.title_en}
                      className="h-52 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                          {unit.zoneName_en || unit.project?.zone?.name_en || 'Egypt'}
                        </p>
                        {(unit.developerName_en || unit.project?.developer?.name_en) && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 uppercase tracking-wider">
                            {unit.developerName_en || unit.project?.developer?.name_en}
                          </span>
                        )}
                      </div>
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
                          {unit.size || unit.area} m²
                        </span>
                      </div>

                      {/* Price + CTA */}
                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
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
    </div>
  )
}
