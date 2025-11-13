# Índice Maestro: Framework de Observabilidad del Impacto de IA

**Versión**: 1.0.0
**Última Actualización**: 2025-11-13
**Licencia**: MIT

---

## 📖 Documentación Principal

### Introducción
- [README.md](./README.md) - Visión general del framework
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guía de contribución
- [glossary.md](./glossary.md) - Glosario de términos (40+ términos)

---

## 📊 Métricas y Mediciones

### Tabla de Métricas
- [metrics-table.md](./metrics-table.md) - 16 métricas (4 DORA + 7 SPACE + 5 Flutter-specific)

### Guías de Medición DORA
- [dora-metrics.md](./measurement-guides/dora-metrics.md) - Las 4 métricas DORA con scripts
  - Lead Time para Cambios
  - Deployment Frequency
  - Change Failure Rate
  - Mean Time to Recover

### Guías de Medición SPACE
- [space-satisfaction.md](./measurement-guides/space-satisfaction.md) - Encuestas, NPS, análisis avanzado
- [space-performance.md](./measurement-guides/space-performance.md) - Velocity (Story Points/Sprint)
- [space-activity.md](./measurement-guides/space-activity.md) - Code review time, onboarding time
- [space-communication.md](./measurement-guides/space-communication.md) - Documentation coverage
- [space-efficiency.md](./measurement-guides/space-efficiency.md) - Build time, boilerplate %

---

## 💰 Análisis Financiero

### Dashboard Ejecutivo
- [executive-dashboard.md](./executive-dashboard.md) - 5 KPIs críticos con cuantificación $$$

### ROI Calculators
- [formulas.md](./roi-calculators/formulas.md) - Las 5 fórmulas financieras principales
- [sensitivity-analysis.md](./roi-calculators/sensitivity-analysis.md) - 10 análisis "qué-pasa-si"
- [web-calculator/index.html](./roi-calculators/web-calculator/index.html) - Calculadora interactiva
- [web-calculator/calculator.js](./roi-calculators/web-calculator/calculator.js) - Lógica de cálculo
- [web-calculator/styles.css](./roi-calculators/web-calculator/styles.css) - Estilos

---

## 📚 Ejemplos y Casos de Estudio

### Casos de Estudio Completos
- [team-10-devs-example.md](./case-studies/team-10-devs-example.md) - Startup (10 developers)
  - Baseline → Implementación → Resultados
  - ROI: 7,997% | Payback: 4.5 días
  - NPS: 15 → 52 (+37 puntos)

- [team-30-devs-example.md](./case-studies/team-30-devs-example.md) - Enterprise (30 developers)
  - 3 squads, phased rollout (16 semanas)
  - ROI: 8,247% | Payback: 4.4 días
  - Velocity: +44% (equivalente a contratar 13 devs)

### Datasets de Ejemplo
**Ubicación**: `../../examples/sample-datasets/`

- [sample-metrics.json](../../examples/sample-datasets/sample-metrics.json) - 3 métricas ejemplo
- [sample-kpis.json](../../examples/sample-datasets/sample-kpis.json) - 5 KPIs con cálculos
- [roi-calculator-params.json](../../examples/sample-datasets/roi-calculator-params.json) - 10 escenarios

**Ubicación**: `../../examples/measurement-outputs/`

- [git-analytics-sample.csv](../../examples/measurement-outputs/git-analytics-sample.csv) - 30 commits con lead times
- [firebase-crashlytics-sample.json](../../examples/measurement-outputs/firebase-crashlytics-sample.json) - Crash analytics (45K sesiones)
- [survey-results-sample.json](../../examples/measurement-outputs/survey-results-sample.json) - 17 respuestas con análisis completo

---

## 🗓️ Plan de Implementación

### Guía de 4 Semanas
- [week-1-baseline.md](./implementation-plan/week-1-baseline.md) - Establecer baseline (10-15h)
  - Día 1: Git analytics y DORA
  - Día 2: Crashlytics y CFR
  - Día 3: Encuesta de satisfacción
  - Día 4: Estimación de boilerplate
  - Día 5: Reporte ejecutivo

