# BACKEND_CLAUDE.md - GreenSense Backend

## Project Overview

GreenSense backend reads Arduino sensor data over USB serial and serves it via Flask + ngrok.

**This is read-only, no authentication.** The frontend just displays data.

---

## Stack

- **Flask** — API server
- **pyserial** — reads Arduino sensor data over USB serial
- **ngrok** — tunnels Flask to a public HTTPS URL for the frontend

---

## Architecture

```
Arduino (USB serial) → Flask → ngrok → React Frontend (GET /)
```

- Arduino sends temperature + humidity over serial
- Flask reads serial, serves raw data to frontend
- Frontend parses strings and converts units

---

## API Contract

### GET / (root)

Returns raw Arduino sensor data as strings:

```json
{
  "CALL": "SUCCESS END OP OF dataHandler -> arduino information",
  "Humidity": "Humidity=54.0",
  "Temperature": "T=20.0"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `CALL` | string | Status message |
| `Temperature` | string | Raw Arduino string, e.g. `"T=20.0"` (Celsius) |
| `Humidity` | string | Raw Arduino string, e.g. `"Humidity=54.0"` (%) |

**Frontend is responsible for:**
- Parsing numeric values from the strings
- Converting °C to °F
- Computing green score locally

---

## Dev Commands

```bash
# Setup
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors pyserial python-dotenv

# Run
python app.py

# Tunnel (separate terminal)
ngrok http 5000
```

After starting ngrok, set the frontend's `VITE_API_BASE_URL` to the ngrok HTTPS URL.

---

## CORS Configuration

```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
```

---

## Security Rules

- `.env` in `.gitignore`
- CORS enabled (flask-cors)
- No secrets in API responses
