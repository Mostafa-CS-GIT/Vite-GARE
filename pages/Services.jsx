const services = [
  {
    number: '01',
    title: 'Find a home',
    description:
      'Explore considered homes and discover a space that fits the way you want to live.',
  },
  {
    number: '02',
    title: 'Sell with confidence',
    description:
      'Thoughtful guidance and a clear plan help bring the right people to your property.',
  },
  {
    number: '03',
    title: 'Make your next move',
    description:
      'From the first conversation to the final keys, we make each step feel simple.',
  },
]

export default function Services() {
  return (
    <section
      aria-labelledby="services-title"
      className="bg-stone-100 px-6 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
          How we can help
        </p>
        <h1
          id="services-title"
          className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
        >
          Your next chapter starts here.
        </h1>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="rounded-2xl border border-stone-200 bg-white p-7 sm:p-8"
            >
              <p className="text-sm font-semibold text-amber-700">
                {service.number}
              </p>
              <h2 className="mt-8 text-xl font-semibold text-slate-900">
                {service.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
