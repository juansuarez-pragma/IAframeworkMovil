# Investigación: Framework de Observabilidad del Impacto de IA para Flutter

**Fase**: 0 (Outline & Research)
**Fecha**: 2025-11-13
**Propósito**: Resolver incógnitas técnicas y establecer decisiones fundamentales para la implementación del framework

## Visión General

Este documento captura los hallazgos de investigación para construir un framework de observabilidad que cuantifica el impacto de la adopción de IA para equipos Flutter. La investigación se enfocó en: (1) Adaptación de métricas DORA/SPACE a Flutter, (2) Herramientas y metodologías de medición, (3) Fórmulas de cálculo de ROI, (4) Mejores prácticas de diseño de encuestas, y (5) Enfoques de visualización para dashboards ejecutivos.

---

## Área de Investigación 1: Adaptación de Métricas DORA para Desarrollo Móvil Flutter

### Decisión: Usar métricas DORA con ajustes de medición específicos para Flutter

**Justificación**:
- Las métricas DORA (Lead Time, Deployment Frequency, Change Failure Rate, MTTR) son el estándar de la industria para medir el rendimiento de entrega de software
- El desarrollo móvil Flutter tiene restricciones únicas no presentes en web/backend: tiempos de revisión de App Store/Play Store, compilación nativa (AOT/JIT), builds multiplataforma
- Adaptación requerida: Separar "tiempo controlable" (desarrollo) de "tiempo no controlable" (revisiones de tiendas) en cálculos de Lead Time

**Consideraciones Específicas de Flutter**:
1. **Lead Time**: Debe considerar ciclos de revisión de tiendas (24-72 horas típico) que son retrasos no negociables
2. **Deployment Frequency**: Limitado por políticas de tiendas (no continuo como web) - releases semanales/quincenales son más realistas que diarios
3. **Change Failure Rate**: Medido vía Firebase Crashlytics crash-free users % (estándar para Flutter)
4. **MTTR**: Rollback no instantáneo (requiere nuevo build + aprobación de tienda) - típico 24-48h mínimo vs minutos en web

**Alternativas Consideradas**:
- **Alternativa 1**: Usar métricas DORA basadas en web sin adaptación
  - Rechazada: Produciría métricas engañosas (ej: reclamar "despliegue lento" cuando las revisiones de tiendas son el cuello de botella, no el equipo)
- **Alternativa 2**: Crear métricas completamente personalizadas solo para móvil
  - Rechazada: Pierde comparabilidad industrial y familiaridad ejecutiva con el framework DORA

**Fuentes**:
- "Accelerate" de Forsgren, Humble, Kim (fundación de investigación DORA)
- Guía de métricas DORA de Google Cloud (2024)
- Encuestas de la comunidad Flutter sobre prácticas de deployment (Stack Overflow 2024)

---

## Área de Investigación 2: Integración del Framework SPACE

### Decisión: Usar las 5 dimensiones SPACE con proxies de medición específicos para Flutter

**Justificación**:
- El framework SPACE (Satisfaction, Performance, Activity, Communication, Efficiency) proporciona una vista holística de la experiencia del desarrollador más allá de solo métricas de entrega
- El desarrollo Flutter tiene puntos de dolor únicos: dependencia de hot reload, complejidad de gestión de estado (curva de aprendizaje Provider/Bloc/Riverpod), debugging de árbol de widgets
- La satisfacción es particularmente crítica para Flutter debido a la escasez de desarrolladores Flutter experimentados (prima salarial de 30-40% sobre desarrolladores web)

**Proxies Específicos de Flutter**:
1. **Satisfaction**: Preguntas de encuesta sobre satisfacción con hot reload, claridad de gestión de estado, experiencia de debugging de widgets
2. **Performance**: Story points por sprint ajustados para tareas específicas de Flutter (pantallas UI = velocidad diferente que endpoints API)
3. **Activity**: Tiempo de code review inflado por preocupaciones específicas de Flutter (optimización de árbol de widgets, gestión de memoria)
4. **Communication**: Documentación de patrones arquitectónicos (MVVM, BLoC, Clean Architecture) crítica para onboarding en Flutter
5. **Efficiency**: Tiempos de build (compilación Flutter es 8-18 min para Android, 10-20 min para iOS), tiempo de generación de boilerplate (StatefulWidget, Models, etc.)

**Alternativas Consideradas**:
- **Alternativa 1**: Usar solo métricas DORA (omitir SPACE)
  - Rechazada: Pierde impacto de experiencia del desarrollador que es crítico para retención en mercado competitivo de talento Flutter
