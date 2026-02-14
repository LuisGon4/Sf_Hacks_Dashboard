const variantConfig = {
  temperature: {
    border: 'border-l-terracotta',
    iconBg: 'bg-terracotta/10',
    iconColor: 'text-terracotta',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0Z" />
      </svg>
    ),
  },
  humidity: {
    border: 'border-l-slate-blue',
    iconBg: 'bg-slate-blue/10',
    iconColor: 'text-slate-blue',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7Z" />
      </svg>
    ),
  },
  score: {
    border: 'border-l-fern',
    iconBg: 'bg-fern/10',
    iconColor: 'text-fern',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1 3 1 6.5a7 7 0 0 1-7 10Z" />
        <path d="M12 20v-8" />
      </svg>
    ),
  },
};

function GreenScoreGauge({ value }) {
  const numValue = typeof value === 'number' ? value : 0;

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="gauge-container" style={{ '--gauge-value': numValue }}>
        <div className="gauge-arc" />
        <div className="gauge-needle" style={{ '--gauge-value': numValue }} />
        <div className="gauge-center-dot" />
      </div>
      <div className="flex items-baseline gap-1 mt-2">
        <span className="text-3xl font-bold text-charcoal">
          {numValue.toFixed(1)}
        </span>
        <span className="text-sm text-warm-gray">/100</span>
      </div>
    </div>
  );
}

export function SensorCard({ title, value, unit, variant = 'temperature' }) {
  const config = variantConfig[variant] || variantConfig.temperature;
  const isScore = variant === 'score';

  return (
    <div
      className={`card-animate bg-parchment rounded-xl border-l-4 ${config.border} p-6 shadow-sm shadow-charcoal/5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:shadow-charcoal/10`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-warm-gray">
          {title}
        </h3>
        <div className={`w-9 h-9 rounded-lg ${config.iconBg} ${config.iconColor} flex items-center justify-center`}>
          {config.icon}
        </div>
      </div>

      {isScore ? (
        <GreenScoreGauge value={value} />
      ) : (
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-charcoal">
            {typeof value === 'number' ? value.toFixed(1) : value}
          </span>
          <span className="text-lg text-warm-gray">{unit}</span>
        </div>
      )}
    </div>
  );
}
