---
description: Realizar un análisis no destructivo de consistencia y calidad entre artefactos a través de spec.md, plan.md y tasks.md después de la generación de tareas.
---

## Entrada del Usuario

```text
$ARGUMENTS
```

**DEBE** considerar la entrada del usuario antes de proceder (si no está vacía).

## Objetivo

Identificar inconsistencias, duplicaciones, ambigüedades y elementos subespecificados a través de los tres artefactos principales (`spec.md`, `plan.md`, `tasks.md`) antes de la implementación. Este comando DEBE ejecutarse solo después de que `/speckit.tasks` haya producido exitosamente un `tasks.md` completo.

## Restricciones Operacionales

**ESTRICTAMENTE DE SOLO LECTURA**: **No** modificar ningún archivo. Generar un reporte de análisis estructurado. Ofrecer un plan de remediación opcional (el usuario debe aprobar explícitamente antes de que se invoquen manualmente comandos de edición subsecuentes).

**Autoridad de la Constitución**: La constitución del proyecto (`.specify/memory/constitution.md`) es **no negociable** dentro de este alcance de análisis. Los conflictos con la constitución son automáticamente CRÍTICOS y requieren ajuste de la especificación, plan o tareas—no dilución, reinterpretación o ignorancia silenciosa del principio. Si un principio en sí necesita cambiar, eso debe ocurrir en una actualización de constitución separada y explícita fuera de `/speckit.analyze`.

## Pasos de Ejecución

### 1. Inicializar Contexto de Análisis

Ejecutar `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` una vez desde la raíz del repositorio y analizar JSON para FEATURE_DIR y AVAILABLE_DOCS. Derivar rutas absolutas:

- SPEC = FEATURE_DIR/spec.md
- PLAN = FEATURE_DIR/plan.md
- TASKS = FEATURE_DIR/tasks.md

Abortar con un mensaje de error si falta algún archivo requerido (instruir al usuario para ejecutar el comando de prerrequisito faltante).
Para comillas simples en args como "I'm Groot", usar sintaxis de escape: ej. 'I'\''m Groot' (o comillas dobles si es posible: "I'm Groot").

### 2. Cargar Artefactos (Divulgación Progresiva)

Cargar solo el contexto mínimo necesario de cada artefacto:

**De spec.md:**

- Visión General/Contexto
- Requisitos Funcionales
- Requisitos No Funcionales
- Historias de Usuario
- Casos Límite (si están presentes)

**De plan.md:**

- Opciones de Arquitectura/stack
- Referencias de Modelo de Datos
- Fases
- Restricciones Técnicas

**De tasks.md:**

- IDs de Tarea
- Descripciones
- Agrupación por Fase
- Marcadores Paralelos [P]
- Rutas de archivo referenciadas

**De constitution:**

- Cargar `.specify/memory/constitution.md` para validación de principios

### 3. Construir Modelos Semánticos

Crear representaciones internas (no incluir artefactos crudos en la salida):

- **Inventario de requisitos**: Cada requisito funcional + no funcional con una clave estable (derivar slug basado en frase imperativa; ej., "User can upload file" → `user-can-upload-file`)
- **Inventario de historia de usuario/acción**: Acciones discretas de usuario con criterios de aceptación
- **Mapeo de cobertura de tareas**: Mapear cada tarea a uno o más requisitos o historias (inferencia por palabra clave / patrones de referencia explícitos como IDs o frases clave)
- **Conjunto de reglas de constitución**: Extraer nombres de principios y declaraciones normativas MUST/SHOULD

### 4. Pases de Detección (Análisis Eficiente en Tokens)

Enfocarse en hallazgos de alta señal. Limitar a 50 hallazgos totales; agregar el resto en resumen de desbordamiento.

#### A. Detección de Duplicación

- Identificar requisitos casi duplicados
- Marcar redacción de menor calidad para consolidación

#### B. Detección de Ambigüedad

- Marcar adjetivos vagos (rápido, escalable, seguro, intuitivo, robusto) que carecen de criterios medibles
- Marcar placeholders sin resolver (TODO, TKTK, ???, `<placeholder>`, etc.)

#### C. Subespecificación

