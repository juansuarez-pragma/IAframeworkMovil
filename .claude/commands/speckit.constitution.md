---
description: Crear o actualizar la constitución del proyecto desde entradas de principios interactivos o proporcionados, asegurando que todos los templates dependientes permanezcan sincronizados
---

## Entrada del Usuario

```text
$ARGUMENTS
```

**DEBES** considerar la entrada del usuario antes de proceder (si no está vacía).

## Esquema

Estás actualizando la constitución del proyecto en `.specify/memory/constitution.md`. Este archivo es una PLANTILLA que contiene tokens placeholder entre corchetes (ej. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Tu trabajo es (a) recopilar/derivar valores concretos, (b) llenar el template con precisión, y (c) propagar cualquier enmienda a través de los artefactos dependientes.

Sigue este flujo de ejecución:

1. Cargar el template de constitución existente en `.specify/memory/constitution.md`.
   - Identificar cada token placeholder de la forma `[ALL_CAPS_IDENTIFIER]`.
   **IMPORTANTE**: El usuario podría requerir menos o más principios que los usados en el template. Si se especifica un número, respétalo - sigue el template general. Actualizarás el documento en consecuencia.

2. Recopilar/derivar valores para placeholders:
   - Si la entrada del usuario (conversación) proporciona un valor, úsalo.
   - De lo contrario, infiere del contexto existente del repo (README, docs, versiones previas de constitución si están embebidas).
   - Para fechas de gobernanza: `RATIFICATION_DATE` es la fecha de adopción original (si es desconocida preguntar o marcar TODO), `LAST_AMENDED_DATE` es hoy si se hacen cambios, de lo contrario mantener la anterior.
   - `CONSTITUTION_VERSION` debe incrementarse según reglas de versionado semántico:
     - MAJOR: Remociones o redefiniciones de gobernanza/principios incompatibles hacia atrás.
     - MINOR: Nuevo principio/sección agregada o guía materialmente expandida.
     - PATCH: Clarificaciones, redacción, correcciones de typo, refinamientos no semánticos.
   - Si el tipo de bump de versión es ambiguo, proponer razonamiento antes de finalizar.

3. Redactar el contenido actualizado de la constitución:
   - Reemplazar cada placeholder con texto concreto (no dejar tokens entre corchetes excepto slots de template intencionalmente retenidos que el proyecto haya elegido no definir aún—justificar explícitamente cualquiera que quede).
   - Preservar jerarquía de encabezados y los comentarios pueden removerse una vez reemplazados a menos que aún agreguen guía clarificadora.
   - Asegurar cada sección de Principio: línea de nombre sucinta, párrafo (o lista con viñetas) capturando reglas no negociables, justificación explícita si no es obvia.
   - Asegurar sección de Gobernanza lista procedimiento de enmienda, política de versionado, y expectativas de revisión de cumplimiento.

4. Lista de verificación de propagación de consistencia (convertir lista previa en validaciones activas):
   - Leer `.specify/templates/plan-template.md` y asegurar que cualquier "Verificación de Constitución" o reglas se alineen con principios actualizados.
   - Leer `.specify/templates/spec-template.md` para alineación de alcance/requisitos—actualizar si la constitución agrega/remueve secciones obligatorias o restricciones.
   - Leer `.specify/templates/tasks-template.md` y asegurar que la categorización de tareas refleje tipos de tareas impulsadas por principios nuevos o removidos (ej., observabilidad, versionado, disciplina de testing).
   - Leer cada archivo de comando en `.specify/templates/commands/*.md` (incluyendo este) para verificar que no queden referencias desactualizadas (nombres específicos de agente como CLAUDE solo) cuando se requiere guía genérica.
   - Leer cualquier doc de guía de runtime (ej., `README.md`, `docs/quickstart.md`, o archivos de guía específicos de agente si están presentes). Actualizar referencias a principios cambiados.

5. Producir un Reporte de Impacto de Sincronización (anteponer como comentario HTML en la parte superior del archivo de constitución después de la actualización):
   - Cambio de versión: vieja → nueva
   - Lista de principios modificados (título viejo → título nuevo si se renombró)
   - Secciones agregadas
   - Secciones removidas
   - Templates que requieren actualizaciones (✅ actualizado / ⚠ pendiente) con rutas de archivo
   - TODOs de seguimiento si algún placeholder fue intencionalmente diferido.

6. Validación antes de salida final:
   - No quedan tokens de corchetes sin explicar.
   - Línea de versión coincide con reporte.
   - Fechas en formato ISO YYYY-MM-DD.
   - Principios son declarativos, comprobables, y libres de lenguaje vago ("debería" → reemplazar con DEBE/DEBERÍA con justificación donde sea apropiado).

7. Escribir la constitución completada de vuelta a `.specify/memory/constitution.md` (sobrescribir).

8. Generar un resumen final para el usuario con:
   - Nueva versión y justificación de bump.
   - Cualquier archivo marcado para seguimiento manual.
   - Mensaje de commit sugerido (ej., `docs: enmendar constitución a vX.Y.Z (adiciones de principios + actualización de gobernanza)`).

Requisitos de Formato y Estilo:

- Usar encabezados Markdown exactamente como en el template (no degradar/promover niveles).
- Envolver líneas largas de justificación para mantener legibilidad (<100 caracteres idealmente) pero no forzar con saltos incómodos.
- Mantener una sola línea en blanco entre secciones.
- Evitar espacios en blanco finales.

Si el usuario proporciona actualizaciones parciales (ej., solo una revisión de principio), aún realizar pasos de validación y decisión de versión.

Si falta información crítica (ej., fecha de ratificación verdaderamente desconocida), insertar `TODO(<FIELD_NAME>): explicación` e incluir en el Reporte de Impacto de Sincronización bajo elementos diferidos.

No crear un nuevo template; siempre operar en el archivo existente `.specify/memory/constitution.md`.
