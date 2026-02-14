const conditionIcons = {
  Clear: '\u2600\uFE0F',
  Clouds: '\u2601\uFE0F',
  Rain: '\uD83C\uDF27\uFE0F',
  Snow: '\u2744\uFE0F',
  Thunderstorm: '\u26A1',
  Drizzle: '\uD83C\uDF26\uFE0F',
  Mist: '\uD83C\uDF2B\uFE0F',
  Fog: '\uD83C\uDF2B\uFE0F',
};

export function WeatherBar({ outdoor, indoorTemp }) {
  if (!outdoor) return null;

  const icon = conditionIcons[outdoor.condition] || '\uD83C\uDF24\uFE0F';
  const delta = indoorTemp != null ? (indoorTemp - outdoor.temperature).toFixed(1) : null;
  const deltaLabel =
    delta > 0
      ? `+${delta}\u00B0F warmer inside`
      : delta < 0
        ? `${delta}\u00B0F cooler inside`
        : 'Same as outside';

  return (
    <div className="card-animate bg-parchment/70 rounded-xl border border-sage/25 shadow-sm shadow-charcoal/5 px-6 py-3 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        {/* Left: city + condition */}
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <div>
            <span className="font-serif font-semibold text-charcoal text-sm">
              {outdoor.city}
            </span>
            <span className="text-warm-gray text-xs ml-2">{outdoor.condition}</span>
          </div>
        </div>

        {/* Center: stats */}
        <div className="flex items-center gap-5 text-sm text-charcoal">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brick/70">
              <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
            </svg>
            <span className="font-medium">{outdoor.temperature.toFixed(1)}&deg;F</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-blue/70">
              <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
            </svg>
            <span className="font-medium">{outdoor.humidity}%</span>
          </div>

          <div className="text-warm-gray text-xs">
            Feels like <span className="font-medium text-charcoal">{outdoor.feelsLike.toFixed(1)}&deg;F</span>
          </div>
        </div>

        {/* Right: delta badge */}
        {delta != null && (
          <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            Math.abs(delta) <= 3
              ? 'bg-moss/10 text-moss'
              : 'bg-amber/10 text-amber'
          }`}>
            {deltaLabel}
          </div>
        )}
      </div>
    </div>
  );
}
