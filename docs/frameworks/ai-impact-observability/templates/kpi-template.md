# Plantilla de KPI Ejecutivo

**Fecha de Creación**: [YYYY-MM-DD]
**Versión del Framework**: [X.Y.Z]
**Autor**: [Tu Nombre]

---

## Identificación

| Campo | Valor |
|-------|-------|
| **ID** | `KPI-[###]` |
| **Nombre** | [Título ejecutivo accionable - máximo 80 caracteres] |
| **Prioridad** | `[1-5]` (1 = más crítico) |

**Restricción**: Solo puede haber exactamente **5 KPIs** en el Dashboard Ejecutivo. Si agregas uno nuevo, debes deprecar uno existente o justificar por qué este reemplaza a otro.

---

## Descripción Ejecutiva

### Narrativa de Impacto (Para Presentaciones)

[Una frase poderosa de 1-2 líneas que un CTO/CFO pueda usar en presentaciones. DEBE incluir cifra en dólares. Máximo 200 caracteres.]

**Ejemplo**:
> "Nuestro proceso de onboarding lento cuesta **$240K/año** en productividad perdida - 50% recuperable con desarrollo asistido por IA."

### ¿Qué Mide Este KPI?

[Explicación en lenguaje de negocio, NO técnico. Evita jerga como "refactoring", "technical debt", "code review". Usa conceptos como "time to market", "revenue loss", "talent retention", "opportunity cost". Máximo 300 caracteres.]

**Ejemplo**:
> Este KPI mide cuánto tiempo y dinero pierde la empresa al incorporar nuevos desarrolladores Flutter. Incluye el período desde que un developer es contratado hasta que es productivo al nivel de un miembro senior del equipo (42 días promedio).

---

## Audiencia Objetivo

¿Quién debe ver este KPI en presentaciones?

- [ ] **CTO** (Chief Technology Officer)
- [ ] **CFO** (Chief Financial Officer)
- [ ] **VP Engineering** (Vice President of Engineering)
- [ ] **CEO** (Chief Executive Officer)

[Marca con [x] todos los stakeholders relevantes]

---

## Métricas Subyacentes

Este KPI se construye a partir de las siguientes métricas DORA/SPACE:

| Métrica ID | Nombre de Métrica | Contribución al KPI |
|------------|-------------------|---------------------|
| `[ID]` | [Nombre] | [Cómo esta métrica aporta al KPI - ej: "Tiempo de onboarding es el componente principal"] |
| `[ID]` | [Nombre] | [Explicación] |

**Nota**: Debe haber **al menos 1 métrica** listada aquí. Si ninguna métrica existente cubre este KPI, primero crea las métricas necesarias usando `metric-template.md`.

---

## Cálculo de Costo Anual

### Fórmula de Costo de Inacción (Baseline Sin IA)

**Componentes del Cálculo**:

```
Componente 1: [Descripción]
Fórmula: [Expresión matemática]

Componente 2: [Descripción]
Fórmula: [Expresión matemática]

...

Costo Total Anual = Componente 1 + Componente 2 + ...
```

### Parámetros Requeridos

| Parámetro | Descripción | Valor Típico | Fuente de Datos |
|-----------|-------------|--------------|-----------------|
| `tamañoEquipo` | Número de developers Flutter | 20 | HR/Payroll |
| `salarioPromedio` | Salario anual promedio en USD | $150,000 | HR/Payroll |
| `[otro parámetro]` | [Descripción] | [Valor] | [Fuente] |

### Ejemplo de Cálculo (Equipo de 20 Developers)

**Datos de Entrada**:
- Tamaño de equipo: 20 developers
- Salario promedio: $150,000/año ($72/hora asumiendo 2080h/año)
- [Otro dato]: [Valor]

**Cálculo Paso a Paso**:

```
Paso 1: [Descripción del cálculo]
= [Expresión numérica]
= $[Resultado parcial]

Paso 2: [Descripción del cálculo]
= [Expresión numérica]
= $[Resultado parcial]

Costo Total Anual (Baseline Sin IA) = $[TOTAL]
```

