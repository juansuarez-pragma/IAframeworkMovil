# Plantilla de Métrica DORA/SPACE

**Fecha de Creación**: [YYYY-MM-DD]
**Versión del Framework**: [X.Y.Z]
**Autor**: [Tu Nombre]

---

## Identificación

| Campo | Valor |
|-------|-------|
| **ID** | `[DORA|SPACE]-[CÓDIGO]-[###]` |
| **Categoría** | `[DORA_LEAD_TIME | DORA_DEPLOY_FREQ | DORA_CFR | DORA_MTTR | SPACE_SATISFACTION | SPACE_PERFORMANCE | SPACE_ACTIVITY | SPACE_COMMUNICATION | SPACE_EFFICIENCY]` |
| **Nombre** | [Nombre descriptivo de la métrica - máximo 100 caracteres] |
| **Criticidad Flutter** | `[BAJA | MEDIA | ALTA | CRÍTICA]` |

---

## Descripción

### ¿Qué Mide Esta Métrica?

[Explicación clara en 2-3 oraciones de qué mide exactamente esta métrica. Evita jerga técnica innecesaria. Máximo 500 caracteres.]

**Ejemplo**:
> Esta métrica mide el tiempo promedio desde que un developer hace commit de código hasta que la funcionalidad está disponible en producción (app stores). Incluye tiempo de desarrollo, code review, CI/CD, y revisión de tiendas.

---

## Adaptación Específica para Flutter

### ¿Por Qué Esta Métrica es Única o Crítica en Flutter?

[Describe cómo esta métrica es diferente o más importante en el contexto de desarrollo Flutter multiplataforma comparado con web o backend. Debe mencionar conceptos específicos de Flutter/Dart. Máximo 1000 caracteres.]

**Debe incluir al menos uno de estos conceptos**:
- Flutter
- Dart
- Widget
- Hot reload
- AOT (Ahead-of-Time compilation)
- JIT (Just-in-Time compilation)
- iOS / Android
- Multiplataforma
- State management (Provider, Bloc, Riverpod)
- Fragmentación de dispositivos

**Ejemplo**:
> En Flutter, el Lead Time es especialmente crítico porque incluye dos compilaciones separadas (AOT para iOS 10-20 min, JIT/AOT para Android 8-18 min) y dos procesos de revisión de tiendas (App Store 24-48h, Play Store 2-8h). A diferencia de desarrollo web donde deploys son instantáneos, los equipos Flutter deben planificar releases con 2-5 días de buffer para tiempos de revisión, lo que amplifica el costo de errores y ralentiza el feedback loop.

---

## Cómo Medirlo (Baseline)

### Herramientas Necesarias

- [Lista de herramientas requeridas, ej: Git, Firebase Crashlytics, GitHub Actions, etc.]

### Método de Medición

**Frecuencia de Medición**: `[PER_COMMIT | DAILY | WEEKLY | MONTHLY | QUARTERLY | PER_SPRINT]`

#### Paso 1: [Título del paso]

```bash
# Comandos exactos o queries a ejecutar
# Ejemplo:
git log --since="30 days ago" --pretty=format:'%h,%an,%ad,%s' --date=iso > commits.csv
```

[Explicación de qué hace este comando y qué output genera]

#### Paso 2: [Título del paso]

[Instrucciones detalladas para procesar los datos obtenidos en Paso 1]

#### Paso 3: Calcular Métrica Final

**Fórmula**:
```
Métrica = [Fórmula matemática exacta]
```

**Ejemplo de Cálculo**:
```
Datos de ejemplo:
- Valor A: 10
- Valor B: 5
- Resultado: 10 / 5 = 2.0 [unidad]
```

---

## Valores de Referencia

### Baseline Común (Sin IA)

| Campo | Valor |
|-------|-------|
| **Valor** | [Número o rango típico] |
| **Unidad** | [minutos, días, porcentaje, score, etc.] |
| **Fuente** | [De dónde viene este benchmark: DORA report, encuesta comunidad Flutter, etc.] |

**Contexto**: [Explicación de qué significa este valor y si es "bueno" o "malo"]

### Target con IA (Proyectado)

