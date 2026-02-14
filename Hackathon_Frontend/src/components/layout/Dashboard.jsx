import { SensorCard } from '../cards/SensorCard';
import { AnalysisCard } from '../cards/AnalysisCard';
import { ChatPanel } from '../cards/ChatPanel';
import { useSensorData } from '../../hooks/useSensorData';

export function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const { sensorData, analysisData, loading, error } = useSensorData();

  if (error) {
    return (
      <div className="min-h-screen bg-mint-cream flex items-center justify-center">
        <div className="bg-parchment rounded-xl border border-sage p-8 text-center max-w-md">
          <p className="text-brick font-semibold">Unable to connect</p>
          <p className="text-warm-gray text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mint-cream">
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
              <p className="text-xs text-sage">Environmental Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-moss"></span>
            </span>
            <span className="text-xs text-sage font-medium">Live</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SensorCard
            title="Temperature"
            value={sensorData.temperature}
            unit="°F"
            variant="temperature"
          />
          <SensorCard
            title="Humidity"
            value={sensorData.humidity}
            unit="%"
            variant="humidity"
          />
          <SensorCard
            title="Green Score"
            value={sensorData.greenScore}
            unit="/100"
            variant="score"
          />
        </div>

        <AnalysisCard
          recommendation={analysisData.recommendation}
          risk={analysisData.environmentalRisk}
          impact={analysisData.sustainabilityImpact}
        />

        <div className="mt-6">
          <ChatPanel />
        </div>

        <footer className="mt-8 text-center text-xs text-warm-gray">
          Last updated: {new Date(sensorData.timestamp).toLocaleString()}
        </footer>
      </main>
    </div>
  );
}
