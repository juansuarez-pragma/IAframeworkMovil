# Guía de Medición: Métricas DORA para Flutter

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Última Actualización**: 2025-11-13
**Tiempo Estimado**: 2-3 horas para configurar las 4 métricas

---

## Propósito

Esta guía proporciona metodologías paso a paso para medir las 4 métricas DORA (DevOps Research and Assessment) adaptadas específicamente para equipos de desarrollo móvil Flutter:

1. **Lead Time** - Tiempo desde commit hasta producción
2. **Deployment Frequency** - Qué tan seguido se despliega
3. **Change Failure Rate** - % de deploys que causan fallos
4. **Mean Time to Restore (MTTR)** - Tiempo para recuperar servicio

**Audiencia**: Engineering Managers, Team Leads, DevOps Engineers

---

## Prerequisitos

Antes de comenzar, asegúrate de tener acceso a:

- [ ] **Repositorio Git** con historial de commits (GitHub, GitLab, Bitbucket)
- [ ] **Firebase Crashlytics** o herramienta similar de crash reporting (Sentry, Bugsnag)
- [ ] **CI/CD Pipeline** logs (GitHub Actions, Bitrise, Codemagic, etc.)
- [ ] **App Store Connect** y **Google Play Console** access (para fechas de aprobación)
- [ ] **Issue Tracker** (Jira, Linear, GitHub Issues) para tracking de incidentes

---

## Métrica 1: Lead Time para Cambios

### ¿Qué Estamos Midiendo?

Tiempo transcurrido desde que un developer hace commit de código hasta que ese código está disponible para usuarios finales en producción (App Store + Play Store).

**En Flutter, esto incluye**:
- Tiempo de desarrollo (código + code review)
- Build multiplataforma (iOS AOT + Android JIT/AOT)
- Testing (unit, widget, integration)
- Submisión a tiendas
- **Revisión de tiendas** (App Store 24-48h, Play Store 2-8h)

### Método de Medición

#### Opción 1: Manual (Más Simple, Menos Preciso)

**Paso 1**: Selecciona 10-20 features o fixes recientes

**Paso 2**: Para cada feature, registra en spreadsheet:

| Feature | Commit Inicial | Fecha | Aprobación App Store | Fecha | Aprobación Play Store | Fecha | Lead Time Total |
|---------|---------------|-------|---------------------|-------|---------------------|-------|-----------------|
| Login with biometrics | abc123 | 2025-10-15 | Approved | 2025-10-27 | Approved | 2025-10-25 | 12 días |
| Dark mode toggle | def456 | 2025-10-20 | Approved | 2025-11-01 | Approved | 2025-10-30 | 11 días |

**Paso 3**: Calcular promedio de Lead Time Total

```
Lead Time Promedio = Suma de Lead Times ÷ Número de Features
Ejemplo: (12 + 11 + 10 + 13 + 9 + ...) ÷ 10 = 11.5 días
```

#### Opción 2: Semiautomática (Recomendada)

**Paso 1**: Extraer commits de últimos 30-90 días

```bash
# Obtener commits con formato: hash, autor, fecha, mensaje
git log --since="90 days ago" --pretty=format:'%H,%an,%ad,%s' --date=iso --no-merges > commits.csv
```

**Output ejemplo**:
```csv
abc123def,Juan Pérez,2025-10-15 14:23:00 -0500,feat: add biometric login
def456ghi,María García,2025-10-20 09:15:00 -0500,feat: implement dark mode
```

**Paso 2**: Crear script para enriquecer con fechas de tiendas

Debido a que App Store Connect y Play Console no tienen APIs públicas fáciles para fechas de aprobación, necesitas:

**Opción 2a**: Scraping manual de consolas
- Exportar historial de submissions de App Store Connect (manualmente)
- Exportar historial de releases de Play Console (manualmente)

**Opción 2b**: Usar tags de Git como proxy

Si tu equipo tagea cada release con fecha:

```bash
# Listar tags con fecha
git log --tags --simplify-by-decoration --pretty="format:%ai %d" --since="90 days ago"
```

Output ejemplo:
```
2025-10-27 16:00:00 -0500 (tag: v1.5.2-production)
2025-10-20 14:30:00 -0500 (tag: v1.5.1-production)
```