---

## Impacto Esperado de IA

### Porcentaje de Mejora Proyectado

**Mejora Esperada**: [X]% de reducción en el costo/problema

**Justificación**: [Explicación de qué capacidades específicas de IA (autocompletado, generación de código, debugging asistido, documentación automática) contribuyen a esta mejora y por qué este porcentaje es realista]

**Fuentes de Evidencia**:
- [Cita estudio/paper/encuesta que respalda esta proyección]
- [Ejemplo: "GitHub Copilot Impact Study (2022): 55% faster task completion"]

### Fórmula de Ahorro Anual

```
Ahorro Anual = Costo Baseline × (% Mejora ÷ 100)

Ejemplo:
Ahorro Anual = $240,000 × (50% ÷ 100)
             = $240,000 × 0.50
             = $120,000/año
```

### Costo de Inversión en IA

**Herramientas Necesarias**:

| Herramienta | Costo por Developer | Costo Anual (20 devs) |
|-------------|---------------------|------------------------|
| GitHub Copilot | $39/mes | $9,360/año |
| [Otra herramienta] | $[X]/mes | $[Y]/año |

**Inversión Total Anual**: $[TOTAL]

### ROI del KPI

```
ROI % = [(Ahorro Anual - Inversión Anual) ÷ Inversión Anual] × 100

Ejemplo:
ROI % = [($120,000 - $9,360) ÷ $9,360] × 100
      = ($110,640 ÷ $9,360) × 100
      = 1,182%
```

**Payback Period**:
```
Payback = (Inversión Anual ÷ Ahorro Anual) × 365 días

Ejemplo:
Payback = ($9,360 ÷ $120,000) × 365
        = 0.078 × 365
        = 28.5 días
```

---

## Visualización Recomendada

### Tipo de Gráfico

**Visualización Sugerida**: `[BAR_CHART | PIE_CHART | LINE_CHART | GAUGE | TIMELINE]`

**Justificación**: [Por qué este tipo de gráfico es el más efectivo para comunicar este KPI a ejecutivos]

### Mockup de Visualización (ASCII Art)

```
[Crear un mockup simple en texto ASCII del gráfico sugerido]

Ejemplo para Bar Chart:

Costo de Onboarding Lento

             ┌─────────────────────────────────┐
$240K ───────┤█████████████████████████████████│ Sin IA (Baseline)
             └─────────────────────────────────┘
             ┌──────────────────┐
$120K ───────┤████████████████  │ Con IA (Proyectado)
             └──────────────────┘
                            Ahorro: $120K/año
```

### Elementos Visuales Clave

La visualización DEBE incluir:
- [ ] **Valor baseline** (costo actual sin IA)
- [ ] **Valor proyectado** (costo con IA)
- [ ] **Ahorro en dólares** (diferencia entre baseline y proyectado)
- [ ] **ROI %** o **Payback Period**
- [ ] **Contexto temporal** (ej: "Datos de últimos 6 meses" o "Proyección a 12 meses")

---

## Formatos de Exportación

Este KPI debe ser exportable a los siguientes formatos para presentaciones ejecutivas:

### PDF (Para Email/Impresión)
- Layout: 1 página A4
- Incluye: Gráfico + tabla de números clave + narrativa de 2-3 líneas

### PowerPoint (Para Presentaciones)
- Layout: 1 slide
- Template: [Especificar si hay template corporativo específico]
- Incluye: Gráfico grande + título impactante + cifra destacada

### PNG (Para Dashboards/Slack)
- Resolución: 1920×1080 (Full HD)
- Fondo: Transparente o blanco
- Incluye: Gráfico + etiquetas de datos

---

## Ejemplo Trabajado: Escenarios por Tamaño de Equipo

### Equipo Pequeño (5 Developers)

