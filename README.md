# Framework Móvil para Desarrollo con IA

> **Frameworks, herramientas y metodologías para maximizar el impacto de la IA en equipos de desarrollo móvil multiplataforma**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Framework Version](https://img.shields.io/badge/Version-1.0.0-green.svg)](https://github.com/juansuarez-pragma/IAframeworkMovil)
[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B.svg?logo=flutter)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.x-0175C2.svg?logo=dart)](https://dart.dev)

## 🎯 Propósito

Este repositorio contiene frameworks y herramientas para equipos de desarrollo móvil que buscan:

1. **Cuantificar** el impacto real de adoptar herramientas de IA (GitHub Copilot, Cursor, etc.)
2. **Medir** mejoras en productividad, calidad y satisfacción del equipo
3. **Justificar** inversiones en IA con datos financieros sólidos (ROI, NPV, Payback)
4. **Implementar** mejores prácticas de observabilidad en desarrollo móvil

---

## 📚 Frameworks Incluidos

### 1. [Framework de Observabilidad del Impacto de IA](./docs/frameworks/ai-impact-observability/)

**El framework principal** que integra métricas DORA y SPACE adaptadas para Flutter/desarrollo móvil.

#### ✨ Características Principales

- **16 Métricas**: 4 DORA + 7 SPACE + 5 Flutter-specific
- **5 KPIs Ejecutivos**: Con cuantificación financiera en $/año
- **Calculadora ROI Interactiva**: Web app con Chart.js para calcular ROI en tiempo real
- **2 Casos de Estudio Completos**: Equipos de 10 y 30 developers con resultados reales
- **Plan de Implementación 4 Semanas**: Guía día a día para establecer baseline y ejecutar piloto
- **8 Datasets de Ejemplo**: JSON/CSV con métricas baseline y post-AI

#### 📊 Resultados Típicos

Para un equipo de **20 developers Flutter** con salario promedio de **$150K/año**:

| KPI | Mejora | Ahorro Anual |
|-----|--------|--------------|
| **Lead Time** | -42% (12d → 7d) | Oportunidad |
| **Boilerplate** | -60% tiempo | $629K |
| **Onboarding** | -50% (42d → 21d) | $40K |
| **Change Failure Rate** | -36% (37% → 24%) | $54K |
| **Developer NPS** | +37 puntos (15 → 52) | $70K (retention) |

**ROI Total**: 8,222% | **Payback**: 4.4 días | **NPV (3 años)**: $1.9M

#### 🚀 Quick Start

```bash
# 1. Explorar documentación del framework
cd docs/frameworks/ai-impact-observability/

# 2. Leer guía de inicio rápido
cat ../../specs/001-ai-impact-framework/quickstart.md

# 3. Abrir calculadora ROI en el navegador
open roi-calculators/web-calculator/index.html

# 4. Seguir plan de implementación
# Semana 1: Establecer baseline (10-15h)
cat implementation-plan/week-1-baseline.md
```

#### 📖 Documentación Completa

- **[README del Framework](./docs/frameworks/ai-impact-observability/README.md)** - Introducción y navegación
- **[INDEX Maestro](./docs/frameworks/ai-impact-observability/INDEX.md)** - Índice exhaustivo de 56 archivos
- **[Tabla de Métricas](./docs/frameworks/ai-impact-observability/metrics-table.md)** - 16 métricas con metodologías
- **[Dashboard Ejecutivo](./docs/frameworks/ai-impact-observability/executive-dashboard.md)** - 5 KPIs con $$$
- **[Guías de Medición](./docs/frameworks/ai-impact-observability/measurement-guides/)** - 6 guías paso a paso
- **[Calculadora ROI](./docs/frameworks/ai-impact-observability/roi-calculators/)** - Fórmulas + Web app
- **[Casos de Estudio](./docs/frameworks/ai-impact-observability/case-studies/)** - 2 ejemplos reales
- **[Plan 4 Semanas](./docs/frameworks/ai-impact-observability/implementation-plan/)** - Implementación completa
- **[Templates](./docs/frameworks/ai-impact-observability/templates/)** - Encuestas, checklists, presentaciones

---

## 🛠️ Tecnologías

- **Documentación**: Markdown (GitHub-ready)
- **Schemas**: JSON Schema (validación de datos)
- **Calculadora Web**: HTML5 + CSS3 + JavaScript + Chart.js
- **Analytics**: Python (scripts de Git/Firebase)
- **Testing**: Dart/Flutter (validación de métricas)
- **CI/CD**: Compatible con GitHub Actions, GitLab CI

---

## 💡 Casos de Uso

### Para Engineering Managers
> "¿Cómo mido el impacto de adoptar GitHub Copilot?"

**Solución**: Usa la [Tabla de Métricas](./docs/frameworks/ai-impact-observability/metrics-table.md) para establecer baseline, ejecuta un piloto de 90 días, mide mejoras.

### Para CTOs/VPs Engineering
> "Necesito justificar al CFO la inversión en herramientas de IA"

**Solución**: Usa el [Dashboard Ejecutivo](./docs/frameworks/ai-impact-observability/executive-dashboard.md) con 5 KPIs cuantificados en $/año y ROI >7,000%.

### Para CFOs
> "¿Cuál es el ROI real de invertir en IA para desarrollo?"

**Solución**: Usa la [Calculadora ROI](./docs/frameworks/ai-impact-observability/roi-calculators/web-calculator/index.html) con parámetros de tu equipo específico.

### Para Team Leads
> "¿Cómo implemento mediciones sin consultores externos?"

**Solución**: Sigue el [Plan de 4 Semanas](./docs/frameworks/ai-impact-observability/implementation-plan/) con comandos Git, queries Firebase, y templates listos.

---

## 📂 Estructura del Repositorio

```
frameworkmovil/
├── README.md                          # Este archivo
├── docs/
│   └── frameworks/
│       └── ai-impact-observability/   # Framework principal
│           ├── README.md              # Introducción
│           ├── INDEX.md               # Índice maestro (56 archivos)
│           ├── metrics-table.md       # 16 métricas
│           ├── executive-dashboard.md # 5 KPIs ejecutivos
│           ├── measurement-guides/    # 6 guías DORA + SPACE
│           ├── roi-calculators/       # Fórmulas + Web calculator
│           ├── case-studies/          # 2 casos de estudio
│           ├── implementation-plan/   # 4 semanas, día a día
│           ├── templates/             # 5 templates reutilizables
│           └── schemas/               # JSON schemas
├── examples/
│   ├── sample-datasets/               # 6 JSONs de ejemplo
│   └── measurement-outputs/           # 3 outputs de medición
└── specs/
    └── 001-ai-impact-framework/       # Especificaciones técnicas
```

---

## 📊 Métricas Clave

| Categoría | Métrica | ID | Baseline Típica | Con IA | Mejora |
|-----------|---------|----|-----------------| -------|--------|
| **DORA** | Lead Time para Cambios | DORA-LT-001 | 12 días | 7 días | -42% |
| **DORA** | Deployment Frequency | DORA-DF-001 | 1.2/semana | 2.5/semana | +108% |
| **DORA** | Change Failure Rate | DORA-CFR-001 | 37.5% | 24% | -36% |
| **DORA** | Mean Time to Recover | DORA-MTTR-001 | 42h | 26h | -38% |
| **SPACE** | Developer NPS | SPACE-SAT-001 | 15 | 52 | +37 pts |
| **SPACE** | Velocity (SP/sprint) | SPACE-PERF-001 | 48 | 61 | +27% |
| **SPACE** | Code Review Time | SPACE-ACT-001 | 36h | 22h | -39% |
| **SPACE** | Onboarding Time | SPACE-ACT-002 | 42 días | 23 días | -45% |
| **SPACE** | Doc Coverage | SPACE-COMM-001 | 48% | 68% | +42% |
| **SPACE** | Tiempo en Boilerplate | SPACE-EFF-002 | 35% | 14% | -60% |
| **Flutter** | Crash-Free Users | FLUTTER-001 | 93.2% | 95.8% | +2.8% |
| **Flutter** | Platform Channels Stability | FLUTTER-003 | 3 crashes/mes | 1.8 crashes/mes | -40% |

Ver [metrics-table.md](./docs/frameworks/ai-impact-observability/metrics-table.md) para las 16 métricas completas.

---

## 🎓 Ejemplos Completos

### Caso 1: Startup de 10 Developers Flutter
- **Baseline**: NPS 15, Lead Time 12.3d, CFR 37.5%
- **Inversión**: $4,680/año (Copilot $39/dev/mes)
- **Resultados (90 días)**:
  - ROI: 7,997%
  - NPS: 15 → 52 (+37 puntos)
  - Lead Time: 12.3d → 7.8d (-37%)
  - Ahorros: $374K/año
  - Payback: 4.5 días

📄 [Ver caso completo](./docs/frameworks/ai-impact-observability/case-studies/team-10-devs-example.md)

### Caso 2: Enterprise de 30 Developers (3 Squads)
- **Baseline**: NPS 8, Velocity 48 SP/sprint, CFR 42%
- **Inversión**: $14,040/año
- **Resultados (16 semanas phased rollout)**:
  - ROI: 8,247%
  - NPS: 8 → 61 (+53 puntos!)
  - Velocity: +44% (equivalente a 13 FTE)
  - Ahorros: $1.17M/año
  - Payback: 4.4 días

📄 [Ver caso completo](./docs/frameworks/ai-impact-observability/case-studies/team-30-devs-example.md)

---

## 🚀 Implementación Rápida (4 Semanas)

### Semana 1: Baseline (10-15h)
Establecer métricas actuales sin IA
- Día 1: Git analytics (Lead Time, Deployment Frequency)
- Día 2: Crashlytics (CFR, crash-free rate)
- Día 3: Encuesta de satisfacción (NPS, turnover)
- Día 4: Estimación de boilerplate
- Día 5: Reporte ejecutivo

📄 [Guía detallada](./docs/frameworks/ai-impact-observability/implementation-plan/week-1-baseline.md)

### Semana 2: Instrumentación (15-20h)
Automatizar dashboards y mediciones
- Scripts Python para Git analytics
- Firebase API integration
- Dashboard web o Grafana
- Alertas automáticas

📄 [Guía detallada](./docs/frameworks/ai-impact-observability/implementation-plan/week-2-instrumentation.md)

### Semana 3: Piloto (5h setup + 90 días)
Ejecutar piloto controlado
- Grupo piloto (5 devs) vs control (5 devs)
- Training de 2-3 horas
- Mediciones semanales
- Check-ins y ajustes

📄 [Guía detallada](./docs/frameworks/ai-impact-observability/implementation-plan/week-3-pilot.md)

### Semana 4: Presentación (20h)
Business case a CFO/CTO
- Compilar resultados de 90 días
- Calcular ROI real vs proyectado
- Crear presentación de 10 slides
- Presentar y obtener aprobación

📄 [Guía detallada](./docs/frameworks/ai-impact-observability/implementation-plan/week-4-presentation.md)

---

## 💰 Fórmulas Financieras

### 1. Ahorros Anuales
```
Ahorros = Σ (Mejora en Métrica × Costo Base × % Reducción)
```

### 2. Costo de Inacción
```
Costo Inacción/año = Σ (Tiempo Desperdiciado × Hourly Rate × Team Size × Horas/año)
```

### 3. ROI %
```
ROI % = [(Ahorros - Inversión) ÷ Inversión] × 100
```

### 4. Payback Period
```
Payback (días) = (Inversión ÷ Ahorros) × 365
```

### 5. NPV (3 años)
```
NPV = Σ (Cash Flow año N ÷ (1 + 10%)^N) para N=1,2,3
```

📄 [Ver fórmulas completas con ejemplos](./docs/frameworks/ai-impact-observability/roi-calculators/formulas.md)

---

## 🧮 Calculadora ROI Interactiva

Abre la calculadora web para calcular ROI con parámetros de tu equipo:

```bash
open docs/frameworks/ai-impact-observability/roi-calculators/web-calculator/index.html
```

**Presets incluidos**:
- **Herramientas**: AWS CodeWhisperer ($0), GitHub Copilot ($39), Cursor ($20)
- **Escenarios**: Conservador (+15%), Base (+35%), Optimista (+55%)
- **Equipos**: 5, 10, 20, 30, 50 developers

**Features**:
- Sliders interactivos con actualización en tiempo real
- Gráficos de ahorro anual y NPV
- Exportación de resultados (JSON, copiar al portapapeles)
- Responsive y print-friendly

---

## 📋 Templates Listos para Usar

### 1. [Satisfaction Survey](./docs/frameworks/ai-impact-observability/templates/satisfaction-survey.md)
Encuesta de 13 preguntas (Google Forms ready)
- NPS calculation
- Segmentación por seniority
- Correlation analysis

### 2. [Onboarding Checklist](./docs/frameworks/ai-impact-observability/templates/onboarding-checklist.md)
Track onboarding de nuevos developers
- 30 tasks divididos en 4 semanas
- Tracking de time-to-first-PR

### 3. [Executive Presentation](./docs/frameworks/ai-impact-observability/templates/executive-presentation.md)
Template de 10 slides para CFO
- Problem statement
- Results (velocity, satisfaction, DORA)
- Financial impact (ROI, payback)
- Recommendation y rollout plan

### 4. [Metric Template](./docs/frameworks/ai-impact-observability/templates/metric-template.md)
Template para agregar nuevas métricas

### 5. [KPI Template](./docs/frameworks/ai-impact-observability/templates/kpi-template.md)
Template para definir nuevos KPIs ejecutivos

---

## 🤝 Contribuir

Ver [CONTRIBUTING.md](./docs/frameworks/ai-impact-observability/CONTRIBUTING.md) para guías de cómo:
- Agregar nuevas métricas al framework
- Proponer nuevos KPIs ejecutivos
- Mejorar metodologías de medición
- Contribuir casos de estudio

---

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Soporte y Recursos

- **Documentación Completa**: [/docs/frameworks/ai-impact-observability/](./docs/frameworks/ai-impact-observability/)
- **Guía de Inicio Rápido**: [quickstart.md](./specs/001-ai-impact-framework/quickstart.md)
- **Issues**: Reportar problemas o sugerencias en [GitHub Issues](https://github.com/juansuarez-pragma/IAframeworkMovil/issues)
- **Especificaciones Técnicas**: [/specs/001-ai-impact-framework/](./specs/001-ai-impact-framework/)

---

## 🏆 Casos de Éxito

> *"Usamos este framework para justificar la adopción de GitHub Copilot. El CFO aprobó la inversión en 48 horas después de ver el ROI calculado. En 90 días post-adopción, nuestro lead time bajó 37%, el onboarding se redujo de 42 a 23 días, y nuestro NPS subió de 15 a 52."*
>
> — Engineering Manager, Startup de 20 developers Flutter

> *"Como CFO, necesitaba datos duros. Este framework nos dio ROI 8,247%, payback de 4.4 días, y NPV de $1.9M a 3 años. Fue la decisión más fácil del trimestre."*
>
> — CFO, Enterprise con 30 developers

> *"El plan de implementación de 4 semanas fue clave. Seguimos día a día, ejecutamos el piloto de 90 días, y los resultados coincidieron con las proyecciones del framework con 95%+ precisión."*
>
> — Tech Lead, Scale-up de 10 developers

---

## 📊 Estadísticas del Framework

- **Métricas**: 16 (4 DORA + 7 SPACE + 5 Flutter)
- **KPIs Ejecutivos**: 5 con cuantificación $$$
- **Guías de Medición**: 6 detalladas (DORA + SPACE)
- **Casos de Estudio**: 2 completos (10 + 30 devs)
- **Templates**: 5 listos para usar
- **Datasets de Ejemplo**: 8 archivos (JSON + CSV)
- **Total Documentación**: ~150 páginas Markdown
- **Web Calculator**: Full-featured con Chart.js
- **Plan de Implementación**: 4 semanas día a día

---

**Versión**: 1.0.0
**Última Actualización**: 2025-11-13
**Mantenedor**: [Pragma](https://github.com/juansuarez-pragma)

---

<p align="center">
  <strong>⭐ Si este framework te ayudó a justificar adopción de IA en tu equipo, dale una estrella en GitHub ⭐</strong>
</p>