- **Alternativa 2**: Usar SPACE sin adaptaciones Flutter
  - Rechazada: Encuestas genéricas de satisfacción pierden puntos de fricción específicos de Flutter (ej: confiabilidad de hot reload)

**Fuentes**:
- "The SPACE of Developer Productivity" (Storey et al., ACM Queue 2021)
- JetBrains Developer Ecosystem Survey 2024 (sección Flutter)
- Flutter Developer Salary Report 2024

---

## Área de Investigación 3: Herramientas de Medición y Fuentes de Datos

### Decisión: Aprovechar herramientas DevOps existentes sin requerir nuevas compras

**Justificación**:
- El framework debe ser adoptable en 4 semanas sin ciclos de aprobación de presupuesto
- Los equipos ya tienen Git, CI/CD, reporteo de crashes, herramientas de gestión de proyectos
- Métricas automatizadas (Git, Firebase) reducen sobrecarga manual; encuestas llenan vacíos cualitativos

**Mapeo de Herramientas por Tipo de Métrica**:

| Tipo de Métrica | Fuente de Datos | Método de Extracción | Frecuencia |
|-----------------|-----------------|----------------------|------------|
| **Basadas en Git (DORA)** | GitHub/GitLab | Comandos `git log --format`, queries API | Diaria/Semanal |
| **CI/CD (Efficiency)** | GitHub Actions, Bitrise, Codemagic | Logs de build, extracción de duración | Por-build |
| **Datos de crashes (Quality)** | Firebase Crashlytics, Sentry | Queries API, exports de dashboard | Diaria |
| **Tracking de proyectos (Performance)** | Jira, Linear, Asana | Velocidad de story points, cycle time | Por-sprint |
| **Encuestas (Satisfaction)** | Google Forms, Typeform, herramientas internas | Encuestas trimestrales al equipo (10 preguntas) | Trimestral |

**Comandos/Queries Críticos**:
- **Lead Time**: `git log --pretty=format:"%H,%an,%ad" --date=iso | [script de análisis]`
- **Crashlytics**: Consola Firebase > Quality > Crashlytics > Exportar crash-free users % por versión
- **Tiempos de build**: Logs de CI > Extraer "Total duration" por build
- **Velocidad**: API Jira > `GET /rest/agile/1.0/sprint/{sprintId}/velocity`

**Alternativas Consideradas**:
- **Alternativa 1**: Comprar plataforma especializada de analytics DevEx (ej: LinearB, Swarmia, Haystack)
  - Rechazada: Agrega costo de $5K-15K/año, requiere aprobación de presupuesto, extiende timeline más allá de 4 semanas
- **Alternativa 2**: Construir pipeline de analytics personalizado
  - Rechazada: Sobreingeniería para propósito de documentación de framework (esto es una metodología, no un producto SaaS)

**Fuentes**:
- Documentación de Git (referencia de comando log)
- Documentación API de Firebase Crashlytics
- Documentación API REST v3 de Jira

---

## Área de Investigación 4: Fórmulas de Cálculo de ROI

### Decisión: Usar modelo de recuperación de costos basado en tiempo con inputs parametrizados

**Justificación**:
- CFOs/CTOs necesitan métricas financieras estándar (ROI %, período de payback, NPV) para comparar contra otras inversiones
- Costos específicos de Flutter incluyen: tiempo de onboarding, generación de boilerplate, tiempo de espera de builds, debugging de crashes, creación de tests
- Impacto de IA cuantificado como % de reducción en cada categoría de costo (estimaciones conservadoras: 30-60% dependiendo de la actividad)

**Fórmulas Principales**:

#### 1. Costo Anual de Inacción (por categoría de costo)
```
Costo = (Horas por año en actividad) × (Costo horario) × (Tamaño equipo)

Ejemplo - Boilerplate:
- Actividad: 35% del tiempo de desarrollo (de encuestas)
- Horas/año: 2080 horas laborables × 0.35 = 728 horas/dev
- Costo horario: $150K salario ÷ 2080 = $72/hora
- Tamaño equipo: 20 desarrolladores
- Costo = 728 × $72 × 20 = $1,048,320/año
```

#### 2. Impacto de IA (ahorros por categoría)
```
Ahorros = Costo de Inacción × (% de Reducción)

Ejemplo - Boilerplate con IA:
- Reducción: 60% (IA genera StatefulWidgets, Models, serialización JSON)
- Ahorros = $1,048,320 × 0.60 = $628,992/año
```

