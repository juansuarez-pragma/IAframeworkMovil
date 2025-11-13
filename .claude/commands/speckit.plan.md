---
description: Ejecutar el flujo de trabajo de planificación de implementación usando el template de plan para generar artefactos de diseño.
---

## Entrada del Usuario

```text
$ARGUMENTS
```

**DEBES** considerar la entrada del usuario antes de proceder (si no está vacía).

## Esquema

1. **Configuración**: Ejecutar `.specify/scripts/bash/setup-plan.sh --json` desde la raíz del repositorio y analizar JSON para FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. Para comillas simples en args como "I'm Groot", usar sintaxis de escape: ej. 'I'\''m Groot' (o comillas dobles si es posible: "I'm Groot").

2. **Cargar contexto**: Leer FEATURE_SPEC y `.specify/memory/constitution.md`. Cargar template IMPL_PLAN (ya copiado).

3. **Ejecutar flujo de plan**: Seguir la estructura en el template IMPL_PLAN para:
   - Llenar Contexto Técnico (marcar incógnitas como "NECESITA CLARIFICACIÓN")
   - Llenar sección de Verificación de Constitución desde constitution
   - Evaluar gates (ERROR si hay violaciones injustificadas)
   - Fase 0: Generar research.md (resolver todas las NECESITA CLARIFICACIÓN)
   - Fase 1: Generar data-model.md, contracts/, quickstart.md
   - Fase 1: Actualizar contexto del agente ejecutando el script del agente
   - Re-evaluar Verificación de Constitución post-diseño

4. **Detener y reportar**: El comando termina después de la planificación de Fase 2. Reportar branch, ruta IMPL_PLAN, y artefactos generados.

## Fases

### Fase 0: Esquema e Investigación

1. **Extraer incógnitas del Contexto Técnico** anterior:
   - Por cada NECESITA CLARIFICACIÓN → tarea de investigación
   - Por cada dependencia → tarea de mejores prácticas
   - Por cada integración → tarea de patrones

2. **Generar y despachar agentes de investigación**:

   ```text
   Por cada incógnita en Contexto Técnico:
     Tarea: "Investigar {incógnita} para {contexto de feature}"
   Por cada elección de tecnología:
     Tarea: "Encontrar mejores prácticas para {tech} en {dominio}"
   ```

3. **Consolidar hallazgos** en `research.md` usando formato:
   - Decisión: [qué se eligió]
   - Justificación: [por qué se eligió]
   - Alternativas consideradas: [qué más se evaluó]

**Salida**: research.md con todas las NECESITA CLARIFICACIÓN resueltas

### Fase 1: Diseño y Contratos

**Prerequisitos:** `research.md` completo

1. **Extraer entidades del spec de feature** → `data-model.md`:
   - Nombre de entidad, campos, relaciones
   - Reglas de validación de requisitos
   - Transiciones de estado si aplica

2. **Generar contratos API** de requisitos funcionales:
   - Por cada acción de usuario → endpoint
   - Usar patrones estándar REST/GraphQL
   - Salida OpenAPI/GraphQL schema a `/contracts/`

3. **Actualización de contexto del agente**:
   - Ejecutar `.specify/scripts/bash/update-agent-context.sh claude`
   - Estos scripts detectan qué agente de IA está en uso
   - Actualizar el archivo de contexto específico del agente apropiado
   - Agregar solo tecnología nueva del plan actual
   - Preservar adiciones manuales entre marcadores

**Salida**: data-model.md, /contracts/*, quickstart.md, archivo específico del agente

## Reglas clave

- Usar rutas absolutas
- ERROR en fallas de gate o clarificaciones no resueltas
