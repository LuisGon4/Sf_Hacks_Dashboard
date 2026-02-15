# CLAUDE.md - Guidance for Claude Code

## GreenSense - Hackathon MVP

Real-time environmental dashboard. Read-only, no authentication.

**Stack:** Arduino sensors -> Flask API (ngrok tunnel) -> React (Vite) frontend

**Key constraint:** Frontend displays raw Arduino data only. No AI, no outdoor weather.

---

## Dev Commands

### Frontend

```bash
npm install
npm run dev
```

### Backend (separate repo)

```bash
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors pyserial python-dotenv
python app.py
```

### ngrok (for public tunnel)

```bash
ngrok http 5000
```

Update `VITE_API_BASE_URL` to ngrok HTTPS URL when tunneling.

---

## API Configuration (CRITICAL)

API endpoints MUST be configurable via environment variable.

**.env (frontend):**

```
VITE_API_BASE_URL=https://your-ngrok-url.ngrok-free.dev
```

**Usage in code:**

```javascript
const API_BASE = import.meta.env.VITE_API_BASE_URL;

fetch(`${API_BASE}/`)
```

**Rules:**
- Never hardcode URLs
- Never store secrets in frontend env (only public URLs in `VITE_` vars)
- `.env` and `*.local` files are in `.gitignore`
- Include `ngrok-skip-browser-warning: true` header in fetch requests

---

## API Contract

### GET / (root)

Backend returns raw Arduino sensor strings:

```json
{
  "CALL": "SUCCESS END OP OF dataHandler -> arduino information",
  "Humidity": "Humidity=54.0",
  "Temperature": "T=20.0"
}
```

**Frontend parsing:**
- Temperature: extract number from `"T=20.0"` → `20.0` (Celsius)
- Humidity: extract number from `"Humidity=54.0"` → `54.0` (%)
- Convert temperature from °C to °F: `(celsius * 9/5) + 32`
- Compute `greenScore` locally (ideal: 68–76°F, 30–50% humidity)
- Add `timestamp` from `new Date().toISOString()` (backend doesn't provide one)

**Polling rules:**
- Poll `/` every 30 seconds
- No infinite useEffect loops
- No uncontrolled re-renders triggering fetch

**Assumptions:**
- Endpoints may move (base URL is configurable)
- Response structure remains stable

---

## Project Context

### Architecture

```
Arduino (USB serial) -> Flask API -> ngrok tunnel
React Frontend       -> ngrok URL -> display data
```

Frontend = display only (temperature °F, humidity %, green score)
Backend = serial reader + JSON server

### Technical Notes

- Tailwind CSS is referenced but NOT yet configured in this project
- ESLint uses flat config format (`eslint.config.js`) with React hooks rules
- No API keys in React code
- WeatherBar, AnalysisCard, ChatPanel components exist but are unused (kept for potential future use)

### Sustainability Framing

GreenSense encourages passive cooling, reduces HVAC waste, detects mold risk, improves indoor energy efficiency.

MVP: Simple + Demo-ready.
