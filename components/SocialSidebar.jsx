export default function SocialSidebar() {
  return (
    <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex flex-col gap-3 hidden sm:flex">
      {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 text-sm font-bold text-white transition hover:bg-white hover:text-slate-900"
      >
        f
      </a>

      {/* X */}
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noreferrer"
        aria-label="X"
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 text-white transition hover:bg-white hover:text-slate-900"
      >
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 text-white transition hover:bg-white hover:text-slate-900"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="2" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </a>

      {/* TikTok */}
      <a
        href="https://tiktok.com"
        target="_blank"
        rel="noreferrer"
        aria-label="TikTok"
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 text-white transition hover:bg-white hover:text-slate-900"
      >
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.19 1.18 2.15 2.37 2.39.63.15 1.31.08 1.9-.17.84-.33 1.49-1.03 1.73-1.89.17-.54.21-1.11.21-1.68V.02h2z" />
        </svg>
      </a>
    </div>
  )
}