- Requisitos con verbos pero faltando objeto o resultado medible
- Historias de usuario faltando alineación de criterios de aceptación
- Tareas referenciando archivos o componentes no definidos en spec/plan

#### D. Alineación con Constitución

- Cualquier requisito o elemento de plan en conflicto con un principio MUST
- Secciones mandatorias faltantes o puertas de calidad de la constitución

#### E. Brechas de Cobertura

- Requisitos con cero tareas asociadas
- Tareas sin requisito/historia mapeada
- Requisitos no funcionales no reflejados en tareas (ej., rendimiento, seguridad)

#### F. Inconsistencia

- Deriva de terminología (mismo concepto nombrado diferentemente a través de archivos)
- Entidades de datos referenciadas en plan pero ausentes en spec (o viceversa)
- Contradicciones de ordenamiento de tareas (ej., tareas de integración antes de tareas de configuración fundamental sin nota de dependencia)
- Requisitos en conflicto (ej., uno requiere Next.js mientras otro especifica Vue)

### 5. Asignación de Severidad

Usar esta heurística para priorizar hallazgos:

- **CRÍTICO**: Viola un MUST de la constitución, falta artefacto central de especificación, o requisito con cero cobertura que bloquea funcionalidad base
- **ALTO**: Requisito duplicado o en conflicto, atributo ambiguo de seguridad/rendimiento, criterio de aceptación no testeable
- **MEDIO**: Deriva de terminología, cobertura de tarea no funcional faltante, caso límite subespecificado
- **BAJO**: Mejoras de estilo/redacción, redundancia menor que no afecta orden de ejecución

### 6. Producir Reporte de Análisis Compacto

Generar un reporte Markdown (sin escritura de archivos) con la siguiente estructura:

## Reporte de Análisis de Especificación

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| A1 | Duplication | HIGH | spec.md:L120-134 | Two similar requirements ... | Merge phrasing; keep clearer version |

(Agregar una fila por hallazgo; generar IDs estables prefijados por inicial de categoría.)

**Tabla Resumen de Cobertura:**

| Requirement Key | Has Task? | Task IDs | Notes |
|-----------------|-----------|----------|-------|

**Problemas de Alineación con Constitución:** (si los hay)

**Tareas No Mapeadas:** (si las hay)

**Métricas:**

- Total de Requisitos
- Total de Tareas
- % de Cobertura (requisitos con >=1 tarea)
- Conteo de Ambigüedades
- Conteo de Duplicaciones
- Conteo de Problemas Críticos

### 7. Proporcionar Próximas Acciones

Al final del reporte, generar un bloque conciso de Próximas Acciones:

- Si existen problemas CRÍTICOS: Recomendar resolver antes de `/speckit.implement`
- Si solo BAJO/MEDIO: El usuario puede proceder, pero proporcionar sugerencias de mejora
- Proporcionar sugerencias de comandos explícitos: ej., "Ejecutar /speckit.specify con refinamiento", "Ejecutar /speckit.plan para ajustar arquitectura", "Editar manualmente tasks.md para agregar cobertura para 'performance-metrics'"

### 8. Ofrecer Remediación

Preguntar al usuario: "¿Te gustaría que sugiera ediciones de remediación concretas para los N problemas principales?" (NO aplicarlas automáticamente.)

## Principios Operacionales

### Eficiencia de Contexto

- **Tokens mínimos de alta señal**: Enfocarse en hallazgos accionables, no documentación exhaustiva
- **Divulgación progresiva**: Cargar artefactos incrementalmente; no volcar todo el contenido en el análisis
- **Salida eficiente en tokens**: Limitar tabla de hallazgos a 50 filas; resumir desbordamiento
- **Resultados determinísticos**: Volver a ejecutar sin cambios debe producir IDs y conteos consistentes

### Directrices de Análisis

- **NUNCA modificar archivos** (esto es análisis de solo lectura)
- **NUNCA alucinar secciones faltantes** (si están ausentes, reportarlas con precisión)
- **Priorizar violaciones de constitución** (estas son siempre CRÍTICAS)
- **Usar ejemplos sobre reglas exhaustivas** (citar instancias específicas, no patrones genéricos)
- **Reportar cero problemas con gracia** (emitir reporte de éxito con estadísticas de cobertura)

## Contexto

$ARGUMENTS
