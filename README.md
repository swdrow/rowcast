# RowCast

**Intelligent Rowing Conditions Platform**

RowCast is a full-stack weather analytics platform that provides real-time rowing condition scores by aggregating data from NOAA, USGS, and weather APIs. Built for rowers on the Schuylkill River, it helps athletes make informed decisions about when and where to row.

![RowCast Score](https://img.shields.io/badge/Score-0--10-blue)
![Python](https://img.shields.io/badge/Python-3.9+-green)
![React](https://img.shields.io/badge/React-18-blue)
![Flask](https://img.shields.io/badge/Flask-2.3-lightgrey)

## Features

### Smart Scoring Algorithm
- **RowCast Score (0-10)**: Proprietary exponential decay algorithm analyzing multiple factors
- **Real-time Conditions**: Current weather, water flow, and safety data
- **24-Hour Forecast**: Hourly predictions for optimal planning
- **7-Day Extended Forecast**: Long-range planning with NOAA integration

### Factors Analyzed
| Factor | Weight | Source |
|--------|--------|--------|
| Wind Speed & Direction | 1.0 | Open-Meteo |
| River Flow Rate | 0.9 | USGS |
| Safety Alerts | 1.2 | NWS |
| Temperature | 0.8 | Open-Meteo |
| Precipitation | 0.8 | Open-Meteo |
| UV Index | 0.6 | Open-Meteo |
| Water Temperature | 0.7 | USGS |

### Interactive Dashboard
- Modern glassmorphism UI with dark theme
- Live auto-refreshing data (5-minute intervals)
- Interactive charts and score trends
- Color-coded safety alerts
- Wind direction vs. river course analysis

### RESTful API
- Comprehensive endpoints for all data
- Redis-cached responses for performance
- JSON format for easy integration
- Full documentation at `/docs`

## Project Structure

```
rowcast/
├── backend/                 # Flask API Server
│   ├── app/
│   │   ├── __init__.py     # App factory with CORS & logging
│   │   ├── routes.py       # API endpoints
│   │   ├── rowcast.py      # Scoring algorithm
│   │   ├── fetchers.py     # External API integrations
│   │   ├── tasks.py        # Background data refresh jobs
│   │   ├── extensions.py   # Flask extensions (Redis, Scheduler)
│   │   ├── utils.py        # Utility functions
│   │   ├── templates/      # HTML templates
│   │   └── static/         # Static assets
│   ├── requirements.txt
│   └── wsgi.py
│
├── frontend/               # React/Vite Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── layout/         # Layout components
│   │   ├── sections/       # Page sections
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # CSS/styling
│   ├── vite.config.js
│   └── package.json
│
├── docs/                   # Documentation
├── scripts/                # Development & deployment scripts
└── README.md
```

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- Redis server

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or: venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Start Redis (if not running)
redis-server &

# Run development server
flask run --port 5000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Full Stack Development

```bash
# From root directory
./scripts/dev.sh
```

## API Endpoints

### Core Endpoints
| Endpoint | Description |
|----------|-------------|
| `GET /api/rowcast` | Current RowCast score |
| `GET /api/rowcast/forecast` | 24-hour score forecast |
| `GET /api/weather/current` | Current weather conditions |
| `GET /api/water/current` | Current water conditions |
| `GET /api/complete` | All data in single response |

### Extended Endpoints
| Endpoint | Description |
|----------|-------------|
| `GET /api/rowcast/forecast/extended` | 7-day forecast |
| `GET /api/noaa/stageflow` | NOAA river stageflow data |
| `GET /api/rowcast/at/<timestamp>` | Score at specific time |
| `GET /docs` | API documentation |
| `GET /dashboard` | Interactive dashboard |

## Scoring Algorithm

The RowCast score uses an exponential decay model that multiplies individual component scores:

```
Final Score = 10 × (wind_score × flow_score × safety_score × temp_score × precip_score × uv_score × water_temp_score)^(1/total_weight)
```

### Wind Scoring
- 0-4 mph: Perfect (1.0)
- 4-8 mph: Excellent (exponential decay)
- 8-15 mph: Good to Fair
- 15-25 mph: Poor
- 25+ mph: Dangerous (0.1)

### Flow Scoring
- < 500 cfs: Too low (0.0)
- 500-1500 cfs: Rising score
- 1500-8000 cfs: Optimal (1.0)
- 8000+ cfs: Declining (flood risk)

## Environment Variables

Create a `.env` file in the backend directory:

```bash
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here

# Redis
REDIS_URL=redis://localhost:6379/0

# Data Sources (no API keys required - uses public APIs)
USGS_SITE_ID=01474500
NOAA_STATION_ID=PHBP1
```

## Deployment

### Backend (Railway/Heroku)
```bash
cd backend
# Deploy with your preferred platform
```

### Frontend (Cloudflare Pages/Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

## Technology Stack

### Backend
- **Flask** - Web framework
- **Redis** - Caching layer
- **APScheduler** - Background job scheduling
- **Requests** - HTTP client for external APIs

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Chart.js** - Data visualization

### Data Sources
- **Open-Meteo** - Weather data (no API key required)
- **USGS Water Services** - River flow data
- **NOAA** - Stageflow forecasts & weather alerts
- **NWS** - Weather advisories

## Machine Learning Roadmap

Currently in development:
- Wave height prediction models
- Wave direction forecasting
- Extended condition predictions
- Automated safety advisories
- Historical pattern analysis

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

**Sam Duncan**
- GitHub: [@swdrow](https://github.com/swdrow)
- Website: [samwduncan.com](https://samwduncan.com)

---

Built with care for the rowing community on the Schuylkill River.