| Campo | Valor |
|-------|-------|
| **Valor** | [Número o rango esperado con herramientas IA] |
| **Unidad** | [misma unidad que baseline] |
| **Impacto Esperado** | [Porcentaje de mejora: 0-100%] |

**Justificación**: [Por qué se espera esta mejora? Qué capacidades de IA contribuyen? (autocompletado, generación de tests, detección de bugs, etc.)]

---

## Impacto en KPIs Ejecutivos

### KPIs Relacionados

Esta métrica contribuye a los siguientes KPIs del Dashboard Ejecutivo:

- [ ] **KPI-001**: Costo de Onboarding Lento
- [ ] **KPI-002**: Costo de Boilerplate y Tareas Repetitivas
- [ ] **KPI-003**: Impacto de Crashes en Revenue
- [ ] **KPI-004**: Costo de Cycle Time Lento
- [ ] **KPI-005**: Costo de Rotación de Talento

[Marca con [x] los KPIs a los que esta métrica aporta datos]

### Cómo Esta Métrica Impacta Financieramente

[Explicación en 2-3 oraciones de cómo un cambio en esta métrica afecta costos o revenue en términos de negocio]

**Ejemplo**:
> Una reducción del 30% en tiempo de build (de 15 min a 10.5 min) ahorra 4.5 minutos por build. Con 50 builds/semana × 52 semanas = 2,600 builds/año, esto representa 195 horas/año de tiempo de developer recuperado, equivalente a $14,040/año en costo laboral.

---

## Ejemplo Trabajado

### Escenario: Equipo de 15 Developers Flutter

**Datos Reales Medidos**:
- [Dato 1]: [Valor]
- [Dato 2]: [Valor]
- [Dato 3]: [Valor]

**Cálculo**:
```
[Mostrar el cálculo paso a paso con los datos del escenario]
```

**Resultado Baseline**: [X] [unidad]

**Proyección con IA**: [Y] [unidad] (mejora del [Z]%)

**Impacto Financiero**:
- Salario promedio developer: $120K/año ($58/hora asumiendo 2080h/año)
- Ahorro anual: [Cálculo detallado] = $[Monto]/año

---

## Validación y Testing

### Checklist de Validación de Métrica

Antes de agregar esta métrica al framework, verifica:

- [ ] El `id` sigue el patrón `[DORA|SPACE]-[CÓDIGO]-[###]`
- [ ] La `descripcion` tiene menos de 500 caracteres
- [ ] La `adaptacionFlutter` menciona al menos un concepto Flutter-específico
- [ ] El método de medición incluye comandos/queries ejecutables
- [ ] Los valores de baseline y target son consistentes (mejora en la dirección correcta)
- [ ] El `impactoEsperado` está entre 0-100%
- [ ] Se especifica al menos un KPI relacionado
- [ ] El ejemplo trabajado tiene cálculos completos y verificables
- [ ] La narrativa financiera explica el impacto en términos de negocio

### Test Manual

Ejecuta el método de medición en un proyecto Flutter de prueba:

1. ¿Los comandos/queries funcionan sin errores? **[Sí/No]**
2. ¿El output es el esperado? **[Sí/No]**
3. ¿El tiempo de ejecución es <2 horas? **[Sí/No]**
4. ¿Los resultados son reproducibles? **[Sí/No]**

---

## Metadata

| Campo | Valor |
|-------|-------|
| **Fecha de Última Actualización** | [YYYY-MM-DD] |
| **Versión de Plantilla** | 1.0.0 |
| **Estado** | `[DRAFT | REVIEW | APPROVED]` |
| **Revisado por** | [Nombre del revisor] |

---

## Notas Adicionales

[Cualquier información adicional relevante, limitaciones conocidas, alternativas consideradas, etc.]

---

**Siguiente Paso**: Después de completar esta plantilla, agregar la métrica a:
1. `docs/frameworks/ai-impact-observability/metrics-table.md` (fila en tabla principal)
2. `docs/frameworks/ai-impact-observability/data/metrics/[id].json` (definición JSON validada)
3. Actualizar KPIs relacionados en `executive-dashboard.md`
