# Directorio de Datos

**Propósito**: Este directorio almacena las definiciones estructuradas (JSON) de métricas DORA/SPACE y KPIs ejecutivos del framework.

---

## Estructura

```
data/
├── README.md           # Este archivo
├── metrics/            # Definiciones JSON de métricas individuales
│   ├── README.md
│   ├── DORA-LT-001.json      # Ejemplo: Lead Time
│   ├── SPACE-EFF-001.json    # Ejemplo: Build Time
│   └── ...
└── kpis/               # Definiciones JSON de KPIs ejecutivos
    ├── README.md
    ├── KPI-001.json          # Ejemplo: Costo de Onboarding
    ├── KPI-002.json          # Ejemplo: Costo de Boilerplate
    └── ...
```

---

## ¿Por Qué Almacenar JSON?

Las definiciones JSON permiten:

1. **Validación Automática**: Usar JSON Schema para validar que métricas/KPIs tienen todos los campos requeridos
2. **Generación Programática**: Scripts pueden leer estos JSONs para generar tablas, dashboards, o calculadoras
3. **Versionado**: Git trackea cambios en definiciones de métricas a lo largo del tiempo
4. **Interoperabilidad**: Otros sistemas (dashboards, herramientas BI) pueden consumir estos datos
5. **Tests Automatizados**: Validar consistencia entre múltiples métricas (ej: que IDs no se repitan)

---

## Schemas de Validación

Todos los JSON en este directorio deben validarse contra schemas ubicados en:

- `../schemas/metrics-schema.json` (para archivos en `metrics/`)
- `../schemas/kpi-dashboard-schema.json` (para archivos en `kpis/`)

### Cómo Validar

Si tienes `jsonschema` instalado (Python):

```bash
# Validar una métrica
jsonschema -i data/metrics/DORA-LT-001.json schemas/metrics-schema.json

# Validar un KPI
jsonschema -i data/kpis/KPI-001.json schemas/kpi-dashboard-schema.json
```

Si usas Node.js con `ajv-cli`:

```bash
# Validar una métrica
ajv validate -s schemas/metrics-schema.json -d data/metrics/DORA-LT-001.json

# Validar un KPI
ajv validate -s schemas/kpi-dashboard-schema.json -d data/kpis/KPI-001.json
```

---

## Convenciones de Nomenclatura

### Para Métricas

**Formato**: `[CATEGORIA]-[SUBCATEGORIA]-[NUMERO].json`

**Ejemplos**:
- `DORA-LT-001.json` (DORA Lead Time #1)
- `DORA-DF-001.json` (DORA Deployment Frequency #1)
- `DORA-CFR-001.json` (DORA Change Failure Rate #1)
- `DORA-MTTR-001.json` (DORA Mean Time to Restore #1)
- `SPACE-SAT-001.json` (SPACE Satisfaction #1)
- `SPACE-PERF-001.json` (SPACE Performance #1)
- `SPACE-ACT-001.json` (SPACE Activity #1)
- `SPACE-COMM-001.json` (SPACE Communication #1)
- `SPACE-EFF-001.json` (SPACE Efficiency #1)

### Para KPIs

**Formato**: `KPI-[NUMERO].json`

**Restricción**: Solo 5 KPIs permitidos (`KPI-001.json` a `KPI-005.json`)

**Ejemplos**:
- `KPI-001.json` (Costo de Onboarding Lento)
- `KPI-002.json` (Costo de Boilerplate y Tareas Repetitivas)
- `KPI-003.json` (Impacto de Crashes en Revenue)
- `KPI-004.json` (Costo de Cycle Time Lento)
- `KPI-005.json` (Costo de Rotación de Talento)

---

## Relación con Documentación Markdown

Los archivos JSON en este directorio son la **fuente de verdad** estructurada. La documentación Markdown (`metrics-table.md`, `executive-dashboard.md`) es la **representación legible para humanos**.

**Flujo de Trabajo Recomendado**:

1. **Crear/editar JSON** en `data/metrics/` o `data/kpis/`
2. **Validar** contra schema
3. **Actualizar Markdown** correspondiente para reflejar cambios
4. **Commit** ambos (JSON + Markdown) juntos

**Nota**: En el futuro, podríamos automatizar la generación de Markdown a partir de JSON usando scripts.

---

## Ejemplo de Definición de Métrica

Ver archivo completo en `data/metrics/SPACE-EFF-001.json` (cuando se cree).

**Snippet**:
```json
{
  "id": "SPACE-EFF-001",
  "categoria": "SPACE_EFFICIENCY",
  "nombre": "Tiempo de Build en CI (Flutter Multiplataforma)",
  "descripcion": "Tiempo promedio desde push de código hasta disponibilidad de artefactos compilados para Android e iOS en pipeline de CI/CD.",
  "adaptacionFlutter": "Flutter requiere compilación AOT para iOS (10-20 min) y JIT/AOT para Android (8-18 min)...",
  "metodoMedicion": {
    "id": "MET-CI-001",
    "herramienta": "GitHub Actions / Bitrise / Codemagic",
    "comandos": "Extraer 'Total duration' de logs de CI para jobs de build de Flutter",
    "frecuencia": "PER_BUILD"
  },
  "baselineComun": {
    "valor": 15,
    "unidad": "minutos"
  },
  "targetConIA": {
    "valor": 13,
    "unidad": "minutos"
  },
  "impactoEsperado": 15,
  "criticidadFlutter": "ALTA",
  "relacionesKPI": ["KPI-002"],
  "fechaCreacion": "2025-11-13T00:00:00Z",
  "versionFramework": "1.0.0"
}
```

---

## Ejemplo de Definición de KPI

Ver archivo completo en `data/kpis/KPI-001.json` (cuando se cree).

**Snippet**:
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
  "narrativaCostoInaccion": "Nuestro proceso de onboarding lento cuesta $80K/año en productividad perdida - 50% recuperable con desarrollo asistido por IA.",
  "prioridad": 1,
  "audienciaObjetivo": ["CTO", "VP_ENGINEERING"],
  "fechaCreacion": "2025-11-13T00:00:00Z",
  "versionFramework": "1.0.0"
}
```

---

## Herramientas Recomendadas

### Para Validación

- **Python**: `pip install jsonschema` + usar `jsonschema` CLI
- **Node.js**: `npm install -g ajv-cli` + usar `ajv` CLI
- **VS Code**: Extensión "JSON Schema Validator" para validación en tiempo real

### Para Edición

- **VS Code**: Soporte nativo de JSON + IntelliSense si configuras schema
- **JetBrains IDEs**: Soporte nativo de JSON Schema
- **Online**: JSONEditor Online (https://jsoneditoronline.org) con validación

### Para Tests Automatizados

Ver `tests/content/` para ejemplos de tests que validan:
- IDs únicos (no duplicados)
- Referencias válidas (ej: `relacionesKPI` apunta a KPIs existentes)
- Consistencia de datos (baseline vs target coherentes)

---

## Contribución

Al agregar nuevas métricas o KPIs:

1. **Copia plantilla JSON** del directorio correspondiente
2. **Completa todos los campos** requeridos por el schema
3. **Valida** contra schema
4. **Crea PR** con el nuevo archivo JSON + documentación Markdown actualizada

Ver `CONTRIBUTING.md` para proceso completo.

---

**Última Actualización**: 2025-11-13
**Versión del Framework**: 1.0.0
