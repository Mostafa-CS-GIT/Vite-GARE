import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getUnitById } from '../src/helpers/api.jsx'
import unitImage from '../assets/fcbd14ad68c7c79a3b7967ded6040ae39401d84c.png'

function formatPrice(price) {
  if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(1)}M EGP`
  if (price >= 1_000) return `${(price / 1_000).toFixed(0)}K EGP`
  return `${price} EGP`
}

export default function UnitDetails() {
  const { id } = useParams()

  const [unit, setUnit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getUnitDetails = async () => {
    try {
      const response = await getUnitById(id)
      setUnit(response)
    } catch (err) {
      console.log('Error fetching unit:', err)
      setError(err.message || 'Unable to load unit details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUnitDetails()
  }, [id])

  if (loading) return <h1 className="flex items-center justify-center h-screen text-2xl font-bold">Loading...</h1>

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
        <p className="text-red-600 text-lg">{error}</p>
        <Link
          to="/units"
          className="rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-300 transition"
        >
          ← Back to Units
        </Link>
      </section>
    )
  }

  if (!unit) return null

  return (
    <section className="bg-white px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Back link */}
        <Link
          to="/units"
          className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-600 transition"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Units
        </Link>

        {/* Hero image */}
        <div className="mt-8 overflow-hidden rounded-3xl shadow-lg">
          <img
            src={unitImage}
            alt={unit.title_en}
            className="h-72 w-full object-cover sm:h-96"
          />
        </div>

        {/* Content grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Main info */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
              {unit.zone_id.replace(/-/g, ' ')}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {unit.title_en}
            </h1>
            <p className="mt-6 leading-7 text-slate-600">{unit.description_en}</p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: 'Bedrooms', value: unit.bedrooms },
                { label: 'Bathrooms', value: unit.bathrooms },
                { label: 'Area', value: `${unit.area} m²` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center"
                >
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: price & contact */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Price</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{formatPrice(unit.price)}</p>
              <button
                type="button"
                className="mt-6 w-full rounded-full bg-amber-400 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Request info
              </button>
              <Link
                to={`/zones/${unit.zone_id}`}
                className="mt-3 flex w-full items-center justify-center rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-400 hover:text-amber-700"
              >
                View zone
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
