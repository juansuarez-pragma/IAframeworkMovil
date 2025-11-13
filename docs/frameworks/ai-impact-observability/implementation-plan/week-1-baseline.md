# Plan de Implementación - Semana 1: Establecer Baseline

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Duración**: 5 días laborales
**Rol**: Tech Lead / Engineering Manager

---

## Objetivo de la Semana

Medir el estado actual (baseline) del equipo Flutter ANTES de adoptar herramientas de IA. Este baseline es **crítico** para demostrar ROI posteriormente.

**Entregables**:
- ✅ Métricas DORA baseline medidas y documentadas
- ✅ Encuesta de satisfacción (SPACE) completada por el equipo
- ✅ Estimación de tiempo en boilerplate y actividades repetitivas
- ✅ Costo de Inacción calculado
- ✅ Reporte baseline para CFO/CTO

---

## Pre-Requisitos

Antes de iniciar la Semana 1, asegurar que tienes acceso a:

- [ ] Repositorio Git (GitHub, GitLab, Bitbucket)
- [ ] Firebase Crashlytics o herramienta de crash reporting
- [ ] Jira / Linear / Azure DevOps (tracking de stories)
- [ ] Herramienta de encuestas (Google Forms, Typeform)
- [ ] Acceso a HR para datos de turnover (opcional)

---

## Día 1 (Lunes): Git Analytics y DORA Metrics

### Objetivo

Extraer métricas de Git para calcular Lead Time, Deployment Frequency, y preparar datos para CFR/MTTR.

### Tareas

#### Task 1.1: Lead Time para Cambios (1-2 horas)

**Herramienta**: Git + Script Bash/Python

**Método**:

```bash
# Opción 1: Git log manual
git log --since="90 days ago" --pretty=format:'%H,%an,%ad,%s' \
  --date=iso --no-merges > git-analytics-90days.csv

# Opción 2: Con script Python (recomendado)
python3 docs/frameworks/ai-impact-observability/scripts/git-analytics.py \
  --since="90 days ago" \
  --output=baseline-git-analytics.csv
```

**Qué medir**:
- Commits de últimos 90 días
- Fecha de commit vs fecha de deployment (tags de release)
- Calcular tiempo promedio commit → producción

**Output esperado**:
```
Lead Time Promedio: X días
Mediana: Y días
P90: Z días
```

**Archivo**: `measurements/baseline/git-analytics.csv`

#### Task 1.2: Deployment Frequency (30 min)

**Método**:

```bash
# Contar releases de últimos 6 meses
git log --tags --simplify-by-decoration --pretty="format:%ai %d" \
  --since="6 months ago" | grep "tag:" | wc -l

# O manualmente desde GitHub releases
```

**Output esperado**:
```
Total releases (6 meses): N releases
Frequency: N/26 releases por semana
Clasificación: [Elite / High / Medium / Low]
```

**Archivo**: `measurements/baseline/deployment-frequency.txt`

#### Task 1.3: Documentar Baseline DORA

**Archivo**: `measurements/baseline/dora-baseline.md`

Template:

```markdown
# DORA Metrics Baseline

**Fecha**: 2025-XX-XX
**Equipo**: [Nombre] ([N] developers Flutter)
**Período**: Últimos 90 días

## Lead Time para Cambios
- **Promedio**: X.X días
- **Mediana**: X.X días
- **P90**: X.X días
- **Clasificación**: [Elite <7d / High 7-30d / Medium 1-6m / Low >6m]

## Deployment Frequency
- **Frecuencia**: X.X deploys/semana
- **Total (6 meses)**: N releases
- **Clasificación**: [Elite daily / High weekly / Medium monthly / Low <monthly]

## Change Failure Rate
- **Pendiente**: Medir en Día 2 (Firebase Crashlytics)

## Mean Time to Recover
- **Pendiente**: Medir en Día 2 (incidentes)

---

**Nota**: Este baseline se comparará con métricas post-IA en 90 días.
```

### Checkpoint Día 1

- [ ] Git analytics exportado (CSV)
- [ ] Lead Time calculado y documentado
- [ ] Deployment Frequency calculado
- [ ] Archivo dora-baseline.md creado

**Tiempo estimado**: 2-3 horas

---

## Día 2 (Martes): Crashlytics y Métricas de Calidad

### Objetivo

Medir Change Failure Rate y MTTR usando Firebase Crashlytics o herramienta equivalente.

