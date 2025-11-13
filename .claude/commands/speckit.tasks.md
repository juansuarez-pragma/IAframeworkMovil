---
description: Generar un tasks.md accionable y ordenado por dependencias para la feature basado en artefactos de diseño disponibles.
---

## Entrada del Usuario

```text
$ARGUMENTS
```

**DEBES** considerar la entrada del usuario antes de proceder (si no está vacía).

## Esquema

1. **Configuración**: Ejecutar `.specify/scripts/bash/check-prerequisites.sh --json` desde la raíz del repo y analizar FEATURE_DIR y lista AVAILABLE_DOCS. Todas las rutas deben ser absolutas. Para comillas simples en args como "I'm Groot", usar sintaxis de escape: ej. 'I'\''m Groot' (o comillas dobles si es posible: "I'm Groot").

2. **Cargar documentos de diseño**: Leer desde FEATURE_DIR:
   - **Requerido**: plan.md (tech stack, bibliotecas, estructura), spec.md (historias de usuario con prioridades)
   - **Opcional**: data-model.md (entidades), contracts/ (endpoints API), research.md (decisiones), quickstart.md (escenarios de prueba)
   - Nota: No todos los proyectos tienen todos los documentos. Generar tareas basadas en lo que esté disponible.

3. **Ejecutar flujo de generación de tareas**:
   - Cargar plan.md y extraer tech stack, bibliotecas, estructura del proyecto
   - Cargar spec.md y extraer historias de usuario con sus prioridades (P1, P2, P3, etc.)
   - Si data-model.md existe: Extraer entidades y mapear a historias de usuario
   - Si contracts/ existe: Mapear endpoints a historias de usuario
   - Si research.md existe: Extraer decisiones para tareas de setup
   - Generar tareas organizadas por historia de usuario (ver Reglas de Generación de Tareas abajo)
   - Generar grafo de dependencias mostrando orden de completación de historias de usuario
   - Crear ejemplos de ejecución paralela por historia de usuario
   - Validar completitud de tareas (cada historia de usuario tiene todas las tareas necesarias, independientemente comprobable)

4. **Generar tasks.md**: Usar `.specify.specify/templates/tasks-template.md` como estructura, llenar con:
   - Nombre correcto de feature desde plan.md
   - Fase 1: Tareas de setup (inicialización del proyecto)
   - Fase 2: Tareas fundamentales (prerequisitos bloqueantes para todas las historias de usuario)
   - Fase 3+: Una fase por historia de usuario (en orden de prioridad desde spec.md)
   - Cada fase incluye: objetivo de historia, criterios de prueba independiente, tests (si se solicitaron), tareas de implementación
   - Fase Final: Pulido y concerns transversales
   - Todas las tareas deben seguir el formato estricto de checklist (ver Reglas de Generación de Tareas abajo)
   - Rutas de archivo claras para cada tarea
   - Sección de dependencias mostrando orden de completación de historias
   - Ejemplos de ejecución paralela por historia
   - Sección de estrategia de implementación (MVP primero, entrega incremental)

5. **Reportar**: Generar ruta al tasks.md generado y resumen:
   - Conteo total de tareas
   - Conteo de tareas por historia de usuario
   - Oportunidades paralelas identificadas
   - Criterios de prueba independiente para cada historia
   - Alcance de MVP sugerido (típicamente solo Historia de Usuario 1)
   - Validación de formato: Confirmar que TODAS las tareas siguen el formato de checklist (checkbox, ID, etiquetas, rutas de archivo)

Contexto para generación de tareas: $ARGUMENTS

El tasks.md debe ser inmediatamente ejecutable - cada tarea debe ser lo suficientemente específica para que un LLM pueda completarla sin contexto adicional.

## Reglas de Generación de Tareas

**CRÍTICO**: Las tareas DEBEN estar organizadas por historia de usuario para permitir implementación y testing independientes.