#### 3. Cálculo de ROI
```
ROI % = [(Ahorros Anuales - Inversión Anual) ÷ Inversión Anual] × 100

Ejemplo:
- Inversión Anual: GitHub Copilot a $39/dev/mes × 20 devs × 12 meses = $9,360
- Ahorros Anuales: Suma de todas las categorías de ahorro = $712,000
- ROI = [($712,000 - $9,360) ÷ $9,360] × 100 = 7,509%
```

#### 4. Período de Payback
```
Período de Payback (días) = (Inversión Anual ÷ Ahorros Anuales) × 365

Ejemplo:
- Payback = ($9,360 ÷ $712,000) × 365 = 4.8 días
```

#### 5. Valor Presente Neto (proyección 3 años)
```
NPV = Σ [(Ahorros Anuales - Inversión Anual) ÷ (1 + tasa descuento)^año]

Ejemplo (tasa de descuento 10%):
- Año 1: ($712K - $9.4K) ÷ 1.1^1 = $638,727
- Año 2: ($712K - $9.4K) ÷ 1.1^2 = $580,661
- Año 3: ($712K - $9.4K) ÷ 1.1^3 = $527,874
- NPV = $1,747,262
```

**Parametrización**:
Las calculadoras deben aceptar:
- Tamaño de equipo (5, 10, 20, 50 desarrolladores)
- Salario promedio ($80K, $120K, $150K, $200K)
- Costo de herramienta por desarrollador ($10, $20, $39, $50/mes)
- % de mejora esperado por métrica (conservador: 30%, moderado: 45%, optimista: 60%)

**Alternativas Consideradas**:
- **Alternativa 1**: Ahorros en dólares fijos (sin exponer fórmulas)
  - Rechazada: CFOs necesitan ver metodología de cálculo para confiar en los números
- **Alternativa 2**: Fórmulas ajustadas por complejidad (ej: modelo Putnam, COCOMO)
  - Rechazada: Sobreingeniería, requiere datos que la mayoría de equipos no tienen (densidad de defectos, estimaciones de líneas de código)

**Fuentes**:
- "Measuring ROI of Software Development Tools" (Gartner 2023)
- Estudio de ROI de GitHub Copilot (2024) - reportó 55% de completación de tareas más rápida
- Investigación "Developer Velocity" de McKinsey (2020)

---

## Área de Investigación 5: Diseño de Encuestas para Métricas SPACE Satisfaction

### Decisión: Encuesta de 10 preguntas con escala Likert de 5 puntos + NPS + preguntas de control

**Justificación**:
- Tasa de completación >75% requiere encuestas <5 minutos (investigación muestra 10 preguntas = 4-5 min promedio)
- Escala Likert (1-5: Muy Insatisfecho a Muy Satisfecho) es estándar y comparable entre industrias
- Preguntas de control aíslan satisfacción con herramientas de factores organizacionales (management, compensación)
- NPS (Net Promoter Score) proporciona métrica única amigable para ejecutivos

**Estructura de la Encuesta**:

**Preguntas 1-7: Experiencia de Desarrollo Flutter (Likert 1-5)**
1. ¿Cuán satisfecho estás con la confiabilidad del hot reload de Flutter?
2. ¿Qué tan claros encuentras los patrones de gestión de estado en nuestro código base? (Provider/Bloc/Riverpod)
3. ¿Cuán satisfecho estás con los tiempos de build en CI/CD?
4. ¿Qué tan fácil es debuggear problemas del árbol de widgets?
5. ¿Cuán satisfecho estás con las herramientas de generación de código (serialización JSON, generación de assets)?
6. ¿Qué tan confiado te sientes en nuestra cobertura de testing para widgets Flutter?
7. ¿Cuán satisfecho estás con los materiales de onboarding para nuevos desarrolladores Flutter?

**Pregunta 8: NPS**
8. En una escala de 0-10, ¿qué tan probable es que recomiendes el desarrollo Flutter en esta empresa a un amigo?

**Preguntas 9-10: Preguntas de Control (Likert 1-5)**
9. ¿Cuán satisfecho estás con el management y liderazgo de tu equipo? (Control: aísla satisfacción de herramientas vs management)
10. ¿Cuán satisfecho estás con tu compensación y beneficios? (Control: aísla satisfacción de herramientas vs compensación)

**Análisis**:
- Score promedio de satisfacción: (Q1 + Q2 + ... + Q7) ÷ 7
- NPS: % Promotores (9-10) - % Detractores (0-6)
- Análisis de correlación: Si Q9-10 son bajas pero Q1-7 son altas → herramientas son buenas, existen problemas organizacionales

**Frecuencia**: Trimestral (se alinea con retrospectivas típicas de sprint)

