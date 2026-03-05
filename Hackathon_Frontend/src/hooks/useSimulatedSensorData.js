import { useState, useEffect, useRef } from 'react';

function computeGreenScore(tempF, humidity) {
  let score = 100;
  if (tempF < 68) score -= Math.min(50, (68 - tempF) * 5);
  else if (tempF > 76) score -= Math.min(50, (tempF - 76) * 5);
  if (humidity < 30) score -= Math.min(50, (30 - humidity) * 2.5);
  else if (humidity > 50) score -= Math.min(50, (humidity - 50) * 2.5);
  return Math.max(0, Math.round(score));
}

export function useSimulatedSensorData() {
  const tempRef = useRef(72.0);
  const humidityRef = useRef(45.0);

  const buildReading = () => {
    const tempF = tempRef.current;
    const humidity = humidityRef.current;
    return {
      temperature: parseFloat(tempF.toFixed(1)),
      humidity: parseFloat(humidity.toFixed(1)),
      greenScore: computeGreenScore(tempF, humidity),
      timestamp: new Date().toISOString(),
    };
  };

  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSensorData(buildReading());
    setLoading(false);

    const interval = setInterval(() => {
      const tempDelta = (Math.random() - 0.5) * 0.6;
      const humDelta = (Math.random() - 0.5) * 1.0;
      tempRef.current = Math.min(85, Math.max(60, tempRef.current + tempDelta));
      humidityRef.current = Math.min(70, Math.max(25, humidityRef.current + humDelta));
      setSensorData(buildReading());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { sensorData, loading, error: null };
}
