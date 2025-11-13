---
description: "Lista de tareas para implementación del Framework de Observabilidad del Impacto de IA"
---

# Tareas: Framework de Observabilidad del Impacto de IA para Flutter

**Input**: Documentos de diseño de `/specs/001-ai-impact-framework/`
**Prerequisitos**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Este feature incluye tests de validación de contenido (no tests unitarios tradicionales) para verificar completitud y consistencia del framework.

**Organización**: Las tareas están agrupadas por user story para habilitar implementación y testing independiente de cada historia.

## Formato: `[ID] [P?] [Story] Descripción`

- **[P]**: Puede ejecutarse en paralelo (archivos diferentes, sin dependencias)
- **[Story]**: A qué user story pertenece esta tarea (ej: US1, US2, US3, US4)
- Incluir paths exactos de archivos en las descripciones

## Convenciones de Paths

Basado en `plan.md`, este proyecto usa estructura documentación-first:
- **Documentación**: `docs/frameworks/ai-impact-observability/`
- **Tests**: `tests/` en raíz del repositorio
- **Ejemplos**: `examples/` en raíz del repositorio

---

## Phase 1: Setup (Infraestructura Compartida)

**Propósito**: Inicialización del proyecto y estructura básica del framework

- [X] T001 Crear estructura de directorios completa en docs/frameworks/ai-impact-observability/ según plan.md
- [X] T002 [P] Crear README.md principal del framework en docs/frameworks/ai-impact-observability/README.md
- [X] T003 [P] Crear estructura de directorios para tests (tests/calculators/, tests/content/)
- [X] T004 [P] Crear estructura de directorios para examples (examples/sample-datasets/, examples/measurement-outputs/)
- [X] T005 [P] Configurar .gitignore para archivos temporales y node_modules (si se usa calculadora JS)

---

## Phase 2: Foundational (Prerequisitos Bloqueantes)

**Propósito**: Infraestructura core que DEBE completarse antes de que CUALQUIER user story pueda implementarse

**⚠️ CRÍTICO**: Ningún trabajo de user story puede comenzar hasta que esta fase esté completa

- [X] T006 Copiar y validar JSON schemas de contracts/ a docs/frameworks/ai-impact-observability/schemas/ (metrics-schema.json, kpi-dashboard-schema.json, roi-calculator-api.json, survey-template-schema.json)
- [X] T007 [P] Crear plantilla base de métrica en docs/frameworks/ai-impact-observability/templates/metric-template.md
- [X] T008 [P] Crear plantilla base de KPI en docs/frameworks/ai-impact-observability/templates/kpi-template.md
- [X] T009 [P] Crear glosario de términos en docs/frameworks/ai-impact-observability/glossary.md (DORA, SPACE, Lead Time, etc.)
- [X] T010 [P] Crear guía de contribución en docs/frameworks/ai-impact-observability/CONTRIBUTING.md para agregar nuevas métricas
- [X] T011 Configurar estructura base de data/ para almacenar definiciones JSON de métricas y KPIs

**Checkpoint**: Fundación lista - implementación de user stories puede comenzar en paralelo

---

## Phase 3: User Story 1 - Establecer Baseline de Métricas Flutter (Priority: P1) 🎯 MVP

**Objetivo**: Crear tabla comprehensiva que mapee métricas DORA y SPACE a desafíos específicos de Flutter con metodologías de medición concretas

**Test Independiente**: Verificar que la tabla de métricas contenga todas las categorías DORA (Lead Time, Deployment Frequency, Change Failure Rate, MTTR) y SPACE (Satisfaction, Performance, Activity, Communication, Efficiency) con adaptaciones específicas a Flutter, métodos de medición concretos, y proyecciones de impacto de IA.

### Implementación para User Story 1

