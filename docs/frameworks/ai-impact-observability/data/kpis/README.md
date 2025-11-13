# Directorio de KPIs Ejecutivos

**Propósito**: Almacenar definiciones JSON de los 5 KPIs críticos del Dashboard Ejecutivo.

---

## Restricción Importante

Este directorio contiene **exactamente 5 archivos** (uno por cada KPI del Dashboard Ejecutivo):

- `KPI-001.json` - Costo de Onboarding Lento
- `KPI-002.json` - Costo de Boilerplate y Tareas Repetitivas
- `KPI-003.json` - Impacto de Crashes en Revenue
- `KPI-004.json` - Costo de Cycle Time Lento
- `KPI-005.json` - Costo de Rotación de Talento

**Por qué solo 5?** Los dashboards ejecutivos deben ser concisos. Más de 5 KPIs causan sobrecarga de información y diluyen el mensaje. Si quieres agregar un sexto KPI, debes reemplazar uno existente (ver `CONTRIBUTING.md`).

---

## Convención de Nomenclatura

**Formato**: `KPI-[NUMERO].json` donde `[NUMERO]` es 001-005 (con padding de ceros).

**Importante**: El número del archivo debe coincidir con el campo `id` dentro del JSON.

---

## Estructura de un Archivo de KPI

Cada archivo JSON debe contener:

```json
{
  "id": "KPI-001",
  "nombre": "Costo de Onboarding Lento",
  "descripcionEjecutiva": "Tiempo y dinero perdidos al incorporar nuevos developers Flutter hasta productividad plena",
  "metricasSubyacentes": ["SPACE-ACT-002"],
  "calculoCostoAnual": {
    "formula": "(Días Onboarding ÷ 365) × Salario Promedio × Nuevas Contrataciones/Año",
    "parametros": {
      "diasOnboarding": 42,
      "salarioPromedio": 150000,
      "nuevasContrataciones": 4
    }
  },
  "costoBaselineDolares": 80000,
  "ahorroProyectadoDolares": 40000,
  "visualizacionSugerida": "BAR_CHART",
  "ejemploVisualizacion": "Gráfico de barras comparando costo actual ($80K) vs costo con IA ($40K)",
  "narrativaCostoInaccion": "Nuestro proceso de onboarding lento cuesta $80K/año en productividad perdida - 50% recuperable con desarrollo asistido por IA.",
  "prioridad": 1,
  "audienciaObjetivo": ["CTO", "VP_ENGINEERING"],
  "fechaCreacion": "2025-11-13T00:00:00Z",
  "versionFramework": "1.0.0"
}
```

---

## Validación de Schema

**Schema de referencia**: `../schemas/kpi-dashboard-schema.json`

### Validar un archivo:

```bash
# Con jsonschema (Python)
jsonschema -i KPI-001.json ../../schemas/kpi-dashboard-schema.json

# Con ajv-cli (Node.js)
ajv validate -s ../../schemas/kpi-dashboard-schema.json -d KPI-001.json
```

### Validar todos los KPIs:

```bash
# Bash loop
for file in KPI-*.json; do
  echo "Validando $file..."
  jsonschema -i "$file" ../../schemas/kpi-dashboard-schema.json
done
```

---

## Reglas de Validación

### 1. Nombre Accionable

El campo `nombre` debe ser específico y orientado a acción.

**Ejemplos válidos**:
- ✅ "Costo de Onboarding Lento"
- ✅ "Impacto de Crashes en Revenue"
- ✅ "Costo de Rotación de Talento"

**Ejemplos inválidos**:
- ❌ "Onboarding" (demasiado genérico)
- ❌ "Métricas de Calidad" (no es específico)
- ❌ "Technical Debt" (usa jerga técnica)

### 2. Descripción Ejecutiva Sin Jerga Técnica

El campo `descripcionEjecutiva` debe usar lenguaje de negocio, NO términos técnicos.