**Paso 3**: Calcular Lead Time por commit

Script Python de ejemplo:

```python
#!/usr/bin/env python3
import csv
from datetime import datetime

# Leer commits.csv
commits = []
with open('commits.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        commit_hash, author, date_str, message = row
        commit_date = datetime.fromisoformat(date_str.replace(' -0500', ''))
        commits.append({
            'hash': commit_hash,
            'date': commit_date,
            'message': message
        })

# Leer production_dates.csv (manualmente creado desde App Store/Play Store)
# Format: version, app_store_approval_date, play_store_approval_date
production_dates = []
with open('production_dates.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip header
    for row in reader:
        version, app_store_date, play_store_date = row
        production_dates.append({
            'version': version,
            'app_store': datetime.fromisoformat(app_store_date),
            'play_store': datetime.fromisoformat(play_store_date)
        })

# Mapear commits a versiones (asume mensaje de commit tiene version tag)
# Calcular Lead Time
lead_times = []
for commit in commits:
    # Buscar la versión de producción más cercana DESPUÉS de este commit
    for prod in production_dates:
        if prod['play_store'] > commit['date']:  # Usar Play Store como reference (más rápido)
            lead_time_days = (prod['play_store'] - commit['date']).days
            lead_times.append(lead_time_days)
            break

# Calcular promedio
if lead_times:
    avg_lead_time = sum(lead_times) / len(lead_times)
    print(f"Lead Time Promedio: {avg_lead_time:.1f} días")
    print(f"Min: {min(lead_times)} días, Max: {max(lead_times)} días")
    print(f"Mediana: {sorted(lead_times)[len(lead_times)//2]} días")
```

### Segmentación Recomendada

Separa Lead Time en componentes controlables vs no controlables:

| Componente | Tiempo Típico | Controlable por Equipo |
|------------|---------------|------------------------|
| Desarrollo + Code Review | 3-5 días | ✅ Sí |
| CI/CD (builds + tests) | 0.5-1 día | ✅ Sí |
| QA/Testing manual | 1-2 días | ✅ Sí |
| Submisión a tiendas | 0.5 día | ✅ Sí |
| **Revisión App Store** | 24-48 horas | ❌ No |
| **Revisión Play Store** | 2-8 horas | ❌ No |

**Cálculo de tiempo controlable**:
```
Tiempo Controlable = Lead Time Total - Tiempo de Revisión de Tiendas
Ejemplo: 12 días - 2 días (tiendas) = 10 días controlables
```

### Frecuencia de Medición

- **Baseline**: Medir durante 30-90 días (mínimo 10 releases)
- **Post-IA**: Re-medir después de 90 días de uso de herramientas IA
- **Ongoing**: Tracking mensual en dashboard

### Targets y Benchmarks

| Nivel | Lead Time Total | Lead Time Controlable |
|-------|-----------------|----------------------|
| **Elite** (DORA top 10%) | <7 días | <5 días |
| **High** (DORA top 25%) | 7-14 días | 5-10 días |
| **Medium** (DORA avg) | 14-30 días | 10-20 días |
| **Low** (DORA bottom 25%) | >30 días | >20 días |

**Meta con IA**: Reducir Lead Time Controlable en 40-50%

---

## Métrica 2: Deployment Frequency (Frecuencia de Despliegue)

### ¿Qué Estamos Midiendo?

Qué tan frecuentemente el equipo despliega código a producción (app stores).

**Nota Flutter**: Limitado por políticas de tiendas. Frecuencia típica: Quincenal o mensual.

### Método de Medición

#### Opción 1: Contar Tags de Git

Si tu equipo tagea cada release de producción:

```bash
# Contar releases de últimos 6 meses
git log --tags --simplify-by-decoration --pretty="format:%ai %d" --since="6 months ago" | grep "tag:" | wc -l

# Ejemplo output: 12 releases en 6 meses

# Calcular frecuencia
# 12 releases ÷ 6 meses = 2 releases/mes
# o: 12 releases ÷ 26 semanas ≈ 0.46 releases/semana (cada ~2 semanas)
```

#### Opción 2: Query a App Store Connect / Play Console