- [X] T012 [P] [US1] Crear archivo principal metrics-table.md en docs/frameworks/ai-impact-observability/metrics-table.md con estructura de tabla (Categoría, Métrica Clave, Adaptación Flutter, Cómo Medirlo, Impacto Esperado IA)
- [X] T013 [P] [US1] Documentar métricas DORA - Lead Time en metrics-table.md con adaptación Flutter (separar tiempo controlable vs review de tiendas, incluir comando Git)
- [X] T014 [P] [US1] Documentar métricas DORA - Deployment Frequency en metrics-table.md con restricciones de tiendas (releases semanales/quincenales realistas)
- [X] T015 [P] [US1] Documentar métricas DORA - Change Failure Rate en metrics-table.md con Firebase Crashlytics (crash-free users %, query específico)
- [X] T016 [P] [US1] Documentar métricas DORA - MTTR en metrics-table.md con consideración de review de tiendas (24-48h mínimo)
- [X] T017 [P] [US1] Documentar métricas SPACE - Satisfaction en metrics-table.md (encuestas trimestrales, preguntas específicas Flutter sobre hot reload, state management)
- [X] T018 [P] [US1] Documentar métricas SPACE - Performance en metrics-table.md (story points/sprint ajustados para tareas Flutter, velocity)
- [X] T019 [P] [US1] Documentar métricas SPACE - Activity en metrics-table.md (tiempo code review con consideraciones Flutter, onboarding en Dart/Flutter)
- [X] T020 [P] [US1] Documentar métricas SPACE - Communication en metrics-table.md (documentación de patrones arquitectónicos Flutter, cobertura de docs)
- [X] T021 [P] [US1] Documentar métricas SPACE - Efficiency en metrics-table.md (tiempos de build CI Flutter 8-18 min Android, 10-20 min iOS, boilerplate StatefulWidget)
- [X] T022 [P] [US1] Agregar 5+ métricas específicas de Flutter que no aplican a web/backend (fragmentación dispositivos, generación assets multiplataforma, hot reload reliability)
- [X] T023 [US1] Crear instancias JSON de ejemplo para 3 métricas en examples/sample-datasets/sample-metrics.json validadas contra metrics-schema.json
- [X] T024 [US1] Agregar sección de referencias y fuentes al final de metrics-table.md (DORA research, SPACE paper, Flutter community surveys)

**Checkpoint**: En este punto, User Story 1 debe estar completamente funcional y testeable independientemente. Un Engineering Manager puede leer metrics-table.md y comenzar a medir 5+ métricas en su equipo.

---

## Phase 4: User Story 2 - Dashboard Ejecutivo de Costo de Inacción (Priority: P2)

**Objetivo**: Dashboard ejecutivo que resuma 5 KPIs críticos con cálculos concretos de costo de oportunidad (en dólares/año) para presentar business case a CTO/CFO

**Test Independiente**: Verificar que cada uno de los 5 KPIs incluya: (1) métrica base con número actual, (2) cálculo de costo anual en dólares, (3) proyección de mejora con IA, (4) ahorro/recuperación calculado, y (5) visualización sugerida para dashboard ejecutivo.

### Implementación para User Story 2

- [X] T025 [P] [US2] Crear archivo executive-dashboard.md en docs/frameworks/ai-impact-observability/executive-dashboard.md con estructura de 5 KPIs
- [X] T026 [P] [US2] Documentar KPI #1 - Costo de Onboarding en executive-dashboard.md (tiempo actual 42 días, fórmula de costo $18K-$24K por developer, ROI reducción a 21 días, visualización: gráfico de barras)
- [X] T027 [P] [US2] Documentar KPI #2 - Costo de Boilerplate en executive-dashboard.md (35% tiempo en código repetitivo, fórmula $384K/año para equipo 20 devs, ahorro 60% con IA, visualización: pie chart)
- [X] T028 [P] [US2] Documentar KPI #3 - Impacto de Crashes en executive-dashboard.md (crash-free rate 98.5% → 99.2%, cálculo revenue perdido, fórmula $180K/año recuperables, visualización: línea de tiempo)
- [X] T029 [P] [US2] Documentar KPI #4 - Costo de Cycle Time en executive-dashboard.md (lead time 12 días → 7 días, 5 días ventaja competitiva, costo de oportunidad time-to-market, visualización: Gantt/timeline)
- [X] T030 [P] [US2] Documentar KPI #5 - Costo de Rotación de Talento en executive-dashboard.md (25% turnover → 18%, $50K-$80K por reemplazo, ahorro $100K/año, visualización: gauge)
- [X] T031 [US2] Agregar sección de "Costo Total de Inacción" sumando los 5 KPIs en executive-dashboard.md ($712K/año para equipo 20 devs)
- [X] T032 [US2] Crear mockup ASCII del dashboard layout en executive-dashboard.md mostrando distribución de 5 KPIs en una página
- [X] T033 [US2] Documentar formatos de exportación (PDF, PowerPoint, PNG) en executive-dashboard.md
- [X] T034 [US2] Crear instancias JSON de ejemplo para los 5 KPIs en examples/sample-datasets/sample-kpis.json validadas contra kpi-dashboard-schema.json
- [X] T035 [US2] Crear template de presentación ejecutiva en docs/frameworks/ai-impact-observability/templates/executive-presentation.md (estructura de 3 slides: Problema, Costo Anual Inacción, ROI Inversión IA)

