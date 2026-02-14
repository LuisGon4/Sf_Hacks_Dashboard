import { SensorCard } from '../cards/SensorCard';
import { AnalysisCard } from '../cards/AnalysisCard';
import { useSensorData } from '../../hooks/useSensorData';

export function Dashboard() {
  // eslint-disable-next-line no-unused-vars
  const { sensorData, analysisData, loading, error } = useSensorData();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">GreenSense</h1>
          <p className="text-sm text-gray-500">Environmental Dashboard</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SensorCard
            title="Temperature"
            value={sensorData.temperature}
            unit="°F"
            icon="🌡️"
            color="orange"
          />
          <SensorCard
            title="Humidity"
            value={sensorData.humidity}
            unit="%"
            icon="💧"
            color="blue"
          />
          <SensorCard
            title="Green Score"
            value={sensorData.greenScore}
            unit="/100"
            icon="🌿"
            color="green"
          />
        </div>

        <AnalysisCard
          recommendation={analysisData.recommendation}
          risk={analysisData.environmentalRisk}
          impact={analysisData.sustainabilityImpact}
        />

        <footer className="mt-8 text-center text-sm text-gray-400">
          Last updated: {new Date(sensorData.timestamp).toLocaleString()}
        </footer>
      </main>
    </div>
  );
}