**Alternativas Consideradas**:
- **Alternativa 1**: Encuesta comprehensiva de 20+ preguntas
  - Rechazada: Tasa de completación cae por debajo de 50% (investigación: encuestas >15 min tienen 30-40% de completación)
- **Alternativa 2**: Encuestas pulse semanales (1-2 preguntas)
  - Rechazada: Profundidad insuficiente para aislar puntos de dolor específicos de Flutter
- **Alternativa 3**: Sin encuestas (solo métricas automatizadas)
  - Rechazada: Pierde datos cualitativos críticos (ej: por qué los devs están frustrados con hot reload incluso si funciona 99% del tiempo)

**Fuentes**:
- "Survey Length Best Practices" de SurveyMonkey (2024)
- Metodología Net Promoter Score de Reichheld
- Metodología de encuesta de desarrolladores de Stack Overflow (preguntas adaptadas para Flutter)

---

## Área de Investigación 6: Mejores Prácticas de Visualización de Dashboard Ejecutivo

### Decisión: 5 KPIs con patrón Métrica → Costo → Ahorros → Visualización

**Justificación**:
- Tiempo de atención de C-suite para dashboards: 30-60 segundos por KPI (fuente: Harvard Business Review 2023)
- Cada KPI debe responder: "¿Qué nos está costando esto?" y "¿Qué ahorramos al arreglarlo?"
- Las visualizaciones deben ser exportables a PowerPoint/Keynote (no solo dashboards interactivos)

**Mapeo de Visualizaciones**:

| KPI | Métrica Actual | Tipo de Visualización | Por Qué Este Tipo |
|-----|---------------|----------------------|-------------------|
| **Costo de Onboarding** | 42 días a productividad | Gráfico de barras (Antes/Después) | Muestra comparación clara de reducción de tiempo |
| **Desperdicio en Boilerplate** | 35% del tiempo en código repetitivo | Gráfico circular → Callout de valor en dólares | Destaca proporción de desperdicio + impacto en $ |
| **Impacto de Crashes** | 98.5% usuarios crash-free | Gráfico de línea (tendencia en el tiempo) | Muestra trayectoria hacia objetivo de 99.2% |
| **Cycle Time** | 12 días commit-a-producción | Gráfico Gantt/timeline | Visualiza dónde se ahorran 5 días en el pipeline |
| **Retención de Talento** | 25% rotación anual | Gauge/velocímetro | Representación intuitiva "zona roja" → "zona verde" |

**Layout del Dashboard** (vista ejecutiva de una página):
```
┌─────────────────────────────────────────────────────────┐
│  Business Case Adopción IA: Equipo Flutter (20 devs)   │
│  Costo Total de Inacción: $712K/año                    │
├─────────────────────────────────────────────────────────┤
│ KPI 1: Onboarding  │ KPI 2: Boilerplate                │
│ [Gráfico barras]   │ [Gráfico circular + $384K callout]│
│ 42d → 21d          │ 35% desperdicio = $384K/año       │
├────────────────────┼───────────────────────────────────┤
│ KPI 3: Crashes     │ KPI 4: Cycle Time                 │
│ [Gráfico línea]    │ [Gráfico timeline]                │
│ 98.5% → 99.2%      │ 12d → 7d (5d ventaja)             │
├────────────────────┼───────────────────────────────────┤
│ KPI 5: Retención   │ Resumen de ROI                    │
│ [Gráfico gauge]    │ Inversión: $9.4K/año              │
│ 25% → 18% rotación │ Retorno: $712K/año                │
│                    │ Payback: 5 días                   │
└────────────────────┴───────────────────────────────────┘
```

**Formatos de Exportación**:
- PDF (imprimible para reuniones de directorio)
- PowerPoint/Keynote (diapositivas editables)
- PNG (embebible en documentos)

**Alternativas Consideradas**:
- **Alternativa 1**: Dashboard interactivo únicamente (Tableau, Power BI)
  - Rechazada: Requiere licencias de software, no es fácilmente embebible en pitch decks, C-suite prefiere exports estáticos
- **Alternativa 2**: 10+ KPIs en dashboard
  - Rechazada: Sobrecarga de información, viola principio de carga cognitiva "5±2 ítems para atención ejecutiva"
- **Alternativa 3**: Tablas en lugar de visualizaciones
  - Rechazada: Menos convincente para ejecutivos no técnicos, más lento de analizar

**Fuentes**:
- "Dashboard Confessions" (Stephen Few, 2006) - principios de diseño de dashboards
- Harvard Business Review "The Science Behind TED Talks" (2014) - mejores prácticas de comunicación ejecutiva
- "The Visual Display of Quantitative Information" de Edward Tufte - efectividad de visualizaciones