**Datos**:
- Tamaño de equipo: 5
- Salario promedio: $120K/año
- [Otros parámetros relevantes]

**Costo Baseline Sin IA**: $[X]/año
**Ahorro Proyectado Con IA**: $[Y]/año
**ROI**: [Z]%
**Payback**: [W] días

### Equipo Mediano (20 Developers)

[Mismo formato que arriba]

### Equipo Grande (50 Developers)

[Mismo formato que arriba]

---

## Sensibilidad del KPI

### Análisis "Qué Pasa Si"

¿Qué pasa si las mejoras de IA son **menores** a lo proyectado?

| Escenario | Mejora Proyectada | Ahorro Anual | ROI % | ¿Aún Vale la Pena? |
|-----------|-------------------|--------------|-------|--------------------|
| **Optimista** | [X]% | $[Y] | [Z]% | Sí/No |
| **Realista** | [X]% | $[Y] | [Z]% | Sí/No |
| **Conservador** | [X]% | $[Y] | [Z]% | Sí/No |
| **Pesimista** | [X]% | $[Y] | [Z]% | Sí/No |

**Punto de Break-Even**: El ROI es neutral (0%) si la mejora es menor a [X]%.

---

## Relación con Otros KPIs

### Sinergia con Otros KPIs

Este KPI tiene sinergia o overlap con:

- **KPI-[###]**: [Nombre] - [Explicación de cómo se relacionan]
- **KPI-[###]**: [Nombre] - [Explicación de cómo se relacionan]

**Nota**: Si hay sinergia significativa, asegúrate de NO contar el mismo ahorro dos veces en el "Costo Total de Inacción" del Dashboard Ejecutivo.

---

## Validación y Testing

### Checklist de Validación de KPI

Antes de agregar este KPI al framework, verifica:

- [ ] El `id` sigue el patrón `KPI-[###]`
- [ ] El `nombre` tiene menos de 80 caracteres y es accionable
- [ ] La `descripcionEjecutiva` NO usa jerga técnica
- [ ] La `narrativaCostoInaccion` incluye una cifra en dólares
- [ ] Hay al menos 1 métrica subyacente especificada
- [ ] La fórmula de costo anual es completa y calculable
- [ ] El ejemplo de cálculo tiene números reales y verificables
- [ ] El impacto esperado de IA está justificado con fuentes
- [ ] El ROI y payback period están calculados correctamente
- [ ] La visualización sugerida es apropiada para audiencia ejecutiva
- [ ] El análisis de sensibilidad incluye al menos 3 escenarios

### Test de Comprensión

Muestra este KPI a un stakeholder no técnico (CFO, CEO, HR Director):

1. ¿Entienden qué se está midiendo? **[Sí/No]**
2. ¿Ven el impacto financiero claramente? **[Sí/No]**
3. ¿Pueden explicar por qué importa en sus propias palabras? **[Sí/No]**
4. ¿Considerarían actuar sobre este dato? **[Sí/No]**

---

## Metadata

| Campo | Valor |
|-------|-------|
| **Fecha de Última Actualización** | [YYYY-MM-DD] |
| **Versión de Plantilla** | 1.0.0 |
| **Estado** | `[DRAFT | REVIEW | APPROVED]` |
| **Revisado por** | [Nombre del revisor] |
| **Aprobado por** | [CTO/CFO/VP] |

---

## Notas Adicionales

[Cualquier información adicional relevante, limitaciones conocidas, alternativas consideradas, factores de riesgo que podrían afectar el ROI, etc.]

---

**Siguiente Paso**: Después de completar esta plantilla, agregar el KPI a:
1. `docs/frameworks/ai-impact-observability/executive-dashboard.md` (sección completa del KPI)
2. `docs/frameworks/ai-impact-observability/data/kpis/[id].json` (definición JSON validada)
3. Vincular métricas relacionadas en `metrics-table.md`
4. Actualizar "Costo Total de Inacción" en `executive-dashboard.md` sumando este KPI