**App Store Connect** (vía web scraping o manual):
1. Log in a App Store Connect
2. Ir a "My Apps" → [Tu App] → "Activity"
3. Filtrar por "Ready for Sale" en últimos 6 meses
4. Contar número de versiones aprobadas

**Play Console**:
1. Log in a Google Play Console
2. Ir a "Release" → "Production" → "Release dashboard"
3. Ver historial de releases en últimos 6 meses

#### Opción 3: Usar GitHub Releases / GitLab Releases

Si usas GitHub/GitLab releases:

```bash
# GitHub CLI
gh release list --limit 100 | grep -E "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [0-9]{1,2}, 2025" | wc -l

# GitLab CLI (glab)
glab release list | wc -l
```

### Script de Ejemplo

```python
#!/usr/bin/env python3
from datetime import datetime, timedelta
import subprocess

# Obtener tags de últimos 180 días
result = subprocess.run(
    ['git', 'log', '--tags', '--simplify-by-decoration', '--pretty=format:%ai %d', '--since=180 days ago'],
    capture_output=True,
    text=True
)

# Filtrar solo tags de producción (asume naming convention "v*.*.*-production")
production_tags = [line for line in result.stdout.split('\n') if 'production' in line]

num_deploys = len(production_tags)
period_days = 180
period_weeks = period_days / 7
period_months = period_days / 30

print(f"Deployment Frequency (últimos {period_days} días):")
print(f"  Total deploys: {num_deploys}")
print(f"  Deploys/mes: {num_deploys / period_months:.1f}")
print(f"  Deploys/semana: {num_deploys / period_weeks:.2f}")
print(f"  Días promedio entre deploys: {period_days / num_deploys:.0f}")
```

### Frecuencia de Medición

- **Baseline**: Medir últimos 6 meses
- **Post-IA**: Re-medir después de 90-180 días
- **Ongoing**: Tracking trimestral

### Targets y Benchmarks

| Nivel | Deployment Frequency (Móvil) |
|-------|------------------------------|
| **Elite** | Semanal (4+ deploys/mes) |
| **High** | Quincenal (2-3 deploys/mes) |
| **Medium** | Mensual (1 deploy/mes) |
| **Low** | <1 deploy/mes |

**Nota**: Para móvil, "Elite" es diferente que para web (donde puede ser diario/horario).

**Meta con IA**: Aumentar frecuencia en 50% (ej: de quincenal a semanal)

---

## Métrica 3: Change Failure Rate (Tasa de Fallos en Cambios)

### ¿Qué Estamos Midiendo?

Porcentaje de deployments que causan fallos en producción requiriendo hotfix, rollback, o parche urgente.

**En móvil, medimos como**: **Crash-Free Users %** (inverso de usuarios con crashes)

### Método de Medición

#### Opción 1: Firebase Crashlytics (Recomendado)

**Paso 1**: Acceder a Firebase Console

1. Log in a Firebase Console: https://console.firebase.google.com
2. Selecciona tu proyecto
3. Ir a "Crashlytics" en menú lateral

**Paso 2**: Obtener métrica de Crash-Free Users

Firebase dashboard muestra directamente:
- **Crash-free users**: % de usuarios sin crashes en últimos 7/30 días
- **Crash-free sessions**: % de sesiones sin crashes

**Paso 3**: Filtrar por versión específica

- En Crashlytics dashboard, usar filtro "Version"
- Seleccionar versión reciente (ej: v1.5.2)
- Anotar "Crash-free users" para esa versión

**Ejemplo de registro**:

| Versión | Fecha Release | Crash-Free Users (7d) | Crash-Free Users (30d) |
|---------|---------------|------------------------|------------------------|
| v1.5.2 | 2025-10-27 | 99.1% | 98.8% |
| v1.5.1 | 2025-10-15 | 98.5% | 98.2% |
| v1.5.0 | 2025-10-01 | 98.9% | 98.6% |

**Paso 4**: Calcular Change Failure Rate

```
Change Failure Rate (CFR) = 100% - Crash-Free Users %

Ejemplo:
- Crash-Free Users: 98.5%
- CFR = 100% - 98.5% = 1.5%

Interpretación: 1.5% de usuarios experimentan al menos 1 crash
```