**Checkpoint**: En este punto, User Stories 1 Y 2 deben funcionar independientemente. Un CTO puede preparar presentación ejecutiva en <2 horas usando los 5 KPIs documentados.

---

## Phase 5: User Story 3 - Metodologías de Medición Implementables (Priority: P3)

**Objetivo**: Guías detalladas de cómo implementar medición de cada métrica (comandos Git específicos, queries Firebase, plantillas de encuestas) para operacionalizar el framework en 4 semanas sin consultores externos

**Test Independiente**: Seguir las guías de medición para al menos 3 métricas (una de cada categoría: DORA, SPACE-técnica, SPACE-humana) en un proyecto Flutter real de prueba en menos de 2 horas, obteniendo datos numéricos reales.

### Implementación para User Story 3

- [X] T036 [P] [US3] Crear archivo dora-metrics.md en docs/frameworks/ai-impact-observability/measurement-guides/dora-metrics.md con guías para las 4 métricas DORA
- [X] T037 [P] [US3] Documentar metodología Lead Time en dora-metrics.md: comandos Git exactos (git log --format), script de análisis de timestamps, separación commit→feature-complete vs feature-complete→store-approved
- [X] T038 [P] [US3] Documentar metodología Deployment Frequency en dora-metrics.md: extracción de tags de release, análisis de frecuencia, consideración de políticas de tiendas
- [X] T039 [P] [US3] Documentar metodología Change Failure Rate en dora-metrics.md: queries Firebase Crashlytics exactas, fórmula crash-free users %, filtrado por versión
- [X] T040 [P] [US3] Documentar metodología MTTR en dora-metrics.md: tracking de issues críticos, tiempo entre detección y versión fix aprobada en tiendas
- [ ] T041 [P] [US3] Crear archivo space-satisfaction.md en docs/frameworks/ai-impact-observability/measurement-guides/space-satisfaction.md
- [ ] T042 [US3] Documentar metodología de encuestas en space-satisfaction.md: plantilla de 10 preguntas, escala Likert 1-5, NPS, preguntas de control organizacional
- [X] T043 [US3] Crear template completo de encuesta en docs/frameworks/ai-impact-observability/templates/satisfaction-survey.md (Google Forms ready) con las 10 preguntas específicas Flutter
- [ ] T044 [US3] Documentar análisis de resultados de encuesta en space-satisfaction.md: cálculo de score promedio, NPS, correlación con preguntas de control
- [ ] T045 [P] [US3] Crear archivo space-performance.md en docs/frameworks/ai-impact-observability/measurement-guides/space-performance.md (velocity, throughput de Jira/Linear)
- [ ] T046 [P] [US3] Crear archivo space-activity.md en docs/frameworks/ai-impact-observability/measurement-guides/space-activity.md (code review time de GitHub/GitLab, onboarding tracking)
- [ ] T047 [P] [US3] Crear archivo space-communication.md en docs/frameworks/ai-impact-observability/measurement-guides/space-communication.md (cobertura de documentación con jazzy/dokka)
- [ ] T048 [P] [US3] Crear archivo space-efficiency.md en docs/frameworks/ai-impact-observability/measurement-guides/space-efficiency.md (build times de CI logs, boilerplate time tracking)
- [ ] T049 [US3] Crear outputs de ejemplo en examples/measurement-outputs/ (git-analytics-sample.csv, firebase-crashlytics-sample.json, survey-results-sample.json)
- [X] T050 [US3] Crear checklist de onboarding en docs/frameworks/ai-impact-observability/templates/onboarding-checklist.md para tracking de productividad de nuevos developers

