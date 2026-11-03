import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import contactHeroImg from '../../assets/ContactUsHeroSection.png'
import { sendContactMessage } from '../../src/helpers/api.jsx'

export default function ContactUs() {
  const location = useLocation()
  const initialMessage = location.state?.unitTitle
    ? `Hello, I am interested in inquiring about "${location.state.unitTitle}"${
        location.state.zone ? ` in ${location.state.zone}` : ''
      }. Please contact me with more information.`
    : ''

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: initialMessage,
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', text: '' })

    try {
      const response = await sendContactMessage(formData)
      setStatus({
        type: 'success',
        text: response?.message || 'Thank you! Your message has been sent successfully.',
      })
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Unable to send your message. Please try again later.'
      setStatus({ type: 'error', text: errorMsg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero Section with dark gradient theme */}
      <PageHero
        image={contactHeroImg}
        badge="Get In Touch"
        title="Contact Us"
        description="We are here to assist you with inquiries, appointments, and bespoke real estate consultations."
        alt="Contact Us Hero"
      />

      {/* Main Section */}
      <section className="bg-white py-16 px-6 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-slate-900">
                  Contact Information
                </h2>
                <div className="mt-2.5 h-1 w-16 rounded-full bg-amber-400" />
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                  Our team is available for private consultations and off-market
                  inquiries. We operate with absolute discretion to ensure your
                  real estate objectives are met with precision.
                </p>
              </div>

              {/* Direct Details */}
              <div className="space-y-4 text-sm sm:text-base text-slate-700">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-amber-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <span>
                    Minusio, Lake Maggiore, Switzerland — ref. LOC1771
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <span className="text-amber-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <a
                    href="mailto:Grand.Atlas.Support@gmail.com"
                    className="transition hover:text-amber-600"
                  >
                    Grand .Atlas.Support@gmail.com
                  </a>
                </div>

                {/* Mobile Phone */}
                <div className="flex items-center gap-3">
                  <span className="text-amber-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <a href="tel:01247859622" className="transition hover:text-amber-600">
                    01247859622
                  </a>
                </div>

                {/* Telephone */}
                <div className="flex items-center gap-3">
                  <span className="text-amber-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <a href="tel:035987124" className="transition hover:text-amber-600">
                    035987124
                  </a>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
                  Follow us on social media
                </h3>
                <div className="mt-4 flex items-center gap-3">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-900 text-sm font-bold text-slate-900 transition hover:bg-slate-900 hover:text-amber-300"
                  >
                    f
                  </a>

                  {/* X */}
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X"
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-900 text-sm font-bold text-slate-900 transition hover:bg-slate-900 hover:text-amber-300"
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-900 text-sm font-bold text-slate-900 transition hover:bg-slate-900 hover:text-amber-300"
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-900 text-sm font-bold text-slate-900 transition hover:bg-slate-900 hover:text-amber-300"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.19 1.18 2.15 2.37 2.39.63.15 1.31.08 1.9-.17.84-.33 1.49-1.03 1.73-1.89.17-.54.21-1.11.21-1.68V.02h2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="pt-2">
                <h3 className="text-base font-bold text-slate-800">
                  Working Hours
                </h3>
                <div className="mt-4 space-y-2.5 text-sm sm:text-base max-w-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Saturday :</span>
                    <span className="text-slate-600">9:00AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Sunday :</span>
                    <span className="text-slate-600">9:00AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Monday :</span>
                    <span className="text-slate-600">9:00AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Tuesday :</span>
                    <span className="text-slate-600">9:00AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Wednesday :</span>
                    <span className="text-slate-600">9:00AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Send us a message form card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Send us a message
                </h3>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="mt-2 block w-full rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="mt-2 block w-full rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your contact number"
                      className="mt-2 block w-full rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-slate-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about the property or requirements you have in mind..."
                      className="mt-2 block w-full rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-slate-950 py-3.5 px-6 text-sm sm:text-base font-semibold text-amber-300 shadow-md transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-amber-300/30 border-t-amber-300" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>

                  {status.type === 'success' && (
                    <div
                      role="alert"
                      className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800 border border-emerald-200"
                    >
                      {status.text}
                    </div>
                  )}

                  {status.type === 'error' && (
                    <div
                      role="alert"
                      className="rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200"
                    >
                      {status.text}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