**Términos a evitar**:
- Refactoring → usar "mejoras de código"
- Technical debt → usar "costos de mantenimiento"
- Code review → usar "revisión de cambios"
- Deployment → usar "lanzamiento de versión"

### 3. Narrativa Debe Incluir Cifra en Dólares

El campo `narrativaCostoInaccion` DEBE incluir una cifra específica en dólares.

**Ejemplo válido**:
> "Nuestro proceso de onboarding lento cuesta **$80K/año** en productividad perdida..."

**Ejemplo inválido**:
> "Nuestro proceso de onboarding lento cuesta mucho dinero..." ❌

### 4. Métricas Subyacentes Deben Existir

Cada ID en `metricasSubyacentes` debe corresponder a un archivo existente en `../metrics/[ID].json`.

**Test**: `tests/content/kpi_structure_test.dart` verifica estas referencias.

### 5. Consistencia Financiera

- `costoBaselineDolares` debe ser > 0
- `ahorroProyectadoDolares` debe ser ≥ 0 y ≤ `costoBaselineDolares`
- ROI implícito: `(ahorroProyectadoDolares - inversionIA) ÷ inversionIA × 100` debe ser > 0 para ser justificable

### 6. Prioridad Única

Cada KPI debe tener una `prioridad` diferente (1-5). No puede haber dos KPIs con prioridad 1.

### 7. Visualización Apropiada

El campo `visualizacionSugerida` debe ser uno de:
- `BAR_CHART` (comparación de valores)
- `PIE_CHART` (distribución porcentual)
- `LINE_CHART` (tendencia en el tiempo)
- `GAUGE` (indicador de nivel)
- `TIMELINE` (eventos a lo largo del tiempo)

---

## Los 5 KPIs del Framework

### KPI-001: Costo de Onboarding Lento

**Métrica Subyacente**: `SPACE-ACT-002` (Onboarding Time)

**Baseline**: 42 días para developer nuevo sea productivo

**Costo Anual** (20 devs, 4 contrataciones/año):
```
Costo = (42 días onboarding ÷ 365) × $150K salario × 4 contrataciones
      = 0.115 × $150K × 4
      = $69,000/año
```

**Ahorro con IA**: 50% (21 días onboarding) = $34,500/año

---

### KPI-002: Costo de Boilerplate y Tareas Repetitivas

**Métrica Subyacente**: `SPACE-EFF-002` (Tiempo en Boilerplate)

**Baseline**: 35% del tiempo de developer en código repetitivo

**Costo Anual** (20 devs @ $150K):
```
Costo = 20 devs × $150K × 35%
      = $1,050,000/año
```

**Ahorro con IA**: 60% reducción = $630,000/año

---

### KPI-003: Impacto de Crashes en Revenue

**Métrica Subyacente**: `DORA-CFR-001` (Change Failure Rate)

**Baseline**: 98.5% crash-free users (1.5% con crashes)

**Costo Anual** (app con 1M MAU, $10 ARPU):
```
Usuarios afectados = 1M × 1.5% = 15,000
Churn por crashes = 15,000 × 20% = 3,000 usuarios perdidos
Revenue perdido = 3,000 × $10 = $30,000/mes
Costo anual = $30K × 12 = $360,000/año
```

**Ahorro con IA**: 30% menos crashes (99.2% crash-free) = $108,000/año

---

### KPI-004: Costo de Cycle Time Lento

**Métrica Subyacente**: `DORA-LT-001` (Lead Time)

**Baseline**: 12 días desde commit hasta producción

**Costo de Oportunidad**: Difícil de cuantificar exactamente, pero:
- Cada 5 días de ventaja en time-to-market puede representar 5-10% de revenue del feature
- Para startup con $5M ARR: 5% = $250K/año

**Ahorro con IA**: 42% reducción (12 días → 7 días) = ventaja competitiva valorada en $250K+/año

---

### KPI-005: Costo de Rotación de Talento

**Métrica Subyacente**: `SPACE-SAT-001` (Developer Satisfaction)