**Checkpoint**: En este punto, todas las guías de medición están completas. Un Team Lead puede ejecutar metodologías y obtener datos reales en <2 horas por métrica.

---

## Phase 6: User Story 4 - ROI y Proyecciones Financieras (Priority: P4)

**Objetivo**: Calculadoras de ROI parametrizadas por tamaño de equipo y costo de herramientas que muestren payback period, break-even point, y retorno a 3 años para evaluar inversión en IA contra otras iniciativas

**Test Independiente**: Ingresar parámetros reales (ej: 15 developers, $39/dev/mes herramienta IA, salario promedio $120K) en calculadoras y obtener outputs financieros estándar (ROI %, payback en días, NPV a 3 años) que coincidan con formatos típicos de business cases corporativos.

### Implementación para User Story 4

- [ ] T051 [P] [US4] Crear archivo formulas.md en docs/frameworks/ai-impact-observability/roi-calculators/formulas.md documentando las 5 fórmulas principales (Costo Anual Inacción, Impacto IA, ROI %, Payback Period, NPV)
- [ ] T052 [US4] Documentar fórmula "Costo Anual de Inacción" en formulas.md con ejemplo numérico completo (boilerplate: 728h × $72/h × 20 devs = $1,048,320/año)
- [ ] T053 [US4] Documentar fórmula "Impacto de IA" en formulas.md con porcentajes de reducción por categoría (30-60% según actividad) y ejemplo calculado
- [ ] T054 [US4] Documentar fórmula "ROI %" en formulas.md: [(Ahorros - Inversión) ÷ Inversión] × 100 con ejemplo (7,509% para $712K ahorro vs $9.4K inversión)
- [ ] T055 [US4] Documentar fórmula "Payback Period" en formulas.md: (Inversión ÷ Ahorros) × 365 días con ejemplo (4.8 días)
- [ ] T056 [US4] Documentar fórmula "NPV" en formulas.md: cálculo 3 años con tasa descuento 10% y ejemplo ($1.7M NPV)
- [ ] T057 [US4] Crear archivo sensitivity-analysis.md en docs/frameworks/ai-impact-observability/roi-calculators/sensitivity-analysis.md con tablas "qué pasa si" (mejoras 30% vs 45% vs 60%)
- [ ] T058 [P] [US4] Crear estructura HTML/CSS/JS para calculadora web en docs/frameworks/ai-impact-observability/roi-calculators/web-calculator/index.html
- [ ] T059 [US4] Implementar inputs de calculadora en index.html: sliders para tamaño equipo (1-100), salario promedio ($50K-$300K), costo herramienta/dev ($0-$100/mes), mejoras esperadas (0-100%)
- [ ] T060 [US4] Implementar lógica de cálculo en web-calculator/calculator.js: funciones para las 5 fórmulas (parseando inputs, calculando outputs en tiempo real)
- [ ] T061 [US4] Implementar outputs de calculadora en index.html: displays para Inversión Anual, Ahorro Anual, ROI %, Payback Days, NPV 3 años (formato moneda y porcentaje)
- [ ] T062 [US4] Integrar Chart.js en web-calculator/index.html para visualización de ROI (gráfico de barras: inversión vs ahorro, línea de tiempo NPV 3 años)
- [ ] T063 [P] [US4] Crear estilos CSS en web-calculator/styles.css (diseño responsive, colores ejecutivo-friendly, formato de números)
- [ ] T064 [US4] Agregar tabla de análisis de sensibilidad dinámica en index.html mostrando ROI en escenarios conservador/moderado/optimista
- [ ] T065 [US4] Implementar funcionalidad "Exportar Resultados" en calculator.js (generar summary text descargable con todos los cálculos)
- [ ] T066 [P] [US4] Crear instancia JSON de ejemplo para calculadora en examples/sample-datasets/roi-calculator-params.json validada contra roi-calculator-api.json
- [ ] T067 [US4] Agregar validación de inputs en calculator.js (rangos válidos, manejo de errores, mensajes de usuario)