- [week-2-instrumentation.md](./implementation-plan/week-2-instrumentation.md) - Automatizar dashboards (15-20h)
  - Scripts Python para Git analytics
  - Firebase API integration
  - Dashboard web o Grafana

- [week-3-pilot.md](./implementation-plan/week-3-pilot.md) - Piloto de 90 días ($585)
  - Grupo piloto (5 devs) vs control (5 devs)
  - Training de 2 horas
  - Mediciones semanales

- [week-4-presentation.md](./implementation-plan/week-4-presentation.md) - Business case (20h)
  - Compilar resultados de 90 días
  - Reporte ejecutivo (8-10 páginas)
  - Presentación de 10 slides para CFO

---

## 📋 Templates

### Plantillas para Uso Inmediato
- [satisfaction-survey.md](./templates/satisfaction-survey.md) - Encuesta de 13 preguntas (Google Forms ready)
- [onboarding-checklist.md](./templates/onboarding-checklist.md) - Checklist para tracking de nuevos developers
- [executive-presentation.md](./templates/executive-presentation.md) - Template de 5 slides para CFO/CTO
- [metric-template.md](./templates/metric-template.md) - Template para agregar nuevas métricas
- [kpi-template.md](./templates/kpi-template.md) - Template para definir nuevos KPIs

---

## 🔧 Schemas y Contratos

**Ubicación**: `../../specs/001-ai-impact-framework/contracts/`

Schemas JSON para validación:
- `metrics-schema.json` - Estructura de métricas
- `kpi-dashboard-schema.json` - Estructura de KPIs
- `roi-calculator-api.json` - Parámetros de calculadora
- `survey-template-schema.json` - Formato de encuestas

---

## 📈 Métricas por Categoría

### DORA Metrics (4)
1. **DORA-LT-001**: Lead Time para Cambios
2. **DORA-DF-001**: Deployment Frequency
3. **DORA-CFR-001**: Change Failure Rate
4. **DORA-MTTR-001**: Mean Time to Recover

### SPACE - Satisfaction (2)
5. **SPACE-SAT-001**: Developer Satisfaction (NPS)
6. **SPACE-SAT-002**: Turnover Rate

### SPACE - Performance (1)
7. **SPACE-PERF-001**: Velocity (Story Points)

### SPACE - Activity (2)
8. **SPACE-ACT-001**: Code Review Time
9. **SPACE-ACT-002**: Onboarding Time

### SPACE - Communication (1)
10. **SPACE-COMM-001**: Documentation Coverage

### SPACE - Efficiency (2)
11. **SPACE-EFF-001**: Build Time en CI
12. **SPACE-EFF-002**: Tiempo en Boilerplate

### Flutter-Specific (5)
13. **FLUTTER-001**: Crash-Free Users (Firebase)
14. **FLUTTER-002**: Hot Reload Success Rate
15. **FLUTTER-003**: Platform Channels Stability
16. **FLUTTER-004**: Build Size (APK/IPA)
17. **FLUTTER-005**: Widget Testing Coverage

---

## 💡 Uso Recomendado por Rol

### Para Engineering Managers
1. Leer [README.md](./README.md)
2. Explorar [metrics-table.md](./metrics-table.md)
3. Seleccionar 5-8 métricas prioritarias
4. Usar [measurement-guides](./measurement-guides/) para implementar
5. Ejecutar [week-1-baseline.md](./implementation-plan/week-1-baseline.md)

### Para CTOs/VPs Engineering
1. Leer [README.md](./README.md)
2. Revisar [executive-dashboard.md](./executive-dashboard.md)
3. Explorar [case-studies](./case-studies/)
4. Usar [web-calculator](./roi-calculators/web-calculator/index.html) con parámetros de tu equipo
5. Presentar a CFO usando [executive-presentation.md](./templates/executive-presentation.md)

### Para CFOs
1. Ir directo a [formulas.md](./roi-calculators/formulas.md)
2. Revisar [sensitivity-analysis.md](./roi-calculators/sensitivity-analysis.md)
3. Usar [web-calculator](./roi-calculators/web-calculator/index.html)
4. Revisar [case-studies](./case-studies/) (especialmente ROI real vs proyectado)

