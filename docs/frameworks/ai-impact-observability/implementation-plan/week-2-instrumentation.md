# Plan de Implementación - Semana 2: Instrumentación y Dashboards

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Duración**: 5 días laborales

---

## Objetivo

Automatizar la recolección de métricas y crear dashboards para monitoreo continuo antes y después de adoptar IA.

**Entregables**:
- ✅ Scripts de Git analytics automatizados
- ✅ Firebase Crashlytics integration automatizada
- ✅ Dashboard de métricas en tiempo real
- ✅ Alertas para regression de métricas

---

## Día 1-2: Automatizar Git Analytics

### Script Python para Lead Time

**Archivo**: `scripts/git-analytics.py`

```python
#!/usr/bin/env python3
import subprocess
import json
from datetime import datetime, timedelta

def get_lead_time(since_days=90):
    result = subprocess.run(
        ['git', 'log', f'--since={since_days} days ago',
         '--pretty=format:%H,%an,%ad,%s', '--date=iso'],
        capture_output=True, text=True
    )

    commits = []
    for line in result.stdout.split('\n'):
        if not line: continue
        hash, author, date, message = line.split(',', 3)
        commits.append({
            'hash': hash,
            'author': author,
            'date': date,
            'message': message
        })

    # Calcular lead time (simplificado)
    # En producción: match commits con tags de release

    return commits

if __name__ == '__main__':
    commits = get_lead_time()
    print(f"Total commits (90 días): {len(commits)}")
    print(json.dumps(commits[:5], indent=2))
```

### Cron Job para Ejecución Semanal

```bash
# Ejecutar cada lunes a las 9am
0 9 * * 1 /path/to/venv/bin/python3 /path/to/git-analytics.py > /path/to/measurements/weekly/git-$(date +\%Y\%m\%d).json
```

---

## Día 3: Integrate Firebase Crashlytics API

### Script para CFR Automatizado

**Archivo**: `scripts/crashlytics-metrics.py`

```python
#!/usr/bin/env python3
import requests
import os

FIREBASE_PROJECT_ID = os.getenv('FIREBASE_PROJECT_ID')
API_KEY = os.getenv('FIREBASE_API_KEY')

def get_crash_free_rate(days=30):
    # Usar Firebase REST API
    url = f"https://firebasecrashlytics.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}/apps"
    headers = {'Authorization': f'Bearer {API_KEY}'}

    response = requests.get(url, headers=headers)
    data = response.json()

    # Extraer metrics
    crash_free_rate = data['crashFreeRate']
    total_sessions = data['totalSessions']

    return {
        'crash_free_rate': crash_free_rate,
        'cfr': 1 - crash_free_rate,
        'total_sessions': total_sessions
    }

if __name__ == '__main__':
    metrics = get_crash_free_rate()
    print(f"Crash-Free Rate: {metrics['crash_free_rate']:.2%}")
    print(f"CFR: {metrics['cfr']:.2%}")
```

---

## Día 4-5: Dashboard de Métricas

### Opción A: Dashboard Web Simple (HTML + Chart.js)

**Archivo**: `dashboards/metrics-dashboard.html`

```html
<!DOCTYPE html>
<html>
<head>
    <title>AI Impact Metrics Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1>📊 AI Impact Dashboard</h1>

    <div class="metrics-grid">
        <div class="metric-card">
            <h3>Lead Time</h3>
            <p class="value" id="leadTime">--</p>
            <p class="change" id="leadTimeChange">--</p>
        </div>

        <div class="metric-card">
            <h3>NPS</h3>
            <p class="value" id="nps">--</p>
            <p class="change" id="npsChange">--</p>
        </div>

        <div class="metric-card">
            <h3>CFR</h3>
            <p class="value" id="cfr">--</p>
            <p class="change" id="cfrChange">--</p>
        </div>

        <div class="metric-card">
            <h3>Velocity</h3>
            <p class="value" id="velocity">--</p>
            <p class="change" id="velocityChange">--</p>
        </div>
    </div>

    <canvas id="trendChart"></canvas>

    <script>
        // Cargar métricas desde JSON
        fetch('measurements/latest/metrics.json')
            .then(r => r.json())
            .then(data => {
                document.getElementById('leadTime').textContent = data.leadTime + 'd';
                document.getElementById('nps').textContent = data.nps;
                // etc.
            });

        // Chart.js para trends
        const ctx = document.getElementById('trendChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'NPS',
                    data: [15, 18, 32, 45]
                }]
            }
        });
    </script>
</body>
</html>
```

### Opción B: Grafana Dashboard (Más Robusto)

**Prerequisitos**: Docker + InfluxDB + Grafana

```bash
# docker-compose.yml
version: '3'
services:
  influxdb:
    image: influxdb:latest
    ports:
      - "8086:8086"
    volumes:
      - ./influxdb-data:/var/lib/influxdb

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    volumes:
      - ./grafana-data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

**Script para Push Metrics a InfluxDB**:

```python
from influxdb import InfluxDBClient

client = InfluxDBClient(host='localhost', port=8086)
client.create_database('ai_impact_metrics')

json_body = [
    {
        "measurement": "dora_metrics",
        "tags": {
            "team": "flutter",
            "metric": "lead_time"
        },
        "fields": {
            "value": 12.3
        }
    }
]

client.write_points(json_body, database='ai_impact_metrics')
```

---

## Checkpoint Semana 2

- [ ] Scripts de Git analytics automatizados
- [ ] Crashlytics API integration funcionando
- [ ] Dashboard deployado (HTML simple o Grafana)
- [ ] Cron jobs configurados para ejecución semanal
- [ ] README de dashboards con instrucciones de acceso

---

## Próxima Semana

**Semana 3**: Ejecutar piloto de IA con grupo selecto
Ver: `implementation-plan/week-3-pilot.md`

---

**Tiempo Total**: 15-20 horas

**Última Actualización**: 2025-11-13
