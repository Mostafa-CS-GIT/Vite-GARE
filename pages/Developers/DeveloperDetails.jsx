import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDeveloperById, getUnits } from '../../src/helpers/api.jsx'
import unitImage from '../../assets/fcbd14ad68c7c79a3b7967ded6040ae39401d84c.png'

const normalizeName = (name) => (name || '').trim().toLowerCase()

function formatPrice(price) {
  if (!price && price !== 0) return 'Price on request'
  const amount = Number(price)
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1).replace(/\.0$/, '')}M EGP`
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K EGP`
  return `${amount} EGP`
}

function getDeveloperUnits(developer, units, developerId) {
  const projectIds = new Set(
    (developer.projects || []).map((project) => project.id).filter(Boolean),
  )
  const developerName = normalizeName(developer.name_en)

  return units.filter((unit) => {
    const projectId = unit.projectId || unit.project?.id
    const unitDeveloperId =
      unit.developerId || unit.project?.developerId || unit.project?.developer?.id
    const unitDeveloperName = normalizeName(
      unit.developerName_en || unit.project?.developer?.name_en,
    )

    return (
      unitDeveloperId === developerId ||
      projectIds.has(projectId) ||
      (developerName && unitDeveloperName === developerName)
    )
  })
}

export default function DeveloperDetails() {
  const { id } = useParams()
  const [developer, setDeveloper] = useState(null)
  const [units, setUnits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    Promise.all([getDeveloperById(id), getUnits()])
      .then(([developerData, unitsData]) => {
        if (ignore) return
        setDeveloper(developerData)
        setUnits(getDeveloperUnits(developerData, unitsData || [], id))
      })
      .catch((requestError) => {
        if (!ignore) {
          setError(requestError.message || 'Unable to load developer details.')
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [id])

  if (loading) {
    return (
      <div role="status" className="flex min-h-[60vh] items-center justify-center">
        <p className="text-xl font-medium text-slate-600">Loading developer...</p>
      </div>
    )
  }

  if (error || !developer) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p role="alert" className="text-lg text-red-600">
          {error || 'Developer not found.'}
        </p>
        <Link
          to="/developers"
          className="rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          Back to Developers
        </Link>
      </section>
    )
  }

  return (
    <section className="bg-white">
      <div className="relative isolate h-72 overflow-hidden bg-slate-900 sm:h-96">
        <img
          src={developer.images?.[0] || unitImage}
          alt={developer.name_en}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/10" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-10 sm:px-8 sm:pb-14">
          <Link
            to="/developers"
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur transition hover:bg-white/20"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            All Developers
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
            Our partners
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {developer.name_en}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20">
        {developer.description_en && (
          <p className="max-w-3xl leading-7 text-slate-600">
            {developer.description_en}
          </p>
        )}

        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
            Available listings
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Units by {developer.name_en}
          </h2>

          {units.length === 0 ? (
            <p className="mt-8 text-slate-500">
              No units are currently listed for this developer.
            </p>
          ) : (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {units.map((unit) => (
                <li
                  key={unit.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Link to={`/units/${unit.id}`} className="block">
                    <img
                      src={unit.images?.[0] || unitImage}
                      alt={unit.title_en}
                      className="h-48 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                        {unit.zoneName_en || unit.project?.zone?.name_en || 'Egypt'}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900">
                        {unit.title_en}
                      </h3>
                      {(unit.projectName_en || unit.project?.name_en) && (
                        <p className="mt-1 text-sm text-slate-500">
                          {unit.projectName_en || unit.project?.name_en}
                        </p>
                      )}
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                        {unit.description_en}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
                        <span>{unit.bedrooms ?? '—'} bed</span>
                        <span>·</span>
                        <span>{unit.bathrooms ?? '—'} bath</span>
                        <span>·</span>
                        <span>{unit.size || unit.area || '—'} m²</span>
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