#### Opción 2: Usar Crashlytics API (Programático)

Firebase Admin SDK permite queries programáticas:

```javascript
// Node.js con Firebase Admin SDK
const admin = require('firebase-admin');
admin.initializeApp();

const crashlytics = admin.crashlytics();

async function getCrashFreeRate(version) {
  const sessionData = await crashlytics.getSessionData({
    version: version,
    days: 30
  });

  const crashFreeSessions = sessionData.crashFreeSessions;
  const totalSessions = sessionData.totalSessions;
  const crashFreeRate = (crashFreeSessions / totalSessions) * 100;

  console.log(`Version ${version}:`);
  console.log(`  Crash-free sessions: ${crashFreeRate.toFixed(2)}%`);
  console.log(`  Change Failure Rate: ${(100 - crashFreeRate).toFixed(2)}%`);

  return crashFreeRate;
}

// Usar
getCrashFreeRate('1.5.2');
```

#### Opción 3: Alternativa con Sentry

Si usas Sentry en lugar de Firebase:

```bash
# Sentry CLI (requiere auth token)
sentry-cli releases list --project=tu-proyecto

# Para cada release, obtener crash rate
sentry-cli releases info [VERSION] --project=tu-proyecto
```

### Frecuencia de Medición

- **Baseline**: Promediar últimos 10-20 releases
- **Por Release**: Medir cada nueva versión después de 7 y 30 días en producción
- **Ongoing**: Dashboard semanal/mensual

### Targets y Benchmarks

| Nivel | Crash-Free Users % | Change Failure Rate |
|-------|-------------------|---------------------|
| **Elite** | >99.5% | <0.5% |
| **High** | 99.0-99.5% | 0.5-1.0% |
| **Medium** | 98.0-99.0% | 1.0-2.0% |
| **Low** | <98.0% | >2.0% |

**Meta con IA**: Mejorar Crash-Free Users en 0.5-1.0 puntos porcentuales

### Consideraciones Especiales

**¿Qué cuenta como "failure"?**

En móvil, NO podemos hacer rollback instantáneo como en web. Por lo tanto, consideramos:

✅ **Cuenta como failure**:
- Crash rate >2% en primeras 48h de release
- Bugs críticos que requieren hotfix urgente
- Versión rechazada/retirada de tiendas

❌ **NO cuenta como failure**:
- Bugs menores reportados pero no urgentes
- Crashes en versiones muy antiguas (usuarios que no actualizan)

---

## Métrica 4: Mean Time to Restore (MTTR)

### ¿Qué Estamos Midiendo?

Tiempo promedio para restaurar servicio después de un incidente en producción.

**En Flutter, incluye**:
- Detección del incidente
- Diagnóstico y fix
- Build de hotfix
- Submisión de emergencia a tiendas
- **Revisión expedited** (App Store: 24h mínimo)

### Método de Medición

#### Prerequisito: Definir "Incidente"

Primero, define qué es un incidente crítico:

**Criterios ejemplo**:
- Crash rate >5% en primeras 24h
- Funcionalidad crítica rota (login, checkout, etc.)
- Pérdida de datos de usuarios
- Security vulnerability

#### Paso 1: Identificar Incidentes de Últimos 6 Meses

Query a tu issue tracker (Jira/Linear/GitHub):

**Jira JQL ejemplo**:
```jql
project = "MyApp"
AND type = "Bug"
AND priority = "Critical"
AND labels = "production"
AND created >= -6M
ORDER BY created DESC
```

**GitHub Issues ejemplo**:
```bash
# GitHub CLI
gh issue list --label "production,critical" --state closed --limit 100 --search "created:>2025-05-01"
```

#### Paso 2: Para Cada Incidente, Registrar Timestamps

Crea spreadsheet:

| Incidente | Descripción | Detección (T1) | Fix Deployed (T2) | MTTR (horas) |
|-----------|-------------|----------------|-------------------|--------------|
| PROD-123 | Crash en login Android 12 | 2025-10-15 08:00 | 2025-10-17 14:00 | 54h |
| PROD-124 | Memory leak en ListView | 2025-11-01 10:00 | 2025-11-03 16:00 | 54h |
| PROD-125 | Checkout button not responding | 2025-11-05 09:00 | 2025-11-07 11:00 | 50h |

