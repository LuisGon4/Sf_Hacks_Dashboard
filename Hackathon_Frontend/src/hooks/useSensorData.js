import { useState, useEffect } from 'react';
import { API_BASE } from '../api/config';

function parseTemperature(raw) {
  if (typeof raw === 'number' && isFinite(raw)) return raw;
  const str = String(raw ?? '');
  const match = str.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : null;
}

function parseHumidity(raw) {
  if (typeof raw === 'number' && isFinite(raw)) return raw;
  const str = String(raw ?? '');
  const match = str.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : null;
}

function celsiusToFahrenheit(c) {
  return (c * 9) / 5 + 32;
}

function computeGreenScore(tempF, humidity) {
  // Ideal: 68–76°F, 30–50% humidity. Score 0–100.
  let score = 100;

  // Temperature penalty: lose up to 50 points
  if (tempF < 68) score -= Math.min(50, (68 - tempF) * 5);
  else if (tempF > 76) score -= Math.min(50, (tempF - 76) * 5);

  // Humidity penalty: lose up to 50 points
  if (humidity < 30) score -= Math.min(50, (30 - humidity) * 2.5);
  else if (humidity > 50) score -= Math.min(50, (humidity - 50) * 2.5);

  return Math.max(0, Math.round(score));
}

export function useSensorData() {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/`, {
          headers: { 'ngrok-skip-browser-warning': 'true' },
        });
        if (!response.ok) throw new Error('Failed to fetch sensor data');
        const data = await response.json();

        const celsius = parseTemperature(data.Temperature);
        const humidity = parseHumidity(data.Humidity);

        if (celsius === null || humidity === null) {
          throw new Error('Could not parse sensor data');
        }

        const tempF = celsiusToFahrenheit(celsius);
        const greenScore = computeGreenScore(tempF, humidity);

        setSensorData({
          temperature: parseFloat(tempF.toFixed(1)),
          humidity: parseFloat(humidity.toFixed(1)),
          greenScore,
          timestamp: new Date().toISOString(),
        });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return { sensorData, loading, error };
}
