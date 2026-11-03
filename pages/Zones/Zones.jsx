import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getZones } from '../../src/helpers/api.jsx'
import northCoastImage from '../../assets/84e57524c7829f9afb785bf4243ad1e00daff167.png'
import sheikhZayedImage from '../../assets/805f9157385c77eda00123d63f619091624bed5e.png'
import newCairoImage from '../../assets/6ea437099d93b802d86e24a7afd85a00406aef59.png'
import gizaImage from '../../assets/3e2f86a71c007de304c9d2e5eb886968519c1983.png'
import zonesHeroImg from '../../assets/ZonesHeroSection.png'
import PageHero from '../../components/PageHero.jsx'

const zoneImages = {
  giza: gizaImage,
  'new-cairo': newCairoImage,
  'sheikh-zayed': sheikhZayedImage,
  'north-coast': northCoastImage,
  alexandria: northCoastImage,
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
    <div>
      {/* Hero Section */}
      <PageHero
        image={zonesHeroImg}
        badge="Find your neighborhood"
        title="Explore The Zones"
        description="Discover four distinct places, each with its own pace and character. Click a zone to explore its listings."
        alt="Zones Hero Banner"
      />

      <section className="bg-white px-6 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          {loading && (
            <div
              role="status"
              className="mt-8 flex items-center justify-center gap-3 text-slate-600"
            >
              <span
                aria-hidden="true"
                className="h-6 w-6 animate-spin rounded-full border-2 border-amber-500/30 border-t-amber-500"
              />
              <span className="font-medium">Loading zones…</span>
            </div>
          )}

          {error && (
            <p role="alert" className="mt-8 text-red-700">
              Could not load zones: {error}
            </p>
          )}

          {!loading && !error && (
            <ul className="grid gap-8 sm:grid-cols-2">
              {zones.map((zone) => (
                <li
                  key={zone.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition hover:shadow-lg hover:-translate-y-1"
                >
                  <Link to={`/zones/${zone.id}`} className="block">
                    <img
                      src={
                        zone.images?.[0] ||
                        zoneImages[zone.id] ||
                        zoneImages[zone.name_en?.toLowerCase().replace(/\s+/g, '-')] ||
                        gizaImage
                      }
                      alt={`${zone.name_en}, ${zone.city_en}`}
                      className="h-64 sm:h-72 w-full object-cover transition duration-300 hover:scale-102"
                      loading="lazy"
                    />
                    <div className="p-6 sm:p-7">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                          {zone.city_en}
                        </p>
                        {Array.isArray(zone.projects) && (
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                            {zone.projects.length} {zone.projects.length === 1 ? 'Project' : 'Projects'}
                          </span>
                        )}
                      </div>
                      <h2 className="mt-2 text-2xl font-serif font-bold text-slate-900">
                        {zone.name_en}
                      </h2>
                      <p className="mt-3 leading-relaxed text-slate-600 text-sm sm:text-base">
                        {zone.description_en}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition">
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
    </div>
  )
}
