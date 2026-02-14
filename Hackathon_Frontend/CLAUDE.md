# CLAUDE.md - Guidance for Claude Code

## GreenSense - Hackathon MVP

Real-time environmental dashboard. Read-only, no authentication.

**Stack:** Arduino sensors -> Flask API -> PostgreSQL, React (Vite) frontend, backboard.io for AI insights

**Key constraint:** Frontend never calls AI directly. All AI logic is backend-only.

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
pip install flask flask-cors psycopg2-binary python-dotenv requests
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
VITE_API_BASE_URL=http://localhost:5000
```

**Usage in code:**

```javascript
const API_BASE = import.meta.env.VITE_API_BASE_URL;

fetch(`${API_BASE}/latest`)
fetch(`${API_BASE}/analysis`)
```

**Rules:**
- Never hardcode URLs
- Never store secrets in frontend env (only public URLs in `VITE_` vars)
- `.env` and `*.local` files are in `.gitignore`
- If backend changes (Flask -> Spring Boot), only update `VITE_API_BASE_URL`

---

## API Contract

### GET /latest

```json
{
  "temperature": number,
  "humidity": number,
  "timestamp": string,
  "greenScore": number
}
```

### GET /analysis

```json
{
  "recommendation": string,
  "environmentalRisk": string,
  "sustainabilityImpact": string
}
```

**Polling rules:**
- Poll `/latest` every 20-30 seconds
- Poll `/analysis` max every 5-10 minutes
- No infinite useEffect loops
- No uncontrolled re-renders triggering fetch

**Assumptions:**
- Endpoints may move (base URL is configurable)
- Response structure remains stable

---

## Project Context

### Architecture

```
Arduino -> Flask API -> PostgreSQL
React   -> Flask API
Flask   -> backboard.io (AI)
```

Frontend = display only
Backend = logic + AI + rate limiting

### Technical Notes

- Tailwind CSS is referenced but NOT yet configured in this project
- ESLint uses flat config format (`eslint.config.js`) with React hooks rules
- No API keys in React code
- No backboard.io calls from frontend

### AI Usage Controls (Backend Only)

Backend rate limits to prevent token waste:
- Only trigger AI every 10 min OR if temp delta > 3F OR humidity delta > 5%
- Cache last AI response
- `MAX_AI_CALLS_PER_HOUR=10`, `MAX_AI_CALLS_PER_DAY=50`
- If limit exceeded, return cached result

### Sustainability Framing

GreenSense encourages passive cooling, reduces HVAC waste, detects mold risk, improves indoor energy efficiency.

MVP: Secure + Rate-limited + Demo-ready.
