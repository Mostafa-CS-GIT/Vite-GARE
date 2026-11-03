import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getUnitById } from '../../src/helpers/api.jsx'
import unitImage from '../../assets/fcbd14ad68c7c79a3b7967ded6040ae39401d84c.png'

function formatPrice(price) {
  if (!price && price !== 0) return 'Price on request'
  const num = Number(price)
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M EGP`
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K EGP`
  return `${num} EGP`
}

export default function UnitDetails() {
  const { id } = useParams()

  const [unit, setUnit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    let ignore = false
    getUnitById(id)
      .then((response) => {
        if (!ignore) {
          setUnit(response)
          setSelectedImage(0)
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.error('Error fetching unit:', err)
          setError(err.message || 'Unable to load unit details.')
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [id])

  if (loading) return <h1 className="flex items-center justify-center h-screen text-2xl font-bold text-slate-700">Loading...</h1>

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

  return (
    <section className="bg-white px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/units"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-600 transition"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Units
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
              <img
                src={unit?.images?.[selectedImage] || unit?.images?.[0] || unitImage}
                alt={unit?.title_en}
                className="h-96 w-full object-cover transition duration-300"
              />
            </div>
            {unit?.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {unit.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`overflow-hidden rounded-xl border-2 transition focus:outline-none ${
                      selectedImage === i
                        ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-xs'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${unit.title_en} view ${i + 1}`}
                      className="h-20 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                  {unit?.zoneName_en || unit?.project?.zone?.name_en || 'Egypt'}
                </p>
                {unit?.status && (
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-medium text-emerald-800">
                    {unit.status}
                  </span>
                )}
              </div>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {unit?.title_en}
              </h1>

              {(unit?.developerName_en || unit?.project?.developer?.name_en || unit?.projectName_en || unit?.project?.name_en) && (
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Developed by{' '}
                  <span className="font-semibold text-slate-700">
                    {unit?.developerName_en || unit?.project?.developer?.name_en}
                  </span>
                  {(unit?.projectName_en || unit?.project?.name_en) && (
                    <span> • Project: <span className="font-semibold text-slate-700">{unit?.projectName_en || unit?.project?.name_en}</span></span>
                  )}
                </p>
              )}

              <p className="mt-4 text-2xl font-bold text-slate-900">
                {formatPrice(unit?.price)}
              </p>
              <p className="mt-6 leading-7 text-slate-600">
                {unit?.description_en}
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-slate-900">{unit?.bedrooms ?? '—'}</p>
                  <p className="mt-1 text-xs text-slate-500 uppercase tracking-wider">Bedrooms</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{unit?.bathrooms ?? '—'}</p>
                  <p className="mt-1 text-xs text-slate-500 uppercase tracking-wider">Bathrooms</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {unit?.size || unit?.area ? `${unit.size || unit.area} m²` : '—'}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 uppercase tracking-wider">Area</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                state={{
                  unitTitle: unit?.title_en,
                  unitId: unit?.id,
                  zone: unit?.zoneName_en || unit?.project?.zone?.name_en,
                }}
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300 transition shadow-xs"
              >
                Inquire about this unit
              </Link>
              <Link
                to={
                  unit?.zoneId || unit?.project?.zoneId
                    ? `/zones/${unit.zoneId || unit.project.zoneId}`
                    : '/zones'
                }
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-8 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Explore this zone
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