### Tareas

#### Task 2.1: Change Failure Rate (1 hora)

**Herramienta**: Firebase Crashlytics Dashboard o API

**Método**:

1. Abrir Firebase Crashlytics dashboard
2. Seleccionar últimos 30 días
3. Obtener:
   - Total sessions
   - Crashed sessions
   - Crash-free rate
4. Calcular CFR = (Deployments con crashes / Total deployments) × 100

**Ejemplo**:
```
Últimos 30 días:
- Total sessions: 45,820
- Crashed sessions: 1,374
- Crash-free rate: 97.0%

Últimos 8 deployments:
- Deployments con crashes críticos en 24h: 3
- CFR = 3/8 = 37.5%
```

**Output**: `measurements/baseline/crashlytics-baseline.json`

#### Task 2.2: Mean Time to Recover (1 hora)

**Método**:

1. Revisar últimos 10 incidentes de producción
2. Para cada uno:
   - Fecha/hora de detección
   - Fecha/hora de resolución
   - Calcular tiempo transcurrido
3. Calcular promedio

**Template Excel/CSV**:

| Incident | Detected | Resolved | MTTR (hours) |
|----------|----------|----------|--------------|
| #1 | 2025-01-15 14:00 | 2025-01-16 09:00 | 19 |
| #2 | 2025-01-20 10:30 | 2025-01-22 15:00 | 52.5 |
| ... | ... | ... | ... |

**Output esperado**:
```
MTTR Promedio: X.X horas
Mediana: X.X horas
Clasificación: [Elite <1h / High <24h / Medium <1week / Low >1week]
```

**Archivo**: `measurements/baseline/mttr-baseline.csv`

#### Task 2.3: Actualizar DORA Baseline

Agregar CFR y MTTR a `dora-baseline.md`.

### Checkpoint Día 2

- [ ] Crashlytics data exportado
- [ ] CFR calculado
- [ ] MTTR calculado
- [ ] dora-baseline.md actualizado con CFR y MTTR

**Tiempo estimado**: 2-3 horas

---

## Día 3 (Miércoles): Encuesta de Satisfacción (SPACE)

### Objetivo

Medir satisfacción y bienestar del equipo mediante encuesta anónima.

### Tareas

#### Task 3.1: Crear Encuesta (30 min)

**Herramienta**: Google Forms o Typeform

**Template**: Usar `templates/satisfaction-survey.md`

**10 Preguntas Likert (1-5)** + **1 NPS (0-10)** + **3 Abiertas**

**Link de ejemplo**: [Ver template completo](../templates/satisfaction-survey.md)

**Configuración importante**:
- ✅ Anónima (crítico para respuestas honestas)
- ✅ Opcional (mejor participation rate)
- ✅ 5 minutos máximo

#### Task 3.2: Distribuir Encuesta (15 min)

**Email template**:

```
Subject: Encuesta de Satisfacción - 5 minutos ⏱️

Hola equipo,

Estamos midiendo la satisfacción del equipo para identificar áreas de mejora.

Tus respuestas son ANÓNIMAS y nos ayudan a tomar mejores decisiones
sobre herramientas, procesos y prioridades.

Tiempo: 5 minutos
Link: [URL]

Deadline: Viernes 5pm

Gracias! 🙏

[Tu nombre]
```

**Canales**:
- Email a todo el equipo
- Slack announcement
- Reminder en daily standup

**Participation rate objetivo**: >70%

#### Task 3.3: Recolectar Respuestas (esperar hasta Viernes)

**Timing**: Dar 2-3 días para respuestas

### Checkpoint Día 3

- [ ] Encuesta creada en Google Forms/Typeform
- [ ] Email de distribución enviado
- [ ] Recordatorio en Slack posteado
- [ ] Deadline establecido (Viernes 5pm)

**Tiempo estimado**: 1 hora

---

## Día 4 (Jueves): Estimación de Tiempo en Boilerplate

### Objetivo

Estimar cuánto tiempo del equipo se gasta en actividades repetitivas y de bajo valor.

### Tareas

#### Task 4.1: Time Tracking Piloto (Opción A: Más Precisa)

**Método**: Usar herramienta de time tracking (Toggl, Clockify) durante 1-2 semanas

**Categorías**:
- "Boilerplate" (StatefulWidget, JSON models, test setup)
- "Feature Development" (lógica de negocio)
- "Code Review"
- "Meetings"
- "Debugging"

