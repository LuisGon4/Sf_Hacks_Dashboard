import { useState, useEffect } from 'react';

// Set to false when backend is ready
const USE_MOCK = true;

const mockSensorData = {
  temperature: 72.5,
  humidity: 45,
  greenScore: 85,
  timestamp: new Date().toISOString(),
  outdoor: {
    temperature: 68.2,
    humidity: 55,
    feelsLike: 67.1,
    condition: 'Clear',
    city: 'San Francisco',
  },
};

const mockAnalysisData = {
  recommendation: "Outdoor temp is 68°F — close to your indoor 72°F. Consider opening windows instead of running AC.",
  environmentalRisk: "Low",
  sustainabilityImpact: "Opening windows could save ~$2/day in cooling costs compared to running AC.",
  acStatus: "likely_unnecessary",
  tempDelta: 4.3,
};

export function useSensorData() {
  const [sensorData, setSensorData] = useState(mockSensorData);
  // eslint-disable-next-line no-unused-vars
  const [analysisData, setAnalysisData] = useState(mockAnalysisData);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    if (USE_MOCK) {
      // Update timestamp periodically for mock data
      const interval = setInterval(() => {
        setSensorData(prev => ({
          ...prev,
          timestamp: new Date().toISOString(),
          // Add slight variations to mock data
          temperature: 72 + Math.random() * 2,
          humidity: 44 + Math.random() * 3,
        }));
      }, 30000);
      return () => clearInterval(interval);
    }

    // Real API polling (uncomment when backend is ready)
    /*
    const fetchSensorData = async () => {
      try {
        const response = await fetch(`${API_BASE}/latest`);
        if (!response.ok) throw new Error('Failed to fetch sensor data');
        const data = await response.json();
        setSensorData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`${API_BASE}/analysis`);
        if (!response.ok) throw new Error('Failed to fetch analysis');
        const data = await response.json();
        setAnalysisData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSensorData();
    fetchAnalysis();

    // Poll /latest every 30 seconds
    const sensorInterval = setInterval(fetchSensorData, 30000);
    // Poll /analysis every 5 minutes
    const analysisInterval = setInterval(fetchAnalysis, 300000);

    return () => {
      clearInterval(sensorInterval);
      clearInterval(analysisInterval);
    };
    */
  }, []);

  return { sensorData, analysisData, loading, error };
}