**Los tests son OPCIONALES**: Solo generar tareas de test si se solicita explícitamente en la especificación de feature o si el usuario solicita enfoque TDD.

### Formato de Checklist (REQUERIDO)

Cada tarea DEBE seguir estrictamente este formato:

```text
- [ ] [TaskID] [P?] [Story?] Descripción con ruta de archivo
```

**Componentes del Formato**:

1. **Checkbox**: SIEMPRE empezar con `- [ ]` (checkbox markdown)
2. **ID de Tarea**: Número secuencial (T001, T002, T003...) en orden de ejecución
3. **Marcador [P]**: Incluir SOLO si la tarea es paralelizable (archivos diferentes, sin dependencias en tareas incompletas)
4. **Etiqueta [Story]**: REQUERIDA solo para tareas de fase de historia de usuario
   - Formato: [US1], [US2], [US3], etc. (mapea a historias de usuario desde spec.md)
   - Fase de setup: SIN etiqueta de historia
   - Fase fundamental: SIN etiqueta de historia
   - Fases de Historia de Usuario: DEBE tener etiqueta de historia
   - Fase de pulido: SIN etiqueta de historia
5. **Descripción**: Acción clara con ruta exacta de archivo

**Ejemplos**:

- ✅ CORRECTO: `- [ ] T001 Crear estructura del proyecto según plan de implementación`
- ✅ CORRECTO: `- [ ] T005 [P] Implementar middleware de autenticación en src/middleware/auth.py`
- ✅ CORRECTO: `- [ ] T012 [P] [US1] Crear modelo User en src/models/user.py`
- ✅ CORRECTO: `- [ ] T014 [US1] Implementar UserService en src/services/user_service.py`
- ❌ INCORRECTO: `- [ ] Crear modelo User` (falta ID y etiqueta Story)
- ❌ INCORRECTO: `T001 [US1] Crear modelo` (falta checkbox)
- ❌ INCORRECTO: `- [ ] [US1] Crear modelo User` (falta ID de Tarea)
- ❌ INCORRECTO: `- [ ] T001 [US1] Crear modelo` (falta ruta de archivo)

### Organización de Tareas

1. **Desde Historias de Usuario (spec.md)** - ORGANIZACIÓN PRIMARIA:
   - Cada historia de usuario (P1, P2, P3...) obtiene su propia fase
   - Mapear todos los componentes relacionados a su historia:
     - Modelos necesarios para esa historia
     - Servicios necesarios para esa historia
     - Endpoints/UI necesarios para esa historia
     - Si se solicitaron tests: Tests específicos de esa historia
   - Marcar dependencias de historia (la mayoría de historias deberían ser independientes)

2. **Desde Contratos**:
   - Mapear cada contrato/endpoint → a la historia de usuario que sirve
   - Si se solicitaron tests: Cada contrato → tarea de test de contrato [P] antes de implementación en fase de esa historia

3. **Desde Modelo de Datos**:
   - Mapear cada entidad a la(s) historia(s) de usuario que la necesitan
   - Si entidad sirve múltiples historias: Poner en la historia más temprana o fase de Setup
   - Relaciones → tareas de capa de servicio en fase de historia apropiada

4. **Desde Setup/Infraestructura**:
   - Infraestructura compartida → Fase de Setup (Fase 1)
   - Tareas fundamentales/bloqueantes → Fase Fundamental (Fase 2)
   - Setup específico de historia → dentro de la fase de esa historia

### Estructura de Fases

- **Fase 1**: Setup (inicialización del proyecto)
- **Fase 2**: Fundamental (prerequisitos bloqueantes - DEBE completarse antes de historias de usuario)
- **Fase 3+**: Historias de Usuario en orden de prioridad (P1, P2, P3...)
  - Dentro de cada historia: Tests (si se solicitaron) → Modelos → Servicios → Endpoints → Integración
  - Cada fase debe ser un incremento completo, independientemente comprobable
- **Fase Final**: Pulido y Concerns Transversales
