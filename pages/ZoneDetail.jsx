import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getZoneById, getUnits } from '../src/helpers/api.jsx'
import gizaImage from '../assets/84e57524c7829f9afb785bf4243ad1e00daff167.png'
import newCairoImage from '../assets/805f9157385c77eda00123d63f619091624bed5e.png'
import sheikhZayedImage from '../assets/6ea437099d93b802d86e24a7afd85a00406aef59.png'
import northCoastImage from '../assets/3e2f86a71c007de304c9d2e5eb886968519c1983.png'
import unitImage from '../assets/fcbd14ad68c7c79a3b7967ded6040ae39401d84c.png'

const zoneImages = {
  giza: gizaImage,
  'new-cairo': newCairoImage,
  'sheikh-zayed': sheikhZayedImage,
  'north-coast': northCoastImage,
}

function formatPrice(price) {
  if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(1)}M EGP`
  if (price >= 1_000) return `${(price / 1_000).toFixed(0)}K EGP`
  return `${price} EGP`
}

export default function ZoneDetail() {
  const { id } = useParams()

  const [zone, setZone] = useState(null)
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getZoneById(id), getUnits()])
      .then(([zoneData, unitsData]) => {
        setZone(zoneData)
        setUnits(unitsData.filter((u) => u.zone_id === id))
      })
      .catch((err) => {
        setError(err.message || 'Unable to load zone details.')
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    )
  }

  if (error || !zone) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
        <p className="text-red-600 text-lg">{error || 'Zone not found.'}</p>
        <Link
          to="/zones"
          className="rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-300 transition"
        >
          ← Back to Zones
        </Link>
      </section>
    )
  }

  return (
    <section className="bg-white">
      {/* Zone hero banner */}
      <div className="relative isolate h-72 overflow-hidden sm:h-96">
        <img
          src={zoneImages[zone.id] || zone.images[0]}
          alt={zone.name_en}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/10" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-10 sm:px-8 sm:pb-14">
          <Link
            to="/zones"
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur hover:bg-white/20 transition"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            All Zones
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
            {zone.city_en}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {zone.name_en}
          </h1>
        </div>
      </div>

      {/* Zone details */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20">
        <p className="max-w-2xl leading-7 text-slate-600">{zone.description_en}</p>

        {/* Units in this zone */}
        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
            Available listings
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Units in {zone.name_en}
          </h2>

          {units.length === 0 ? (
            <p className="mt-8 text-slate-500">No units currently listed in this zone.</p>
          ) : (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {units.map((unit) => (
                <li
                  key={unit.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <Link to={`/units/${unit.id}`} className="block">
                    <img
                      src={unitImage}
                      alt={unit.title_en}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                        {unit.title_en}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
                        {unit.description_en}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
                        <span>{unit.bedrooms} bed</span>
                        <span>·</span>
                        <span>{unit.bathrooms} bath</span>
                        <span>·</span>
                        <span>{unit.area} m²</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-base font-bold text-slate-900">
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
        </div>
      </div>
    </section>
  )
}
