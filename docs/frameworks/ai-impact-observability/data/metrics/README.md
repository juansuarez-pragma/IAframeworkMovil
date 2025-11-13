# Directorio de Métricas DORA/SPACE

**Propósito**: Almacenar definiciones JSON de métricas individuales DORA y SPACE adaptadas a Flutter.

---

## Convención de Nomenclatura

Todos los archivos siguen el patrón: `[CATEGORIA]-[SUBCATEGORIA]-[NUMERO].json`

### Categorías DORA

| Prefijo | Categoría | Descripción |
|---------|-----------|-------------|
| `DORA-LT-` | Lead Time | Tiempo desde commit hasta producción |
| `DORA-DF-` | Deployment Frequency | Qué tan seguido se despliega |
| `DORA-CFR-` | Change Failure Rate | Porcentaje de deploys que fallan |
| `DORA-MTTR-` | Mean Time to Restore | Tiempo promedio para recuperar servicio |

### Categorías SPACE

| Prefijo | Dimensión | Descripción |
|---------|-----------|-------------|
| `SPACE-SAT-` | Satisfaction | Satisfacción y bienestar de developers |
| `SPACE-PERF-` | Performance | Output del equipo (velocity, throughput) |
| `SPACE-ACT-` | Activity | Acciones concretas (commits, reviews, PRs) |
| `SPACE-COMM-` | Communication | Efectividad de comunicación y documentación |
| `SPACE-EFF-` | Efficiency | Velocidad para completar tareas sin desperdicio |

---

## Estructura de un Archivo de Métrica

Cada archivo JSON debe contener:

```json
{
  "id": "SPACE-EFF-001",
  "categoria": "SPACE_EFFICIENCY",
  "nombre": "Nombre descriptivo de la métrica",
  "descripcion": "Qué mide esta métrica (máximo 500 caracteres)",
  "adaptacionFlutter": "Por qué esta métrica es única/crítica en Flutter (debe mencionar conceptos Flutter-específicos)",
  "metodoMedicion": {
    "id": "MET-XXX-001",
    "herramienta": "Nombre de la herramienta (Git, Firebase, GitHub Actions, etc.)",
    "comandos": "Comandos exactos o queries para obtener datos",
    "frecuencia": "PER_COMMIT | DAILY | WEEKLY | MONTHLY | QUARTERLY | PER_SPRINT | PER_BUILD"
  },
  "baselineComun": {
    "valor": 10,
    "unidad": "minutos | días | porcentaje | score | número"
  },
  "targetConIA": {
    "valor": 7,
    "unidad": "minutos | días | porcentaje | score | número"
  },
  "impactoEsperado": 30,
  "criticidadFlutter": "BAJA | MEDIA | ALTA | CRÍTICA",
  "relacionesKPI": ["KPI-001", "KPI-002"],
  "fechaCreacion": "2025-11-13T00:00:00Z",
  "versionFramework": "1.0.0"
}
```

---

## Validación de Schema

**Schema de referencia**: `../schemas/metrics-schema.json`

### Validar un archivo:

```bash
# Con jsonschema (Python)
jsonschema -i DORA-LT-001.json ../../schemas/metrics-schema.json

# Con ajv-cli (Node.js)
ajv validate -s ../../schemas/metrics-schema.json -d DORA-LT-001.json
```

### Validar todos los archivos:

```bash
# Bash loop
for file in *.json; do
  echo "Validando $file..."
  jsonschema -i "$file" ../../schemas/metrics-schema.json
done
```

---

## Reglas de Validación

### 1. IDs Únicos

Cada métrica debe tener un ID único. No puede haber dos archivos con el mismo `id`.

**Test**: `tests/content/metrics_completeness_test.dart` verifica duplicados.

### 2. Consistencia de Impacto

Si `impactoEsperado` > 0:
- Para métricas donde "menor es mejor" (tiempo, costo): `targetConIA.valor` < `baselineComun.valor`
- Para métricas donde "mayor es mejor" (%, score): `targetConIA.valor` > `baselineComun.valor`

**Ejemplo válido** (Build Time - menor es mejor):
```json
{
  "baselineComun": { "valor": 15, "unidad": "minutos" },
  "targetConIA": { "valor": 13, "unidad": "minutos" },
  "impactoEsperado": 13
}
```

**Ejemplo inválido**:
```json
{
  "baselineComun": { "valor": 15, "unidad": "minutos" },
  "targetConIA": { "valor": 20, "unidad": "minutos" },  // ❌ Empeoró, no mejoró
  "impactoEsperado": 30  // ❌ Incoherente
}
```

### 3. Adaptación Flutter Obligatoria

El campo `adaptacionFlutter` debe mencionar al menos uno de estos términos:
- Flutter
- Dart
- Widget
- Hot reload
- AOT (Ahead-of-Time)
- JIT (Just-in-Time)
- iOS / Android
- Multiplataforma
- State management
- Fragmentación de dispositivos

### 4. Método de Medición Obligatorio