**Baseline**: 25% turnover anual

**Costo por Reemplazo**: $50K-$80K (recruiting + onboarding + productividad perdida)

**Costo Anual** (20 devs, 25% turnover):
```
Rotaciones/año = 20 × 25% = 5 developers
Costo = 5 × $65K costo promedio por reemplazo
      = $325,000/año
```

**Ahorro con IA**: 28% reducción en turnover (de 25% a 18%) = $91,000/año

---

## Costo Total de Inacción

Sumando los 5 KPIs:

| KPI | Costo Anual |
|-----|-------------|
| KPI-001: Onboarding | $69,000 |
| KPI-002: Boilerplate | $1,050,000 |
| KPI-003: Crashes | $360,000 |
| KPI-004: Cycle Time | $250,000 (costo de oportunidad) |
| KPI-005: Rotación | $325,000 |
| **TOTAL** | **$2,054,000/año** |

**Ahorro Total con IA**: ~$863,500/año

**Inversión en IA** (GitHub Copilot para 20 devs):
- $39/mes × 20 devs × 12 meses = $9,360/año

**ROI**:
```
ROI = [($863,500 - $9,360) ÷ $9,360] × 100
    = 9,122%
```

**Payback Period**:
```
Payback = ($9,360 ÷ $863,500) × 365 días
        = 4 días
```

---

## Plantillas

### Crear Nuevo KPI

```bash
# Copiar plantilla
cp ../../templates/kpi-template.md ../../drafts/mi-nuevo-kpi.md

# Completar plantilla en Markdown
# Luego crear JSON basado en la plantilla
touch KPI-006.json  # ⚠️ Solo si vas a reemplazar un KPI existente

# Validar
jsonschema -i KPI-006.json ../../schemas/kpi-dashboard-schema.json
```

**Recuerda**: Si agregas KPI-006, debes deprecar uno de los KPIs 001-005.

---

## Tipos de Visualización por KPI

| KPI | Visualización Sugerida | Justificación |
|-----|------------------------|---------------|
| KPI-001 (Onboarding) | `BAR_CHART` | Comparación directa: costo actual vs costo con IA |
| KPI-002 (Boilerplate) | `PIE_CHART` | Distribución del tiempo: productivo vs repetitivo |
| KPI-003 (Crashes) | `LINE_CHART` | Tendencia de crash-free users a lo largo del tiempo |
| KPI-004 (Cycle Time) | `TIMELINE` | Visualizar diferencia en días desde commit hasta producción |
| KPI-005 (Rotación) | `GAUGE` | Medidor de % turnover (zona roja >25%, verde <15%) |

---

## Roadmap de KPIs

| ID | Nombre | Estado | Validado con Stakeholder |
|----|--------|--------|--------------------------|
| KPI-001 | Costo de Onboarding | 🔄 Pendiente | ❌ |
| KPI-002 | Costo de Boilerplate | 🔄 Pendiente | ❌ |
| KPI-003 | Impacto de Crashes | 🔄 Pendiente | ❌ |
| KPI-004 | Costo de Cycle Time | 🔄 Pendiente | ❌ |
| KPI-005 | Costo de Rotación | 🔄 Pendiente | ❌ |

**Leyenda**:
- ✅ Implementado (JSON + Markdown + validado con CFO/CTO)
- 🔄 Pendiente
- ⚠️ En revisión

---

## Contribución

Ver `../../CONTRIBUTING.md` para proceso completo de agregar/modificar KPIs.

**Resumen rápido**:
1. Copiar `../../templates/kpi-template.md`
2. Completar plantilla (IMPORTANTE: validar con stakeholder no técnico)
3. Crear JSON validado
4. Agregar sección a `../../executive-dashboard.md`
5. Actualizar "Costo Total de Inacción"
6. Crear Pull Request con evidencia de validación con CFO/CTO

---

**Última Actualización**: 2025-11-13
**Total de KPIs**: 5 (framework inicializado, KPIs pendientes de implementación)
