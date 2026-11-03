export default function About() {
  return (
    <section
      aria-labelledby="about-title"
      className="bg-white px-6 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
          A more personal approach
        </p>
        <div>
          <h1
            id="about-title"
            className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Good homes make room for a good life.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            Finding a home is about more than the keys. It is about the light
            in the morning, the room to gather, and the feeling that you are
            exactly where you belong. We are here to help you find that place.
          </p>
        </div>
      </div>
    </section>
  )
}
