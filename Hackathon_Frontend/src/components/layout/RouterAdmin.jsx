// purpose: admin dashboard for sublinks within GreenSense Application
import { Link } from 'react-router-dom'

export function AdminPage() {
  return (
    <div className="min-h-screen bg-mint-cream">
      {/* Header — matches Dashboard */}
      <header className="bg-charcoal">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-sage">
              <path
                d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 6-4 6-4s2 2 6 2c0-6-3-10-3-10Z"
                fill="currentColor"
                opacity="0.3"
              />
              <path
                d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 6-4 6-4s2 2 6 2c0-6-3-10-3-10Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path d="M12 16c1-3 2.5-6 5-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
            <div>
              <h1 className="font-serif text-xl font-bold text-parchment tracking-tight">GreenSense</h1>
              <p className="text-xs text-sage">Developer Console</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-semibold text-charcoal mb-1">Select a view</h2>
          <p className="text-sm text-warm-gray">Choose a destination within the GreenSense app.</p>
        </div>

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/greensense-dashboard"
            className="card-animate bg-parchment rounded-xl border-l-4 border-l-fern p-6
                       shadow-sm shadow-charcoal/5 flex items-center justify-between gap-4
                       hover:-translate-y-0.5 hover:shadow-md hover:shadow-charcoal/10
                       transition-all duration-200 ease-out group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-fern/10 text-fern flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1 3 1 6.5a7 7 0 0 1-7 10Z" />
                  <path d="M12 20v-8" />
                </svg>
              </div>
              <div>
                <p className="font-serif font-semibold text-charcoal">GreenSense Dashboard</p>
                <p className="text-xs text-warm-gray mt-0.5">Live temperature, humidity & green score</p>
              </div>
            </div>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-warm-gray group-hover:text-fern group-hover:translate-x-0.5 transition-all flex-shrink-0"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>

          <Link
            to="/greensense-dashboard/simulated"
            className="card-animate bg-parchment rounded-xl border-l-4 border-l-amber p-6
                       shadow-sm shadow-charcoal/5 flex items-center justify-between gap-4
                       hover:-translate-y-0.5 hover:shadow-md hover:shadow-charcoal/10
                       transition-all duration-200 ease-out group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber/10 text-amber flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M12 18v-6" />
                  <path d="M9 15l3 3 3-3" />
                </svg>
              </div>
              <div>
                <p className="font-serif font-semibold text-charcoal">Simulation Mode</p>
                <p className="text-xs text-warm-gray mt-0.5">Demo dashboard with simulated sensor data</p>
              </div>
            </div>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="text-warm-gray group-hover:text-amber group-hover:translate-x-0.5 transition-all flex-shrink-0"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </nav>
      </main>
    </div>
  )
}