**Checkpoint**: Todas las user stories están ahora independientemente funcionales. CFO puede usar calculadora web para generar ROI en <10 minutos con parámetros de su equipo.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Propósito**: Mejoras que afectan múltiples user stories y validación final del framework

### Documentación y Ejemplos

- [ ] T068 [P] Actualizar README.md principal con links a todas las secciones (metrics-table, executive-dashboard, measurement-guides, calculadora ROI)
- [ ] T069 [P] Crear caso de estudio "Equipo 10 developers" en docs/frameworks/ai-impact-observability/case-studies/team-10-devs-example.md con datos completos baseline → con IA
- [ ] T070 [P] Crear caso de estudio "Equipo 30 developers" en docs/frameworks/ai-impact-observability/case-studies/team-30-devs-example.md
- [ ] T071 [P] Crear plan de implementación Week 1 en docs/frameworks/ai-impact-observability/implementation-plan/week-1-baseline.md (configurar Git analytics, Firebase, encuesta)
- [ ] T072 [P] Crear plan de implementación Week 2 en docs/frameworks/ai-impact-observability/implementation-plan/week-2-instrumentation.md (setup dashboards, automatización)
- [ ] T073 [P] Crear plan de implementación Week 3 en docs/frameworks/ai-impact-observability/implementation-plan/week-3-pilot.md (piloto con 5 developers, grupo control)
- [ ] T074 [P] Crear plan de implementación Week 4 en docs/frameworks/ai-impact-observability/implementation-plan/week-4-presentation.md (compilar business case, presentación a ejecutivos)
- [ ] T075 [P] Crear datasets de ejemplo baseline en examples/sample-datasets/team-baseline-metrics.json (métricas actuales sin IA para equipo ejemplo)
- [ ] T076 [P] Crear datasets de ejemplo post-adopción en examples/sample-datasets/post-ai-adoption-metrics.json (métricas después de 90 días con IA)

### Tests de Validación de Contenido

- [ ] T077 [P] Crear test de completitud de métricas en tests/content/metrics_completeness_test.dart (verificar que metrics-table.md tiene mínimo 15 métricas, 4 DORA + 5 SPACE dimensions cubiertos)
- [ ] T078 [P] Crear test de estructura de KPIs en tests/content/kpi_structure_test.dart (verificar que executive-dashboard.md tiene exactamente 5 KPIs, cada uno con cálculo de costo y visualización)
- [ ] T079 [P] Crear test de validación de links en tests/content/link_validation_test.dart (verificar todos los enlaces internos entre documentos funcionan)
- [ ] T080 [P] Crear tests de fórmulas ROI en tests/calculators/roi_formula_test.dart (unit tests para las 5 fórmulas con casos de prueba conocidos)
- [ ] T081 [P] Crear tests de payback en tests/calculators/payback_calculation_test.dart (validar cálculo de payback period con múltiples escenarios)
- [ ] T082 [P] Crear tests de sensibilidad en tests/calculators/sensitivity_analysis_test.dart (validar que análisis "qué pasa si" produce resultados coherentes)

### Validación Final

- [ ] T083 Ejecutar todos los tests de validación (T077-T082) y corregir cualquier fallo
- [ ] T084 Ejecutar validación de quickstart.md: seguir guía de 10 minutos con proyecto Flutter real y verificar que se obtiene métrica + ROI calculado
- [ ] T085 Validar que todos los JSON de ejemplo (sample-metrics.json, sample-kpis.json, roi-calculator-params.json) pasan validación contra sus schemas correspondientes
- [ ] T086 [P] Crear índice master en docs/frameworks/ai-impact-observability/INDEX.md listando todos los documentos con descripciones breves
- [ ] T087 [P] Agregar metadata de versioning en todos los archivos principales (versionFramework: "1.0.0")
- [ ] T088 Revisar consistencia de terminología en todos los documentos (usar glosario como referencia)
- [ ] T089 Validar formato de todos los archivos Markdown (linting, tablas correctas, código fences apropiados)
- [ ] T090 Verificar que la calculadora web funciona en múltiples navegadores (Chrome, Safari, Firefox)

