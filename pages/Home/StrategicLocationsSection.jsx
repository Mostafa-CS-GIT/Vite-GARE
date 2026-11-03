import strategicMapImg from '../../assets/StrategicLocationsMap.png'

export default function StrategicLocationsSection() {
  return (
    <section className="bg-slate-50/70 py-20 px-6 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-slate-900">
            Strategic Locations
          </h2>
          <div className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-amber-400" />
        </div>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-md">
          <img
            src={strategicMapImg}
            alt="Strategic Real Estate Locations across Egypt"
            className="w-full h-auto rounded-xl object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