**Participantes**: 5-10 developers (muestra representativa)

**Duración**: 2 semanas

**Output esperado**:
```
Boilerplate: 35% del tiempo productivo
Feature Dev: 45%
Code Review: 10%
Other: 10%
```

#### Task 4.2: Encuesta de Estimación (Opción B: Más Rápida)

**Método**: Agregar pregunta a encuesta de satisfacción (Día 3)

**Pregunta**:
```
P14: ¿Qué % de tu tiempo semanal gastas en código repetitivo?
(StatefulWidget boilerplate, JSON models, test setup, etc.)

[ ] <10%
[ ] 10-20%
[ ] 20-30%
[ ] 30-40%
[ ] >40%
```

**Cálculo**: Promedio de respuestas

**Ejemplo**:
```
Responses:
- 2 devs: <10% (5%)
- 4 devs: 10-20% (15%)
- 8 devs: 20-30% (25%)
- 4 devs: 30-40% (35%)
- 2 devs: >40% (45%)

Promedio: (2×5 + 4×15 + 8×25 + 4×35 + 2×45) / 20 = 25.5%
```

**Recomendación**: Usar Opción B para baseline (más rápido), considerar Opción A para post-AI measurement (más preciso).

#### Task 4.3: Documentar Baseline de Eficiencia

**Archivo**: `measurements/baseline/efficiency-baseline.md`

Template:

```markdown
# Efficiency Metrics Baseline

**Fecha**: 2025-XX-XX
**Método**: [Time tracking / Encuesta]

## Tiempo en Boilerplate
- **% del tiempo**: X%
- **Horas/dev/año**: 2080h × X% = Yh
- **Horas totales (N devs)**: Yh × N = Zh

## Actividades de Boilerplate Identificadas
1. StatefulWidget setup
2. JSON serialization models
3. Test boilerplate (setUp, mocks)
4. Material widget configuration
5. [Otras]

## Build Time (CI)
- **Promedio**: X.X minutos
- **Herramienta CI**: [GitHub Actions / Bitrise / Codemagic]
```

### Checkpoint Día 4

- [ ] Método de medición seleccionado (time tracking o encuesta)
- [ ] Si time tracking: herramienta configurada y piloto iniciado
- [ ] Si encuesta: pregunta agregada a survey de Día 3
- [ ] efficiency-baseline.md creado

**Tiempo estimado**: 2 horas

---

## Día 5 (Viernes): Análisis y Reporte Ejecutivo

### Objetivo

Compilar todos los datos de la semana en un reporte ejecutivo baseline para CFO/CTO.

### Tareas

#### Task 5.1: Procesar Encuesta de Satisfacción (1 hora)

**Herramienta**: Google Forms → Export to Sheets

**Cálculos**:

1. **Satisfaction Score**: Promedio de P1-P9

```python
# Ejemplo con 20 respuestas
responses = [
    [4, 3, 4, 3, 3, 4, 4, 3, 4],  # Dev 1
    [3, 2, 3, 3, 2, 3, 3, 2, 3],  # Dev 2
    # ... 18 más
]

individual_scores = [sum(r) / len(r) for r in responses]
team_score = sum(individual_scores) / len(individual_scores)

print(f"Satisfaction Score: {team_score:.2f} / 5.00")
```

2. **NPS**: Promoters % - Detractors %

```python
nps_responses = [9, 10, 7, 8, 9, 10, 6, 10, 8, 9]  # P10

promoters = len([x for x in nps_responses if x >= 9])
detractors = len([x for x in nps_responses if x <= 6])
total = len(nps_responses)

nps = ((promoters / total) * 100) - ((detractors / total) * 100)
print(f"NPS: {nps:.0f}")
```

**Output**: `measurements/baseline/satisfaction-baseline.json`

#### Task 5.2: Calcular Costo de Inacción (1 hora)

**Herramienta**: Usar calculadora web `roi-calculators/web-calculator/index.html`

**Inputs**:
- Tamaño equipo: N developers
- Salario promedio: $XXX,000
- % Tiempo en boilerplate: X% (del Día 4)
- CFR: X% (del Día 2)

**Outputs**:
- Costo Anual de Inacción: $X.XXM
- Breakdown por categoría

**Screenshot**: Exportar resultados de calculadora

**Archivo**: `measurements/baseline/cost-of-inaction.txt`

