# RowCast Scoring Algorithm

## Overview

The RowCast scoring algorithm uses an **exponential decay model** to evaluate rowing conditions on a 0-10 scale. Unlike simple linear scoring, exponential decay provides more nuanced transitions between condition categories and better reflects the non-linear relationship between weather factors and rowing safety/quality.

## Score Calculation

The final score is calculated by combining individual component scores with their respective weights:

```python
weighted_product = (
    wind_score ** weights['wind'] *
    flow_score ** weights['flow'] *
    safety_score ** weights['safety'] *
    temp_score ** weights['temp'] *
    precip_score ** weights['precip'] *
    uv_score ** weights['uv'] *
    water_temp_score ** weights['water_temp']
)

total_weight = sum(weights.values())
final_score = 10.0 * (weighted_product ** (1.0 / total_weight))
```

## Component Weights

| Factor | Weight | Rationale |
|--------|--------|-----------|
| Wind | 1.0 | Primary factor affecting rowing conditions |
| Flow | 0.9 | Critical for safety, slightly less immediate impact |
| Safety | 1.2 | Highest priority - overrides other factors |
| Temperature | 0.8 | Comfort factor, less critical than safety |
| Precipitation | 0.8 | Affects visibility and comfort |
| UV Index | 0.6 | Long-term health concern |
| Water Temp | 0.7 | Cold water immersion risk |

## Individual Score Functions

### Wind Score

Wind is the most impactful factor for rowing conditions. The scoring uses multi-stage exponential decay:

```
0-4 mph:   1.0 (Perfect - calm conditions)
4-8 mph:   exp(-0.12 × (wind - 4))  → 0.62 at 8 mph
8-15 mph:  0.62 × exp(-0.10 × (wind - 8))  → 0.31 at 15 mph
15-25 mph: 0.31 × exp(-0.08 × (wind - 15)) → 0.14 at 25 mph
25+ mph:   0.1 (Dangerous - rowing not recommended)
```

**Wind Direction Modifier:**
- Headwind/Tailwind (within 30° of course): 1.0× (easiest to manage)
- Quartering wind (30-60°): 0.95×
- Crosswind (60-90°): 0.85× (most challenging)

### Flow Rate Score (River Current)

Flow rate scoring reflects the optimal range for the Schuylkill River:

```
< 500 cfs:     0.0 (Too low - rocks exposed, navigation hazards)
500-1000 cfs:  Sharp rise from 0.0 to 0.5
1000-1500 cfs: Rise from 0.5 to 1.0
1500-8000 cfs: 1.0 (Optimal range)
8000-15000:    Exponential decay (flood conditions developing)
> 15000 cfs:   0.1 (Flood stage - dangerous)
```

### Safety Score

Safety score integrates multiple hazard factors:

```python
safety_score = 1.0

# Weather alerts (NWS)
if severe_thunderstorm_warning: safety_score *= 0.1
if flood_warning: safety_score *= 0.2
if wind_advisory: safety_score *= 0.5
if heat_advisory: safety_score *= 0.7

# Visibility
if visibility < 1 mile: safety_score *= 0.3
if visibility < 3 miles: safety_score *= 0.7

# Lightning risk
if lightning_probability > 50%: safety_score *= 0.2
if lightning_probability > 25%: safety_score *= 0.5
```

### Temperature Score

Comfort-based scoring with optimal range:

```
< 35°F:    0.3 (Cold - hypothermia risk)
35-50°F:   Linear rise to 0.7
50-65°F:   Rise to 1.0
65-85°F:   1.0 (Optimal range)
85-95°F:   Decay to 0.7 (Heat stress begins)
> 95°F:    Decay to 0.4 (Dangerous heat)
```

### Precipitation Score

```
0 mm/hr:      1.0 (Clear)
0-0.5 mm/hr:  0.9 (Light drizzle)
0.5-2 mm/hr:  0.7 (Light rain)
2-5 mm/hr:    0.5 (Moderate rain)
5-10 mm/hr:   0.3 (Heavy rain)
> 10 mm/hr:   0.1 (Severe - visibility compromised)
```

### UV Index Score

```
0-2:   1.0 (Low)
3-5:   0.9 (Moderate)
6-7:   0.8 (High)
8-10:  0.6 (Very High)
11+:   0.4 (Extreme)
```

### Water Temperature Score

Cold water immersion risk assessment:

```
< 50°F:  0.5 (Cold water shock risk)
50-60°F: 0.7 (Caution advised)
60-75°F: 1.0 (Optimal)
75-85°F: 0.9 (Warm but acceptable)
> 85°F:  0.7 (Bacterial growth concerns)
```

## Score Interpretation

| Score | Rating | Recommendation |
|-------|--------|----------------|
| 9-10 | Excellent | Perfect conditions - ideal for racing/training |
| 7-9 | Good | Great for most activities |
| 5-7 | Fair | Acceptable with caution |
| 3-5 | Poor | Experienced rowers only |
| 1-3 | Bad | Not recommended |
| 0-1 | Dangerous | Do not row |

## Data Sources

- **Weather Data**: Open-Meteo API (hourly updates)
- **River Flow**: USGS Water Services (15-minute intervals)
- **Stageflow Forecast**: NOAA River Forecast Center
- **Weather Alerts**: National Weather Service API

## Algorithm Updates

The scoring algorithm is continuously refined based on:
1. Feedback from local rowing clubs
2. Incident reports and near-misses
3. Correlation with actual rowing conditions
4. Seasonal pattern analysis

## Machine Learning Roadmap

Future enhancements under development:
- Wave height prediction from wind patterns
- Wave direction forecasting
- Multi-day condition pattern recognition
- Personalized recommendations based on experience level