**T1 (Detección)**: Timestamp de primera alerta (Crashlytics, customer support ticket, monitoring alert)

**T2 (Fix Deployed)**: Timestamp cuando versión con fix está aprobada en AMBAS tiendas (App Store + Play Store)

#### Paso 3: Calcular MTTR Promedio

```
MTTR = Suma de (T2 - T1) ÷ Número de Incidentes

Ejemplo:
Incidentes: 54h, 54h, 50h, 48h, 60h
MTTR = (54 + 54 + 50 + 48 + 60) ÷ 5 = 53.2 horas ≈ 2.2 días
```

#### Script de Ejemplo

```python
#!/usr/bin/env python3
from datetime import datetime
import csv

# Leer incidents.csv (creado manualmente de Jira/Linear)
incidents = []
with open('incidents.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        detection = datetime.fromisoformat(row['detection_timestamp'])
        resolution = datetime.fromisoformat(row['resolution_timestamp'])
        mttr_hours = (resolution - detection).total_seconds() / 3600
        incidents.append(mttr_hours)

# Calcular estadísticas
avg_mttr = sum(incidents) / len(incidents)
min_mttr = min(incidents)
max_mttr = max(incidents)
median_mttr = sorted(incidents)[len(incidents) // 2]

print(f"MTTR (Mean Time to Restore):")
print(f"  Promedio: {avg_mttr:.1f} horas ({avg_mttr/24:.1f} días)")
print(f"  Min: {min_mttr:.1f} horas ({min_mttr/24:.1f} días)")
print(f"  Max: {max_mttr:.1f} horas ({max_mttr/24:.1f} días)")
print(f"  Mediana: {median_mttr:.1f} horas ({median_mttr/24:.1f} días)")
```

### Segmentación de MTTR

Desglosa MTTR en componentes:

| Componente | Tiempo Típico | % del Total |
|------------|---------------|-------------|
| Detección → Diagnóstico | 2-4 horas | 5-10% |
| Diagnóstico → Fix Coded | 4-8 horas | 15-20% |
| Fix Coded → CI/CD Build | 0.5-1 hora | 2-5% |
| Build → Submitted to Stores | 1-2 horas | 2-5% |
| **Stores Review (App Store)** | **24-48 horas** | **60-70%** |
| **Stores Review (Play Store)** | **2-8 horas** | **5-10%** |

**Insight clave**: 70-80% del MTTR es tiempo de revisión de tiendas (NO controlable por equipo).

### Frecuencia de Medición

- **Baseline**: Últimos 6-12 meses (mínimo 5 incidentes críticos)
- **Post-IA**: Re-medir después de 6 meses
- **Ongoing**: Tracking trimestral

### Targets y Benchmarks

| Nivel | MTTR Total | MTTR Controlable |
|-------|-----------|------------------|
| **Elite** | <24 horas | <4 horas |
| **High** | 24-48 horas | 4-12 horas |
| **Medium** | 48-72 horas | 12-24 horas |
| **Low** | >72 horas | >24 horas |

**Nota**: Para móvil, MTTR <24h es excepcional debido a tiempos de revisión.

**Meta con IA**: Reducir MTTR Controlable en 30-40%

---

## Automatización y Dashboards

### Dashboard Recomendado (Grafana / Metabase / Google Sheets)

Crea dashboard con:

1. **Lead Time Trend** (gráfico de línea)
   - Eje X: Semanas/Meses
   - Eje Y: Lead Time (días)
   - Línea de baseline (promedio sin IA)
   - Línea de target (meta con IA)

2. **Deployment Frequency** (gráfico de barras)
   - Eje X: Meses
   - Eje Y: Número de deploys
   - Color: Verde si >target, Amarillo si =target, Rojo si <target

3. **Crash-Free Users %** (gráfico de línea por versión)
   - Eje X: Versiones de app
   - Eje Y: Crash-Free %
   - Línea de referencia en 99%

4. **MTTR** (gráfico de boxplot)
   - Mostrando min, median, max, outliers
   - Comparando períodos (pre-IA vs post-IA)

### Scripts de Automatización

#### Script 1: Daily DORA Metrics Collector

