import SocialSidebar from './SocialSidebar.jsx'

export default function PageHero({
  image,
  badge,
  title,
  description,
  alt = 'Hero banner',
}) {
  return (
    <div className="relative h-72 sm:h-84 md:h-96 w-full overflow-hidden bg-slate-950">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Deep blue/slate gradient overlay matching the theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20" />

      {/* Social media floating sidebar */}
      <SocialSidebar />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 sm:px-8 sm:pb-16 text-white">
        {badge && (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
            {badge}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-serif font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-200">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