Para métricas con `criticidadFlutter` = `ALTA` o `CRÍTICA`, el campo `metodoMedicion` no puede ser null.

### 5. Referencias KPI Válidas

Cada ID en `relacionesKPI` debe corresponder a un archivo existente en `../kpis/KPI-XXX.json`.

---

## Plantillas

### Crear Nueva Métrica DORA

```bash
# Copiar plantilla
cp ../../templates/metric-template.md ../../drafts/mi-nueva-metrica.md

# Completar plantilla en Markdown
# Luego crear JSON basado en la plantilla
touch DORA-XX-001.json

# Validar
jsonschema -i DORA-XX-001.json ../../schemas/metrics-schema.json
```

### Crear Nueva Métrica SPACE

Mismo proceso que arriba, pero usa prefijo `SPACE-XXX-001.json`.

---

## Ejemplos de Métricas

### Métrica DORA - Lead Time

**Archivo**: `DORA-LT-001.json`

```json
{
  "id": "DORA-LT-001",
  "categoria": "DORA_LEAD_TIME",
  "nombre": "Lead Time para Cambios (Commit → App Store Aprobada)",
  "descripcion": "Tiempo desde commit de código hasta app disponible en tiendas (App Store + Play Store).",
  "adaptacionFlutter": "En Flutter, Lead Time incluye compilación AOT/JIT para 2 plataformas (iOS 10-20min, Android 8-18min) + revisión de tiendas (App Store 24-48h, Play Store 2-8h). Es 10-20x más lento que deploys web debido a restricciones de tiendas.",
  "metodoMedicion": {
    "id": "MET-GIT-001",
    "herramienta": "Git + App Store Connect API + Google Play Console API",
    "comandos": "git log --since='30 days ago' --format='%H,%ct' | calcular diff con timestamp de approval en tiendas",
    "frecuencia": "PER_COMMIT"
  },
  "baselineComun": {
    "valor": 12,
    "unidad": "días"
  },
  "targetConIA": {
    "valor": 7,
    "unidad": "días"
  },
  "impactoEsperado": 42,
  "criticidadFlutter": "CRÍTICA",
  "relacionesKPI": ["KPI-004"],
  "fechaCreacion": "2025-11-13T00:00:00Z",
  "versionFramework": "1.0.0"
}
```

### Métrica SPACE - Build Time

**Archivo**: `SPACE-EFF-001.json`

```json
{
  "id": "SPACE-EFF-001",
  "categoria": "SPACE_EFFICIENCY",
  "nombre": "Tiempo de Build en CI (Flutter Multiplataforma)",
  "descripcion": "Tiempo promedio desde push de código hasta disponibilidad de artefactos compilados para Android e iOS en pipeline de CI/CD.",
  "adaptacionFlutter": "Flutter requiere compilación AOT para iOS (10-20 min) y JIT/AOT para Android (8-18 min). A diferencia de desarrollo web (segundos), los builds lentos causan context switching significativo y reducción de flow state. Hot reload mitiga esto en desarrollo local, pero CI builds siguen siendo críticos para testing y releases.",
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

## Roadmap de Métricas

El framework actualmente soporta **15+ métricas**. La siguiente tabla muestra el estado de implementación:

| ID | Nombre | Categoría | Estado |
|----|--------|-----------|--------|
| `DORA-LT-001` | Lead Time | DORA | 🔄 Pendiente |
| `DORA-DF-001` | Deployment Frequency | DORA | 🔄 Pendiente |
| `DORA-CFR-001` | Change Failure Rate | DORA | 🔄 Pendiente |
| `DORA-MTTR-001` | Mean Time to Restore | DORA | 🔄 Pendiente |
| `SPACE-SAT-001` | Developer Satisfaction Score | SPACE | 🔄 Pendiente |
| `SPACE-PERF-001` | Velocity (Story Points/Sprint) | SPACE | 🔄 Pendiente |
| `SPACE-ACT-001` | Code Review Time | SPACE | 🔄 Pendiente |
| `SPACE-ACT-002` | Onboarding Time | SPACE | 🔄 Pendiente |
| `SPACE-COMM-001` | Documentation Coverage | SPACE | 🔄 Pendiente |
| `SPACE-EFF-001` | Build Time en CI | SPACE | 🔄 Pendiente |
| `SPACE-EFF-002` | Tiempo en Boilerplate | SPACE | 🔄 Pendiente |
| ... | ... | ... | ... |

**Leyenda**:
- ✅ Implementado (JSON + Markdown)
- 🔄 Pendiente
- ⚠️ En revisión

---

## Contribución

Ver `../../CONTRIBUTING.md` para proceso completo de agregar nuevas métricas.

**Resumen rápido**:
1. Copiar `../../templates/metric-template.md`
2. Completar plantilla
3. Crear JSON validado
4. Agregar fila a `../../metrics-table.md`
5. Crear Pull Request

---

**Última Actualización**: 2025-11-13
**Total de Métricas**: 0 (framework inicializado, métricas pendientes)