```bash
#!/bin/bash
# collect-dora-metrics.sh
# Ejecutar diariamente vía cron

DATE=$(date +%Y-%m-%d)
REPO_PATH="/path/to/your/flutter/repo"

cd $REPO_PATH

# Lead Time: Calcular promedio de últimos 30 días
LEAD_TIME=$(python3 scripts/calculate_lead_time.py --days 30)

# Deployment Frequency: Contar releases de último mes
DEPLOYS=$(git log --tags --simplify-by-decoration --pretty="format:%d" --since="30 days ago" | grep "tag:" | wc -l)

# Crash-Free Rate: Query Firebase (requiere Firebase Admin SDK configurado)
CRASH_FREE=$(python3 scripts/query_crashlytics.py --version latest --days 7)

# MTTR: Query Jira para incidentes resueltos en último mes
MTTR=$(python3 scripts/calculate_mttr.py --month current)

# Escribir a CSV para dashboard
echo "$DATE,$LEAD_TIME,$DEPLOYS,$CRASH_FREE,$MTTR" >> metrics/dora_metrics.csv

echo "DORA Metrics updated for $DATE"
```

---

## Troubleshooting

### Problema: No tengo acceso a App Store/Play Console fechas

**Solución 1**: Usar Git tags como proxy
- Tagear cada release cuando es submitted a tiendas
- Asumir +2 días para aprobación

**Solución 2**: Tracking manual
- Crear spreadsheet simple con fechas de submission y aprobación
- Actualizar manualmente cada release

### Problema: Firebase Crashlytics no está configurado

**Solución**: Configurar Firebase Crashlytics (15 minutos)

```yaml
# pubspec.yaml
dependencies:
  firebase_crashlytics: ^3.4.0

# main.dart
import 'package:firebase_crashlytics/firebase_crashlytics.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterError;

  runApp(MyApp());
}
```

### Problema: No tengo suficientes incidentes para medir MTTR

Si tienes <5 incidentes en 6 meses (¡excelente!), considera:
- Ampliar período a 12 meses
- Incluir incidentes de severidad "High" (no solo "Critical")
- Combinar con métricas de Change Failure Rate

---

## Checklist de Implementación

- [ ] **Lead Time**:
  - [ ] Acceso a Git repo configurado
  - [ ] Script de extracción de commits creado
  - [ ] Fechas de producción registradas (manual o automático)
  - [ ] Baseline de 30-90 días medido
  - [ ] Segmentación controlable vs no-controlable calculada

- [ ] **Deployment Frequency**:
  - [ ] Tags de Git o releases identificados
  - [ ] Frecuencia de últimos 6 meses calculada
  - [ ] Benchmark establecido (deploys/mes)

- [ ] **Change Failure Rate**:
  - [ ] Firebase Crashlytics configurado (o alternativa)
  - [ ] Crash-Free Users % de últimas 10 versiones registrado
  - [ ] Promedio de CFR calculado

- [ ] **MTTR**:
  - [ ] Definición de "incidente crítico" establecida
  - [ ] Últimos 5-10 incidentes documentados con timestamps
  - [ ] MTTR promedio y mediana calculados
  - [ ] Segmentación de componentes analizada

- [ ] **Dashboard**:
  - [ ] Herramienta seleccionada (Grafana, Google Sheets, etc.)
  - [ ] 4 gráficos creados
  - [ ] Automatización configurada (opcional)

---

## Próximos Pasos

Después de medir baseline de métricas DORA:

1. **Presentar resultados** a Engineering Manager / CTO
2. **Comparar con benchmarks** de industria (DORA reports)
3. **Implementar herramientas de IA** (GitHub Copilot, etc.)
4. **Re-medir después de 90 días**
5. **Calcular ROI real** vs proyectado

---

## Referencias

- **DORA State of DevOps Report**: https://dora.dev/research
- **Accelerate Book** (Forsgren, Humble, Kim): Metodología completa DORA
- **Firebase Crashlytics Docs**: https://firebase.google.com/docs/crashlytics
- **Git Log Documentation**: https://git-scm.com/docs/git-log

---

**Última Actualización**: 2025-11-13
**Versión**: 1.0.0
**Tiempo de Implementación**: 2-3 horas para configurar las 4 métricas