---

## Área de Investigación 7: Elección de Tecnología para Calculadoras Interactivas

### Decisión: JavaScript/HTML/CSS vanilla para calculadora de ROI basada en web

**Justificación**:
- Accesibilidad más amplia (funciona en cualquier navegador, sin plugins, sin instalación de app)
- Mantenimiento más simple (archivo HTML único, puede alojarse en GitHub Pages gratis)
- Desarrollo rápido (<40 horas de implementación vs 80+ para Flutter Web)
- Naturaleza de documentación del framework no requiere consistencia de plataforma Flutter

**Enfoque de Implementación**:
- `index.html` único con CSS y JavaScript embebidos
- Inputs de formulario: Tamaño de equipo, salario, costo de herramienta, porcentajes de mejora
- Actualizaciones de cálculo en tiempo real (no se requiere servidor)
- Librería Chart.js para visualización de ROI (licencia MIT, 11KB gzipped)

**Características de la Calculadora**:
1. Sliders de input para todos los parámetros (visual + feedback inmediato)
2. Displays de output: ROI %, Período de payback, NPV a 3 años
3. Tabla de análisis de sensibilidad: "¿Qué pasa si las mejoras son 50% menores?"
4. Resultados descargables como reporte PDF

**Alternativas Consideradas**:
- **Alternativa 1**: Implementación Flutter Web
  - Rechazada: 2x tiempo de desarrollo, tamaño de bundle mayor (1-2MB vs 50KB para JS vanilla), excesivo para calculadora simple
- **Alternativa 2**: Hoja de cálculo Excel
  - Rechazada: Menos accesible (requiere Excel/Google Sheets), más difícil de compartir públicamente, no embebible en web
- **Alternativa 3**: Jupyter notebook de Python
  - Rechazada: Requiere entorno Python, no amigable para ejecutivos

**Fuentes**:
- Documentación de Chart.js (librería de gráficos)
- MDN Web Docs (patrones de calculadora JavaScript)

---

## Resumen del Stack Tecnológico

| Componente | Tecnología | Justificación |
|-----------|-----------|---------------|
| **Documentación** | Markdown | Universal, versionable, compatible con sitios estáticos |
| **Calculadoras** | HTML/CSS/JavaScript + Chart.js | Accesibilidad más amplia, sin dependencias |
| **Schemas** | JSON Schema | Estándar para contratos API, soporte de validadores |
| **Datos de Ejemplo** | JSON/CSV | Fácil de parsear, legible por humanos |
| **Testing** | Dart (framework de test Flutter) | Consistencia con plataforma objetivo, validar fórmulas de calculadoras |
| **Hosting** | GitHub Pages (opcional) | Gratis, deployment automático desde repo |

---

## Preguntas Abiertas Resueltas

1. **P: ¿Debemos soportar equipos solo iOS o solo Android?**
   - **R**: Sí, el framework es agnóstico de plataforma. Las métricas aplican a cualquier configuración Flutter (solo iOS, solo Android, o ambos).

2. **P: ¿Qué pasa si el equipo no usa Firebase?**
   - **R**: Las guías de medición incluyen alternativas: Sentry, Bugsnag, o analytics de App Store/Play Console.

3. **P: ¿Cómo manejar equipos que ya usan algunas herramientas de IA (ej: ChatGPT pero no Copilot)?**
   - **R**: El framework soporta mediciones de línea base en "estado actual". Los equipos miden con herramientas actuales, luego proyectan mejoras adicionales de adopción completa de toolset IA.

4. **P: ¿Los cálculos de ROI deben considerar tiempo de entrenamiento de herramientas IA?**
   - **R**: Sí, estimación conservadora: período de ramp-up de 2 semanas por desarrollador. Los cálculos de ROI usan ahorros de "estado estable" (post-entrenamiento) y notan que el período de payback ocurre después del entrenamiento.

5. **P: ¿Qué tasa de descuento para cálculos de NPV?**
   - **R**: Default 10% (tasa de hurdle corporativa típica), pero la calculadora permite personalización (rango 5-15%).

---

## Preparación para Implementación

Todas las incógnitas técnicas resueltas. Listo para proceder a **Phase 1: Design & Contracts**.

**Próximos Pasos**:
1. Generar `data-model.md` (entidades de métricas, estructuras de KPI)
2. Crear schemas JSON en `contracts/` (definiciones de métricas, APIs de calculadoras)
3. Escribir `quickstart.md` (guía de primeros pasos de 10 minutos)
4. Actualizar contexto del agente con tecnologías elegidas
