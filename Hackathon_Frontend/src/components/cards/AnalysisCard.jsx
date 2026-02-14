const riskConfig = {
  Low: { dot: 'bg-moss', text: 'text-moss' },
  Medium: { dot: 'bg-amber', text: 'text-amber' },
  High: { dot: 'bg-brick', text: 'text-brick' },
};

export function AnalysisCard({ recommendation, risk, impact }) {
  const riskStyle = riskConfig[risk] || riskConfig.Low;

  return (
    <div className="card-animate bg-parchment rounded-xl shadow-sm shadow-charcoal/5 overflow-hidden">
      {/* Header band */}
      <div className="bg-fern/8 px-6 py-4 flex items-center gap-3 border-b border-sage/30">
        <div className="w-8 h-8 rounded-lg bg-fern/10 text-fern flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
        <h3 className="font-serif text-lg font-semibold text-charcoal">
          Environmental Analysis
        </h3>
      </div>

      <div className="p-6 space-y-5">
        {/* Recommendation */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-warm-gray mb-1.5">
            Recommendation
          </h4>
          <p className="text-charcoal leading-relaxed">{recommendation}</p>
        </div>

        {/* Risk + Impact two-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Risk mini-card */}
          <div className="bg-parchment border border-sage/30 rounded-lg p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-warm-gray mb-2">
              Environmental Risk
            </h4>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${riskStyle.dot}`} />
              <span className={`font-semibold ${riskStyle.text}`}>{risk}</span>
            </div>
          </div>

          {/* Impact inset panel */}
          <div className="bg-cream rounded-lg p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-warm-gray mb-2">
              Sustainability Impact
            </h4>
            <p className="text-charcoal text-sm leading-relaxed">{impact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