---

## Dependencies & Execution Order

### Dependencias de Fases

- **Setup (Phase 1)**: Sin dependencias - puede empezar inmediatamente
- **Foundational (Phase 2)**: Depende de completar Setup - BLOQUEA todas las user stories
- **User Stories (Phase 3-6)**: Todas dependen de completar Foundational phase
  - Las user stories pueden proceder en paralelo (si hay capacidad de equipo)
  - O secuencialmente en orden de prioridad (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depende de que todas las user stories deseadas estén completas

### Dependencias de User Stories

- **User Story 1 (P1)**: Puede comenzar después de Foundational (Phase 2) - Sin dependencias en otras stories
- **User Story 2 (P2)**: Puede comenzar después de Foundational (Phase 2) - Referencias métricas de US1 pero es independiente
- **User Story 3 (P3)**: Puede comenzar después de Foundational (Phase 2) - Referencias métricas de US1 pero es independiente
- **User Story 4 (P4)**: Puede comenzar después de Foundational (Phase 2) - Usa KPIs de US2 en calculadora pero es independiente

### Dentro de Cada User Story

- Archivos Markdown pueden crearse en paralelo si no comparten secciones
- Plantillas antes de documentos que las usan
- Ejemplos después de schemas que los validan
- Tests de validación después de contenido que validan
- Story completa antes de mover a siguiente prioridad

### Oportunidades de Paralelismo

- Todas las tareas Setup marcadas [P] pueden correr en paralelo
- Todas las tareas Foundational marcadas [P] pueden correr en paralelo (dentro de Phase 2)
- Una vez Foundational completa, todas las user stories pueden comenzar en paralelo (si hay capacidad de equipo)
- Dentro de cada user story, las tareas marcadas [P] pueden correr en paralelo
- Diferentes user stories pueden ser trabajadas en paralelo por diferentes miembros del equipo
- Todos los tests en Phase 7 marcados [P] pueden correr en paralelo

---

## Ejemplo de Paralelismo: User Story 1

```bash
# Lanzar todas las tareas de documentación de métricas DORA en paralelo:
Tarea: "Documentar métricas DORA - Lead Time en metrics-table.md" (T013)
Tarea: "Documentar métricas DORA - Deployment Frequency en metrics-table.md" (T014)
Tarea: "Documentar métricas DORA - Change Failure Rate en metrics-table.md" (T015)
Tarea: "Documentar métricas DORA - MTTR en metrics-table.md" (T016)

# Lanzar todas las tareas de documentación de métricas SPACE en paralelo:
Tarea: "Documentar métricas SPACE - Satisfaction en metrics-table.md" (T017)
Tarea: "Documentar métricas SPACE - Performance en metrics-table.md" (T018)
Tarea: "Documentar métricas SPACE - Activity en metrics-table.md" (T019)
Tarea: "Documentar métricas SPACE - Communication en metrics-table.md" (T020)
Tarea: "Documentar métricas SPACE - Efficiency en metrics-table.md" (T021)
```

---

## Ejemplo de Paralelismo: User Story 3

```bash
# Lanzar creación de todas las guías de medición en paralelo:
Tarea: "Crear archivo dora-metrics.md" (T036)
Tarea: "Crear archivo space-satisfaction.md" (T041)
Tarea: "Crear archivo space-performance.md" (T045)
Tarea: "Crear archivo space-activity.md" (T046)
Tarea: "Crear archivo space-communication.md" (T047)
Tarea: "Crear archivo space-efficiency.md" (T048)
```

---

## Estrategia de Implementación

### MVP Primero (Solo User Story 1)

1. Completar Phase 1: Setup (T001-T005)
2. Completar Phase 2: Foundational (T006-T011) - CRÍTICO - bloquea todas las stories
3. Completar Phase 3: User Story 1 (T012-T024)
4. **STOP y VALIDAR**: Probar User Story 1 independientemente
   - ¿Un Engineering Manager puede leer metrics-table.md y comenzar a medir 5+ métricas?
   - ¿La tabla tiene todas las categorías DORA y SPACE?
   - ¿Los métodos de medición son concretos y accionables?
5. Desplegar/demo si está listo

### Entrega Incremental

1. Completar Setup + Foundational → Fundación lista
2. Agregar User Story 1 → Probar independientemente → Desplegar/Demo (¡MVP!)
   - Valor entregado: Equipos pueden establecer baseline de métricas Flutter
3. Agregar User Story 2 → Probar independientemente → Desplegar/Demo
   - Valor entregado: CTOs pueden preparar business case ejecutivo
4. Agregar User Story 3 → Probar independientemente → Desplegar/Demo
   - Valor entregado: Team Leads pueden operacionalizar mediciones
5. Agregar User Story 4 → Probar independientemente → Desplegar/Demo
   - Valor entregado: CFOs pueden calcular ROI parametrizado
6. Cada story agrega valor sin romper stories previas

### Estrategia de Equipo Paralelo

Con múltiples desarrolladores/documentadores:

1. Equipo completa Setup + Foundational juntos (T001-T011)
2. Una vez Foundational completo:
   - Persona A: User Story 1 (Tabla de Métricas)
   - Persona B: User Story 2 (Dashboard Ejecutivo)
   - Persona C: User Story 3 (Guías de Medición)
   - Persona D: User Story 4 (Calculadora ROI)
3. Stories se completan e integran independientemente

---

## Notas

- [P] tareas = archivos diferentes, sin dependencias
- [Story] label mapea tarea a user story específica para trazabilidad
- Cada user story debe ser independientemente completable y testeable
- Commitear después de cada tarea o grupo lógico
- Detenerse en cualquier checkpoint para validar story independientemente
- Evitar: tareas vagas, conflictos en mismo archivo, dependencias cross-story que rompen independencia

---

## Resumen de Tareas

**Total de Tareas**: 90
- **Phase 1 (Setup)**: 5 tareas
- **Phase 2 (Foundational)**: 6 tareas
- **Phase 3 (US1 - Métricas)**: 13 tareas
- **Phase 4 (US2 - Dashboard)**: 11 tareas
- **Phase 5 (US3 - Guías)**: 15 tareas
- **Phase 6 (US4 - ROI)**: 17 tareas
- **Phase 7 (Polish)**: 23 tareas

**Oportunidades de Paralelismo**:
- Setup: 4 de 5 tareas paralelizables
- Foundational: 5 de 6 tareas paralelizables
- US1: 11 de 13 tareas paralelizables
- US2: 10 de 11 tareas paralelizables
- US3: 11 de 15 tareas paralelizables
- US4: 9 de 17 tareas paralelizables
- Polish: 17 de 23 tareas paralelizables

**Criterios de Test Independiente por Story**:
- ✅ US1: Engineering Manager puede medir 5+ métricas usando metrics-table.md
- ✅ US2: CTO puede preparar presentación ejecutiva en <2 horas con executive-dashboard.md
- ✅ US3: Team Lead puede ejecutar metodologías y obtener datos reales en <2 horas
- ✅ US4: CFO puede calcular ROI parametrizado en <10 minutos con calculadora web

**Alcance Sugerido del MVP**: User Story 1 únicamente (tabla de métricas DORA/SPACE para Flutter)
- 13 tareas de implementación (T012-T024)
- Entrega valor inmediato: equipos pueden empezar a medir su estado actual
- Testeable independientemente: verificar completitud de métricas
- Fundación para stories posteriores sin bloquearlas

**Formato Validado**: ✅ TODAS las tareas siguen formato de checklist (checkbox, ID, labels [P] y [Story] donde aplican, paths de archivos)
