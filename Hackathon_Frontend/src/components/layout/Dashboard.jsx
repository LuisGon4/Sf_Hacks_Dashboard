import { SensorCard } from '../cards/SensorCard';
import { WeatherBar } from '../cards/WeatherBar';
import { AnalysisCard } from '../cards/AnalysisCard';
import { ChatPanel } from '../cards/ChatPanel';
import { useSensorData } from '../../hooks/useSensorData';
import { useWeatherData } from '../../hooks/useWeatherData';

function computeAnalysis(sensorData, outdoor) {
  const hasOutdoor = outdoor && outdoor.temperature != null;
  const tempDelta = hasOutdoor ? sensorData.temperature - outdoor.temperature : null;
  const { temperature, humidity, greenScore } = sensorData;

  // AC status
  let acStatus;
  if (hasOutdoor) {
    if (tempDelta <= 3) acStatus = 'likely_unnecessary';
    else if (tempDelta <= 8) acStatus = 'justified';
    else acStatus = 'recommended';
  } else {
    if (temperature < 76) acStatus = 'likely_unnecessary';
    else if (temperature < 82) acStatus = 'justified';
    else acStatus = 'recommended';
  }

  // Risk
  let risk;
  if (greenScore >= 70) risk = 'Low';
  else if (greenScore >= 40) risk = 'Medium';
  else risk = 'High';

  // Recommendation
  let recommendation;
  if (humidity > 60) {
    recommendation = 'Use a dehumidifier or improve ventilation';
  } else if (humidity < 30) {
    recommendation = 'Consider a humidifier for comfort';
  } else if (temperature > 76 && hasOutdoor && outdoor.temperature < temperature) {
    recommendation = 'Open windows for natural ventilation';
  } else if (temperature > 76) {
    recommendation = 'Close blinds and minimize heat sources';
  } else {
    recommendation = 'Conditions are optimal — no action needed';
  }

  // Impact — contextual messages using temp, humidity, outdoor, and greenScore
  let impact;
  if (greenScore >= 80) {
    if (hasOutdoor && Math.abs(tempDelta) <= 3) {
      impact = `Indoor and outdoor temps are closely matched (${tempDelta > 0 ? '+' : ''}${tempDelta.toFixed(0)}°F delta) — no extra energy needed`;
    } else {
      impact = 'Excellent indoor conditions — minimal energy use for climate control';
    }
  } else if (greenScore >= 50) {
    if (hasOutdoor && outdoor.temperature < temperature && tempDelta > 5) {
      impact = `It's ${tempDelta.toFixed(0)}°F cooler outside — opening windows could save energy vs running AC`;
    } else if (humidity > 55) {
      impact = `Humidity at ${humidity.toFixed(0)}% is driving energy waste — dehumidifying is more efficient than overcooling`;
    } else {
      impact = 'Conditions are slightly off-ideal — small adjustments can reduce energy use';
    }
  } else {
    if (hasOutdoor && tempDelta > 10) {
      impact = `${tempDelta.toFixed(0)}°F warmer inside than outside — check for heat sources or poor insulation before increasing AC`;
    } else if (humidity > 65) {
      impact = `High humidity (${humidity.toFixed(0)}%) increases perceived heat and mold risk — dehumidify to reduce AC dependency`;
    } else if (temperature > 82) {
      impact = `Indoor temp at ${temperature.toFixed(0)}°F is well above comfort range — active cooling needed but check for open windows first`;
    } else {
      impact = 'Poor environmental score — addressing root causes saves more energy than compensating with HVAC';
    }
  }

  return { recommendation, risk, impact, acStatus, tempDelta };
}

// NOTE: this is where the main layout is for the frontend dashboard for client reading of data
export function Dashboard() {
  const { sensorData, loading, error } = useSensorData();
  const { outdoor } = useWeatherData();

  if (error && !sensorData) {
    return (
      <div className="min-h-screen bg-mint-cream flex items-center justify-center">
        <div className="bg-parchment rounded-xl border border-sage p-8 text-center max-w-md">
          <p className="text-brick font-semibold">Unable to connect</p>
          <p className="text-warm-gray text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (loading || !sensorData) {
    return (
      <div className="min-h-screen bg-mint-cream flex items-center justify-center">
        <p className="text-warm-gray">Loading sensor data...</p>
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
        <WeatherBar outdoor={outdoor} indoorTemp={sensorData.temperature} />

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

        <div className="mb-8">
          <AnalysisCard {...computeAnalysis(sensorData, outdoor)} />
        </div>

        <ChatPanel sensorData={sensorData} outdoor={outdoor} />

        <footer className="mt-8 text-center text-xs text-warm-gray">
          Last updated: {new Date(sensorData.timestamp).toLocaleString()}
        </footer>
      </main>
    </div>
  );
}