#### Task 5.3: Compilar Reporte Ejecutivo (2 horas)

**Template**: `templates/baseline-executive-report.md`

**Estructura**:

```markdown
# Baseline Report: AI Impact Framework

**Equipo**: [Nombre] ([N] developers Flutter)
**Fecha**: 2025-XX-XX
**Preparado por**: [Tu nombre]

## Executive Summary

Este reporte establece el baseline del equipo Flutter ANTES de adoptar
herramientas de IA (GitHub Copilot). Los datos serán comparados con
mediciones post-IA en 90 días para demostrar ROI.

## DORA Metrics

| Métrica | Baseline | Benchmark Elite | Gap |
|---------|----------|-----------------|-----|
| Lead Time | X.X días | <7 días | XX% |
| Deploy Freq | X.X/semana | Daily | XX% |
| CFR | XX% | <15% | XX% |
| MTTR | XX horas | <1h | XX% |

**Clasificación Overall**: [Elite / High / Medium / Low]

## SPACE Metrics

### Satisfaction
- NPS: XX ([Excelente >50 / Bueno 30-50 / Mejorable 0-30 / Crítico <0])
- Satisfaction Score: X.X / 5.0
- Participation Rate: XX%

### Efficiency
- Tiempo en Boilerplate: XX%
- Build Time (CI): X.X minutos

### Activity
- Code Review Time: XX horas (estimado)
- Onboarding Time: XX días (estimado o histórico)

## Financial Impact

### Costo de Inacción (Anual)

| Categoría | Costo/Año |
|-----------|-----------|
| Boilerplate | $XXX,XXX |
| Onboarding | $XX,XXX |
| Crashes | $XXX,XXX |
| Cycle Time | $XXX,XXX |
| Turnover | $XXX,XXX |
| **TOTAL** | **$X.XXM** |

**Interpretación**: El equipo pierde $X.XXM/año en costos evitables
al NO adoptar herramientas de IA.

## Top Pain Points (Qualitative)

De la encuesta de satisfacción (respuestas abiertas):

1. [Pain point más mencionado]
2. [Segundo pain point]
3. [Tercer pain point]

## Next Steps

1. **Semana 2**: Implementar instrumentación y dashboards
2. **Semana 3**: Ejecutar piloto de IA con [N] developers
3. **Semana 4+**: Medir resultados y preparar business case

## Anexos

- Git Analytics: `measurements/baseline/git-analytics.csv`
- Crashlytics: `measurements/baseline/crashlytics-baseline.json`
- Survey Results: `measurements/baseline/satisfaction-baseline.json`
```

**Distribución**:
- Email a CTO/VP Engineering
- Presentación en team all-hands (opcional)
- Guardar para comparación post-IA

#### Task 5.4: Celebrar 🎉

Has completado Semana 1! Baseline establecido correctamente.

### Checkpoint Día 5

- [ ] Encuesta procesada (Satisfaction Score + NPS calculados)
- [ ] Costo de Inacción calculado
- [ ] Reporte ejecutivo compilado
- [ ] Reporte enviado a stakeholders
- [ ] Archivos guardados en `measurements/baseline/`

**Tiempo estimado**: 4 horas

---

## Resumen de Entregables Semana 1

### Archivos Creados

```
measurements/baseline/
├── dora-baseline.md
├── git-analytics.csv
├── deployment-frequency.txt
├── crashlytics-baseline.json
├── mttr-baseline.csv
├── satisfaction-baseline.json
├── efficiency-baseline.md
├── cost-of-inaction.txt
└── baseline-executive-report.md
```

### Métricas Medidas

- ✅ Lead Time para Cambios
- ✅ Deployment Frequency
- ✅ Change Failure Rate
- ✅ Mean Time to Recover
- ✅ Satisfaction Score & NPS
- ✅ % Tiempo en Boilerplate
- ✅ Costo de Inacción

### Stakeholders Informados

- ✅ CTO/VP Engineering
- ✅ CFO (si requiere aprobación de presupuesto)
- ✅ Equipo de desarrollo (transparencia)

---

## Próxima Semana

**Semana 2**: Implementar instrumentación y automatizar dashboards
- Ver: `implementation-plan/week-2-instrumentation.md`

---

**Tiempo Total Semana 1**: 10-15 horas (distribuidas en 5 días)

---

**Última Actualización**: 2025-11-13
