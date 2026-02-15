import { useState, useEffect } from 'react';

const WMO_CONDITIONS = {
  0: 'Clear',
  1: 'Clear',
  2: 'Clouds',
  3: 'Clouds',
  45: 'Fog',
  48: 'Fog',
  51: 'Drizzle',
  53: 'Drizzle',
  55: 'Drizzle',
  56: 'Drizzle',
  57: 'Drizzle',
  61: 'Rain',
  63: 'Rain',
  65: 'Rain',
  66: 'Rain',
  67: 'Rain',
  71: 'Snow',
  73: 'Snow',
  75: 'Snow',
  77: 'Snow',
  80: 'Rain',
  81: 'Rain',
  82: 'Rain',
  85: 'Snow',
  86: 'Snow',
  95: 'Thunderstorm',
  96: 'Thunderstorm',
  99: 'Thunderstorm',
};

const SF_LAT = 37.77;
const SF_LON = -122.42;
const POLL_INTERVAL = 10 * 60 * 1000; // 10 minutes

function cToF(c) {
  return (c * 9) / 5 + 32;
}

async function getPosition() {
  if (!navigator.geolocation) {
    return { lat: SF_LAT, lon: SF_LON };
  }

  // Check if permission is already denied to avoid browser warnings
  if (navigator.permissions) {
    try {
      const status = await navigator.permissions.query({ name: 'geolocation' });
      if (status.state === 'denied') {
        return { lat: SF_LAT, lon: SF_LON };
      }
    } catch {
      // permissions API not supported — fall through to normal request
    }
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => resolve({ lat: SF_LAT, lon: SF_LON }),
      { timeout: 5000 }
    );
  });
}

async function getCityName(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    );
    if (!res.ok) return 'Your Location';
    const data = await res.json();
    return data.address?.city || data.address?.town || data.address?.village || 'Your Location';
  } catch {
    return 'Your Location';
  }
}

async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  const c = data.current;

  return {
    temperature: cToF(c.temperature_2m),
    humidity: c.relative_humidity_2m,
    feelsLike: cToF(c.apparent_temperature),
    condition: WMO_CONDITIONS[c.weather_code] || 'Clear',
  };
}

export function useWeatherData() {
  const [outdoor, setOutdoor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { lat, lon } = await getPosition();
        const [weather, city] = await Promise.all([
          fetchWeather(lat, lon),
          getCityName(lat, lon),
        ]);
        if (!cancelled) {
          setOutdoor({ ...weather, city });
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const id = setInterval(load, POLL_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return { outdoor, loading, error };
}