### Para Team Leads (Ejecución)
1. Seguir [implementation-plan](./implementation-plan/) semana por semana
2. Usar [templates](./templates/) para encuestas y checklists
3. Usar [measurement-guides](./measurement-guides/) para scripts y metodologías
4. Documentar en formato [sample-datasets](../../examples/sample-datasets/)

---

## 📦 Estructura de Directorios

```
ai-impact-observability/
├── README.md                           # Introducción
├── INDEX.md                            # Este archivo
├── CONTRIBUTING.md                     # Guía de contribución
├── glossary.md                         # Glosario de términos
├── metrics-table.md                    # 16 métricas
├── executive-dashboard.md              # 5 KPIs ejecutivos
│
├── measurement-guides/                 # Metodologías paso a paso
│   ├── dora-metrics.md
│   ├── space-satisfaction.md
│   ├── space-performance.md
│   ├── space-activity.md
│   ├── space-communication.md
│   └── space-efficiency.md
│
├── roi-calculators/                    # Análisis financiero
│   ├── formulas.md
│   ├── sensitivity-analysis.md
│   └── web-calculator/
│       ├── index.html
│       ├── calculator.js
│       └── styles.css
│
├── case-studies/                       # Ejemplos reales
│   ├── team-10-devs-example.md
│   └── team-30-devs-example.md
│
├── implementation-plan/                # Guía de 4 semanas
│   ├── week-1-baseline.md
│   ├── week-2-instrumentation.md
│   ├── week-3-pilot.md
│   └── week-4-presentation.md
│
├── templates/                          # Plantillas reutilizables
│   ├── satisfaction-survey.md
│   ├── onboarding-checklist.md
│   ├── executive-presentation.md
│   ├── metric-template.md
│   └── kpi-template.md
│
└── schemas/                            # JSON Schemas
    ├── metrics-schema.json
    ├── kpi-dashboard-schema.json
    ├── roi-calculator-api.json
    └── survey-template-schema.json
```

---

## 🎯 Quick Links

### Empezar Ahora
- [Guía de Inicio Rápido](../../specs/001-ai-impact-framework/quickstart.md) - 10 minutos
- [Semana 1: Baseline](./implementation-plan/week-1-baseline.md) - Primera semana

### Calcular ROI
- [Calculadora Web](./roi-calculators/web-calculator/index.html) - Herramienta interactiva
- [Fórmulas](./roi-calculators/formulas.md) - Matemáticas detrás del ROI

### Ejemplos Completos
- [Caso 10 Devs](./case-studies/team-10-devs-example.md) - Startup
- [Caso 30 Devs](./case-studies/team-30-devs-example.md) - Enterprise

### Mediciones
- [DORA Metrics](./measurement-guides/dora-metrics.md) - Scripts de Git
- [Satisfaction Survey](./templates/satisfaction-survey.md) - Encuesta lista

---

## 📊 Estadísticas del Framework

- **Métricas**: 16 (4 DORA + 7 SPACE + 5 Flutter)
- **KPIs Ejecutivos**: 5
- **Guías de Medición**: 6 (1 DORA + 5 SPACE)
- **Casos de Estudio**: 2 (10 devs + 30 devs)
- **Templates**: 5
- **Planes de Implementación**: 4 semanas
- **Datasets de Ejemplo**: 6 archivos
- **Total Documentación**: ~150 páginas Markdown

---

## 🔄 Changelog

### v1.0.0 (2025-11-13)
- ✅ Initial release
- ✅ 16 métricas DORA + SPACE + Flutter
- ✅ 5 KPIs ejecutivos cuantificados
- ✅ 6 guías de medición detalladas
- ✅ Calculadora ROI web interactiva
- ✅ 2 casos de estudio completos
- ✅ Plan de implementación 4 semanas
- ✅ Templates listos para usar
- ✅ Datasets y ejemplos

---

## 📞 Soporte

**Documentación**: Todos los links en este índice
**Issues**: Reportar en repositorio
**Contribuciones**: Ver [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Última Actualización**: 2025-11-13
**Mantenedores**: Framework Team
**Versión**: 1.0.0
