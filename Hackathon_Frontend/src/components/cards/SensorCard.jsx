export function SensorCard({ title, value, unit, icon, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
  };

  const iconColorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    orange: 'text-orange-500',
    purple: 'text-purple-500',
  };

  return (
    <div className={`rounded-xl border-2 p-6 ${colorClasses[color]} shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium uppercase tracking-wide opacity-75">
          {title}
        </h3>
        <span className={`text-2xl ${iconColorClasses[color]}`}>{icon}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold">
          {typeof value === 'number' ? value.toFixed(1) : value}
        </span>
        <span className="text-lg opacity-75">{unit}</span>
      </div>
    </div>
  );
}
